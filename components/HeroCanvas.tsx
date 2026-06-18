"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth || window.innerWidth;
    const H = mount.clientHeight || window.innerHeight;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene + Camera ────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 9;

    // ── Nodes ─────────────────────────────────────────────────────────
    const isMobile    = window.innerWidth < 768;
    const NODE_COUNT  = isMobile ? 55 : 110;
    const MAX_DIST    = 4.5;

    type NodeDatum = { x: number; y: number; z: number; vx: number; vy: number; vz: number };
    const nodeData: NodeDatum[] = [];
    const nodePosArr   = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      const x  = (Math.random() - 0.5) * 22;
      const y  = (Math.random() - 0.5) * 14;
      const z  = (Math.random() - 0.5) * 8;
      nodePosArr[i * 3]     = x;
      nodePosArr[i * 3 + 1] = y;
      nodePosArr[i * 3 + 2] = z;
      nodeData.push({ x, y, z,
        vx: (Math.random() - 0.5) * 0.004,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.002,
      });
    }

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodePosArr, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: isMobile ? 0.07 : 0.06,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.Points(nodeGeo, nodeMat));

    // ── Edges ─────────────────────────────────────────────────────────
    const edges: [number, number][] = [];
    const edgePosFlat: number[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodeData[i].x - nodeData[j].x;
        const dy = nodeData[i].y - nodeData[j].y;
        const dz = nodeData[i].z - nodeData[j].z;
        if (dx*dx + dy*dy + dz*dz < MAX_DIST * MAX_DIST) {
          edges.push([i, j]);
          edgePosFlat.push(nodeData[i].x, nodeData[i].y, nodeData[i].z,
                           nodeData[j].x, nodeData[j].y, nodeData[j].z);
        }
      }
    }

    const edgePosArr = new Float32Array(edgePosFlat.length);
    edgePosArr.set(edgePosFlat);
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePosArr, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(edgeGeo, edgeMat));

    // ── Data pulses ───────────────────────────────────────────────────
    const PULSE_COUNT = isMobile ? 12 : 22;
    const pulseGeo = new THREE.SphereGeometry(0.05, 5, 5);

    const pulses = Array.from({ length: PULSE_COUNT }, () => {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(pulseGeo, mat);
      scene.add(mesh);
      return {
        mesh,
        edgeIdx: Math.floor(Math.random() * edges.length),
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.007,
      };
    });

    // ── Mouse parallax ────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ───────────────────────────────────────────────────────
    let rafId: number;
    let tt = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      tt += 0.005;

      // Drift nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const n = nodeData[i];
        n.x += n.vx + Math.sin(tt * 0.5 + i * 0.3) * 0.0005;
        n.y += n.vy + Math.cos(tt * 0.4 + i * 0.2) * 0.0005;
        n.z += n.vz;
        if (Math.abs(n.x) > 11) n.vx *= -1;
        if (Math.abs(n.y) > 7)  n.vy *= -1;
        if (Math.abs(n.z) > 4)  n.vz *= -1;
        nodePosArr[i * 3]     = n.x;
        nodePosArr[i * 3 + 1] = n.y;
        nodePosArr[i * 3 + 2] = n.z;
      }
      nodeGeo.attributes.position.needsUpdate = true;

      // Update edges
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e];
        edgePosArr[e * 6]     = nodeData[a].x;
        edgePosArr[e * 6 + 1] = nodeData[a].y;
        edgePosArr[e * 6 + 2] = nodeData[a].z;
        edgePosArr[e * 6 + 3] = nodeData[b].x;
        edgePosArr[e * 6 + 4] = nodeData[b].y;
        edgePosArr[e * 6 + 5] = nodeData[b].z;
      }
      edgeGeo.attributes.position.needsUpdate = true;
      edgeMat.opacity = 0.13 + Math.sin(tt * 0.7) * 0.05;

      // Advance pulses along edges
      for (const p of pulses) {
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.edgeIdx = Math.floor(Math.random() * edges.length);
        }
        const [a, b] = edges[p.edgeIdx];
        p.mesh.position.set(
          nodeData[a].x + (nodeData[b].x - nodeData[a].x) * p.t,
          nodeData[a].y + (nodeData[b].y - nodeData[a].y) * p.t,
          nodeData[a].z + (nodeData[b].z - nodeData[a].z) * p.t,
        );
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = Math.sin(p.t * Math.PI) * 0.85;
      }

      // Mouse parallax
      camera.position.x += (mouseX * 1.8 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 1.2 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      scene.traverse(obj => {
        const o = obj as THREE.Mesh;
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
          else (o.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
