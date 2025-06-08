 <?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    $client_id = $conn->real_escape_string($data["id_client"]);
    $commandes = $data["commandes"];  // Utilise le bon nom de champ

    foreach ($commandes as $commande) {
        $config_id = $conn->real_escape_string($commande["id_configuration"]);

        $sql_insert_order = "INSERT INTO commandes (id_client, id_configuration, date_commande, statut) 
                             VALUES ('$client_id', '$config_id', NOW(), 'En attente')";

        if (!$conn->query($sql_insert_order)) {
            echo json_encode(["error" => "Erreur lors de l'enregistrement de la commande: " . $conn->error]);
            exit;
        }
    }

    echo json_encode(["message" => "Commande enregistrée avec succès"]);
}

$conn->close();





?> 
