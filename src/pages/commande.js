
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/commande.css";
import Paiement from "./paiement";

const Commande = () => {
  const location = useLocation();
  const { config } = location.state;
  const [paiementEffectue, setPaiementEffectue] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    pays: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
// LA partie zadha chatgpt 
const handlePaiementValide = () => {
  if (!config || config.length === 0) {
    console.error("Erreur : config est vide ou non défini.");
    return;
  }

  axios.post("http://localhost:8000/clients.php", formData)
    .then((response) => {
      console.log("Réponse de clients.php :", response.data); 

      if (response.data.client_id) {
        const clientId = response.data.client_id;

        const commandesData = {
          id_client: clientId,
          commandes: config
            .filter((item) => item.qty > 0)
            .map((item) => ({ id_configuration: item.id })),
        };

        return axios.post("http://localhost:8000/commandes.php", commandesData);
      } else {
        throw new Error("Erreur lors de l'ajout du client - client_id non reçu");
      }
    })
    .then(() => {
      setPaiementEffectue(true);
    })
    .catch((error) => {
      console.error("Erreur API :", error.response ? error.response.data : error.message);
    });
};

  

  return (
    <div className="logooo">
    <div className="commande-container">
    <h3>Finaliser la commande</h3>
      {!paiementEffectue ? (
        <div className="commande-content">
          <form>
            <input type="text" name="nom" placeholder="Nom" onChange={handleChange} required value={formData.nom} />
            <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} required value={formData.prenom} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required value={formData.email} />
            <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} required value={formData.telephone} />
            <input type="text" name="adresse" placeholder="Adresse" onChange={handleChange} required value={formData.adresse} />
            <input type="text" name="ville" placeholder="Ville" onChange={handleChange} required value={formData.ville} />
            <input type="text" name="pays" placeholder="Pays" onChange={handleChange} required value={formData.pays} />

            <h3>Récapitulatif</h3>
            <ul>
              {config.map((item, index) => (
                item.qty > 0 && <li key={index}>{item.name}: {item.qty} x {item.price}€</li>
              ))}
            </ul>
          </form>

          <h3>Paiement sécurisé</h3>
          <Paiement onPaiementValide={handlePaiementValide} />
        </div>
      ) : (
        <h2 className="success-message">Votre commande a été validée ! Merci pour votre achat.</h2>
      )}
    </div>
    </div>
  );
};

export default Commande;

