<?php
header('Access-Control-Allow-Origin: *');

include 'db.php';
$sql = "SELECT * FROM configuration";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $elements = array();
    while($row = $result->fetch_assoc()) {
        $elements[] = $row;
    }
    echo json_encode($elements);
} else {
    echo "Aucun élément trouvé";
}

$conn->close();
?>
