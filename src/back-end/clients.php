<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $nom = $conn->real_escape_string($data["nom"]);
    $prenom = $conn->real_escape_string($data["prenom"]);
    $email = $conn->real_escape_string($data["email"]);
    $telephone = $conn->real_escape_string($data["telephone"]);
    $adresse = $conn->real_escape_string($data["adresse"]);
    $ville = $conn->real_escape_string($data["ville"]);
    $pays = $conn->real_escape_string($data["pays"]);

    
    $sql_check_client = "SELECT id FROM clients WHERE email='$email' LIMIT 1";
    $result = $conn->query($sql_check_client);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(["client_id" => $row["id"]]);
    } else {
       
        $sql_insert_client = "INSERT INTO clients (nom, prenom, email, telephone, adresse, ville, pays, date_creation) 
                              VALUES ('$nom', '$prenom', '$email', '$telephone', '$adresse', '$ville', '$pays', NOW())";
        
        if ($conn->query($sql_insert_client) === TRUE) {
            echo json_encode(["client_id" => $conn->insert_id]);
        } else {
            echo json_encode(["error" => "Erreur lors de l'ajout du client: " . $conn->error]);
        }
    }
}

$conn->close();
?>
