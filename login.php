<<<<<<< HEAD
<?php
include "db.php";
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT id, password FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        $_SESSION['user_id'] = $id;
        echo "✅ Login Successful!";
    } else {
        echo "❌ Invalid Email or Password!";
    }
}

header("Content-Type: application/json");

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$response = [];

if ($email === "test@example.com" && $password === "123456") {
    $response['status'] = "success";
    $response['message'] = "Login Successful!";
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid Email or Password!";
}

echo json_encode($response);
?>
=======
<?php
header('Content-Type: application/json');
$email = $_POST['email'];
$password = $_POST['password'];

if ($email == "test@example.com" && $password == "123456") {
    echo json_encode(["status" => "success", "message" => "✅ Login Successful! Redirecting..."]);
} else {
    echo json_encode(["status" => "error", "message" => "❌ Invalid Email or Password!"]);
}
?>
>>>>>>> 5acc803 (Updated files)
