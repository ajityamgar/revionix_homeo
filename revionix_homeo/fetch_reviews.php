<?php
include "db.php";

$sql = "SELECT users.first_name, users.last_name, reviews.rating, reviews.review_text FROM reviews 
        JOIN users ON reviews.user_id = users.id ORDER BY reviews.id DESC";
$result = $conn->query($sql);

$reviews = [];
while ($row = $result->fetch_assoc()) {
    $reviews[] = $row;
}
echo json_encode($reviews);
?>
