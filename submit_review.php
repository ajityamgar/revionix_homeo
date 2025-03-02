<?php
include "db.php";
session_start();

if (!isset($_SESSION['user_id'])) {
    die("Login Required");
}

$user_id = $_SESSION['user_id'];
$rating = $_POST['rating'];
$review_text = $_POST['review_text'];

$sql = "INSERT INTO reviews (user_id, rating, review_text) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iis", $user_id, $rating, $review_text);

if ($stmt->execute()) {
    echo "Review Submitted Successfully";
} else {
    echo "Error: " . $stmt->error;
}
?>
