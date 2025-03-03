<<<<<<< HEAD
<?php
include "db.php";
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Login Required");
}

$user_id = $_SESSION['user_id'];
$appointment_type = $_POST['appointment_type'];
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];
$message = $_POST['message'];

$sql = "INSERT INTO appointments (user_id, appointment_type, appointment_date, appointment_time, message) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $user_id, $appointment_type, $appointment_date, $appointment_time, $message);

if ($stmt->execute()) {
    echo "Appointment Booked Successfully";
} else {
    echo "Error: " . $stmt->error;
}
?>
=======
<?php
include "db.php";
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Login Required");
}

$user_id = $_SESSION['user_id'];
$appointment_type = $_POST['appointment_type'];
$appointment_date = $_POST['appointment_date'];
$appointment_time = $_POST['appointment_time'];
$message = $_POST['message'];

$sql = "INSERT INTO appointments (user_id, appointment_type, appointment_date, appointment_time, message) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issss", $user_id, $appointment_type, $appointment_date, $appointment_time, $message);

if ($stmt->execute()) {
    echo "Appointment Booked Successfully";
} else {
    echo "Error: " . $stmt->error;
}
?>
>>>>>>> 5acc803 (Updated files)
