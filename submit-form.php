<?php
require 'src/db/db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    if (!empty($name) && !empty($email) && !empty($service) && !empty($message)) {
        try {
            $stmt = $pdo->prepare("INSERT INTO contacts (name, email, service, message) VALUES (:name, :email, :service, :message)");
            $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':service' => $service,
                ':message' => $message
            ]);
            echo "success";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "All fields are required!";
    }
} else {
    echo "Invalid request!";
}
?>
