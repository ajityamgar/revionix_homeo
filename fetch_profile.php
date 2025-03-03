<<<<<<< HEAD
<?php
include "db.php";
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Login Required");
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT first_name, last_name, email, phone FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

echo json_encode($user);
?>
=======
<?php
include "db.php";
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Login Required");
}

$user_id = $_SESSION['user_id'];
$sql = "SELECT first_name, last_name, email, phone FROM users WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

echo json_encode($user);
?>
>>>>>>> 5acc803 (Updated files)
