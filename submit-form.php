<?php
require 'src/db/db.php'; // Database connection file

session_start();
if (!isset($_SESSION['last_submit'])) {
    $_SESSION['last_submit'] = time();
} else {
    $time_diff = time() - $_SESSION['last_submit'];
    if ($time_diff < 10) {
        die("Too many requests! Please wait.");
    }
    $_SESSION['last_submit'] = time();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]);

        // Sanitize & Validate Input
        $name = htmlspecialchars(trim($_POST['name']));
        $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
        $service = htmlspecialchars(trim($_POST['service']));
        $message = htmlspecialchars(trim($_POST['message']));

        if (!$email) {
            die("Invalid email format");
        }

        // Insert into database
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, service, message) VALUES (:name, :email, :service, :message)");
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':service' => $service,
            ':message' => $message
        ]);

        header('Content-Type: application/json');
        echo json_encode(["message" => "Thank you for your message! We will get back to you soon."]);
    } catch (PDOException $e) {
        header('Content-Type: application/json');
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo "Invalid request.";
}
