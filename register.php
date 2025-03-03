<<<<<<< HEAD
<?php
include "db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = ["status" => "error", "message" => "Something went wrong."];

    // Retrieve and sanitize form data
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $first_name = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
    $last_name = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $confirm_password = isset($_POST['confirm_password']) ? trim($_POST['confirm_password']) : '';

    // Validate empty fields
    if (!$username || !$first_name || !$last_name || !$email || !$phone || !$password || !$confirm_password) {
        $response["message"] = "❌ Please fill all fields!";
        echo json_encode($response);
        exit();
    }

    // Validate password match
    if ($password !== $confirm_password) {
        $response["message"] = "❌ Passwords do not match!";
        echo json_encode($response);
        exit();
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Check if email or username already exists
    $check_sql = "SELECT id FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $response["message"] = "❌ Username or Email already exists!";
        echo json_encode($response);
        exit();
    }

    // Insert into database
    $sql = "INSERT INTO users (username, first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $username, $first_name, $last_name, $email, $phone, $hashed_password);

    if ($stmt->execute()) {
        $response["status"] = "success";
        $response["message"] = "✅ Registration Successful!";
    } else {
        $response["message"] = "❌ Database Error: " . $stmt->error;
    }

    echo json_encode($response);
}
?>
=======
<?php
include "db.php";

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = ["status" => "error", "message" => "Something went wrong."];

    // Retrieve and sanitize form data
    $username = isset($_POST['username']) ? trim($_POST['username']) : '';
    $first_name = isset($_POST['first_name']) ? trim($_POST['first_name']) : '';
    $last_name = isset($_POST['last_name']) ? trim($_POST['last_name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $password = isset($_POST['password']) ? trim($_POST['password']) : '';
    $confirm_password = isset($_POST['confirm_password']) ? trim($_POST['confirm_password']) : '';

    // Validate empty fields
    if (!$username || !$first_name || !$last_name || !$email || !$phone || !$password || !$confirm_password) {
        $response["message"] = "❌ Please fill all fields!";
        echo json_encode($response);
        exit();
    }

    // Validate password match
    if ($password !== $confirm_password) {
        $response["message"] = "❌ Passwords do not match!";
        echo json_encode($response);
        exit();
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Check if email or username already exists
    $check_sql = "SELECT id FROM users WHERE email = ? OR username = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $response["message"] = "❌ Username or Email already exists!";
        echo json_encode($response);
        exit();
    }

    // Insert into database
    $sql = "INSERT INTO users (username, first_name, last_name, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $username, $first_name, $last_name, $email, $phone, $hashed_password);

    if ($stmt->execute()) {
        $response["status"] = "success";
        $response["message"] = "✅ Registration Successful!";
    } else {
        $response["message"] = "❌ Database Error: " . $stmt->error;
    }

    echo json_encode($response);
}
?>
>>>>>>> 5acc803 (Updated files)
