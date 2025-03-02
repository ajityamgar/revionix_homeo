<?php
$host = "localhost";  // Default MySQL host
$user = "root";       // Default MySQL username
$password = "";       // Default MySQL password (XAMPP me blank hota hai)
$dbname = "revionix_homeo";  // Aapka database name

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
}
?>