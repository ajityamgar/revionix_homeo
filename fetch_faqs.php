<?php
include "db.php";

$sql = "SELECT question, answer FROM faqs";
$result = $conn->query($sql);

$faqs = [];
while ($row = $result->fetch_assoc()) {
    $faqs[] = $row;
}
echo json_encode($faqs);
?>
