<?php

    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["massage"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($subject) OR empty($lname) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.
        // $recipient = "support@syberspace.com.ng";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "First Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        // $email_headers = "From: $name <$email>";

        
$username = 'support@syberspace.com.ng'; // your email address
$password = 'njzltw4vM!#o'; // your email address password

$from = "support@syberspace.com.ng";
$to = "support@syberspace.com.ng";
// $body= "Name: ".$name." <br> Email: ".$email." <br>Message:".$message." ";

$headers = array ('From' => $from, 'To' => $to, 'Subject' => $subject); // the email headers
$smtp = Mail::factory('smtp', array ('host' =>'localhost', 'auth' => true, 'username' => $username, 'password' => $password, 'port' =>'25'));$mail = $smtp->send($to, $headers, $email_content); // sending the email

if (PEAR::isError($mail)){
// echo("<p>" . $mail->getMessage() . "</p>");
// }
// else {
// // header("Location: http://www.example.com/"); // you can redirect page on successful submission.
// }

//         // Send the email.
//         if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>

