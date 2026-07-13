import { promises as fs } from "fs";
import path from "path";
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomUUID } from "crypto";
import type { ChatMessage, ChatMessageRole, ChatSession, ChatSessionStatus } from "./chat-types";

type ChatDatabase = {
  sessions: Record<string, ChatSession>;
};

type AppendOptions = {
  sessionId: string;
  message: {
    id?: string;
    clientMessageId?: string;
    role: ChatMessageRole;
    text: string;
    author?: string;
    createdAt?: string;
  };
  visitorName?: string;
  visitorContact?: string;
  status?: ChatSessionStatus;
};

const DATA_DIR = path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "chat-sessions.json");
const DATA_ENCODING = "syberspace.chat-sessions.v1";

type EncodedChatDatabase = {
  encoding: typeof DATA_ENCODING;
  iv: string;
  tag: string;
  data: string;
};

let writeQueue: Promise<unknown> = Promise.resolve();

async function ensureDatabaseFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await writeDatabase({ sessions: {} });
  }
}

function getPrimaryDataSecret() {
  return process.env.CHAT_DATA_SECRET
    ?? process.env.CHAT_MONITOR_SECRET
    ?? process.env.NEXTAUTH_SECRET
    ?? "syberspace-local-chat-data";
}

function getDataSecrets() {
  return Array.from(new Set([
    process.env.CHAT_DATA_SECRET,
    process.env.CHAT_MONITOR_SECRET,
    process.env.NEXTAUTH_SECRET,
    "syberspace-local-chat-data",
  ].filter((secret): secret is string => Boolean(secret))));
}

function getDataKey(secret = getPrimaryDataSecret()) {
  return createHash("sha256").update(secret).digest();
}

function encodeDatabase(database: ChatDatabase) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getDataKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(database), "utf8"),
    cipher.final(),
  ]);

  const encoded: EncodedChatDatabase = {
    encoding: DATA_ENCODING,
    iv: iv.toString("base64"),
    tag: cipher.getAuthTag().toString("base64"),
    data: encrypted.toString("base64"),
  };

  return JSON.stringify(encoded, null, 2);
}

function decodeDatabase(raw: string) {
  const parsed = JSON.parse(raw) as ChatDatabase | EncodedChatDatabase;

  if ("encoding" in parsed && parsed.encoding === DATA_ENCODING) {
    let lastError: unknown;
    for (const secret of getDataSecrets()) {
      try {
        const decipher = createDecipheriv("aes-256-gcm", getDataKey(secret), Buffer.from(parsed.iv, "base64"));
        decipher.setAuthTag(Buffer.from(parsed.tag, "base64"));

        const decrypted = Buffer.concat([
          decipher.update(Buffer.from(parsed.data, "base64")),
          decipher.final(),
        ]).toString("utf8");
        const database = JSON.parse(decrypted) as ChatDatabase;
        return {
          database: { sessions: database.sessions ?? {} },
          shouldRewrite: secret !== getPrimaryDataSecret(),
        };
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }

  return { database: { sessions: (parsed as ChatDatabase).sessions ?? {} }, shouldRewrite: true };
}

async function readDatabase(): Promise<ChatDatabase> {
  await ensureDatabaseFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");

  try {
    const { database, shouldRewrite } = decodeDatabase(raw);
    if (shouldRewrite) await writeDatabase(database);
    return database;
  } catch (error) {
    if (raw.includes(DATA_ENCODING)) throw error;
    return { sessions: {} };
  }
}

async function writeDatabase(database: ChatDatabase) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(DATA_FILE, encodeDatabase(database), "utf8");
}

function withWriteLock<T>(operation: () => Promise<T>) {
  const run = writeQueue.then(operation, operation);
  writeQueue = run.then(() => undefined, () => undefined);
  return run;
}

function createSession(sessionId: string, now: string): ChatSession {
  return {
    id: sessionId,
    createdAt: now,
    updatedAt: now,
    status: "active",
    unreadForAgent: 0,
    unreadForVisitor: 0,
    messages: [],
  };
}

export async function listChatSessions() {
  const database = await readDatabase();
  return Object.values(database.sessions).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getChatSession(sessionId: string) {
  const database = await readDatabase();
  return database.sessions[sessionId] ?? null;
}

export async function appendChatMessage(options: AppendOptions) {
  return withWriteLock(async () => {
    const database = await readDatabase();
    const now = new Date().toISOString();
    const session = database.sessions[options.sessionId] ?? createSession(options.sessionId, now);

    const clientMessageId = options.message.clientMessageId ?? options.message.id;
    const isDuplicate = clientMessageId
      ? session.messages.some(message => message.clientMessageId === clientMessageId || message.id === clientMessageId)
      : false;

    if (!isDuplicate) {
      const message: ChatMessage = {
        id: options.message.id ?? randomUUID(),
        clientMessageId,
        role: options.message.role,
        text: options.message.text,
        author: options.message.author,
        createdAt: options.message.createdAt ?? now,
      };

      session.messages.push(message);
      session.lastMessage = message.text;
      session.updatedAt = message.createdAt;

      if (message.role === "user") session.unreadForAgent += 1;
      if (message.role === "agent") session.unreadForVisitor += 1;
    }

    session.visitorName = options.visitorName || session.visitorName;
    session.visitorContact = options.visitorContact || session.visitorContact;
    session.status = options.status ?? session.status;
    session.updatedAt = new Date().toISOString();
    database.sessions[session.id] = session;

    await writeDatabase(database);
    return session;
  });
}

export async function updateChatSession(
  sessionId: string,
  patch: {
    status?: ChatSessionStatus;
    readBy?: "agent" | "visitor";
    visitorName?: string;
    visitorContact?: string;
  },
) {
  return withWriteLock(async () => {
    const database = await readDatabase();
    const session = database.sessions[sessionId];
    if (!session) return null;

    if (patch.status) session.status = patch.status;
    if (patch.visitorName) session.visitorName = patch.visitorName;
    if (patch.visitorContact) session.visitorContact = patch.visitorContact;
    if (patch.readBy === "agent") session.unreadForAgent = 0;
    if (patch.readBy === "visitor") session.unreadForVisitor = 0;

    session.updatedAt = new Date().toISOString();
    await writeDatabase(database);
    return session;
  });
}
