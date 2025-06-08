import { useState } from "react";

const Paiement = ({ onPaiementValide }) => {
  const [formData, setFormData] = useState({
    nomCarte: "",
    numeroCarte: "",
    expiration: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis :", formData);

    if (
      formData.nomCarte.trim() === "" ||
      formData.numeroCarte.length !== 16 ||
      formData.expiration.length !== 5 ||
      formData.cvc.length !== 3
    ) {
      alert("❌ Veuillez remplir correctement les champs !");
      return;
    }

    alert("✅ Paiement validé avec succès !");
    
    if (typeof onPaiementValide === "function") {
      onPaiementValide(); // Appeler la fonction pour valider le paiement
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nomCarte"
        placeholder="Nom sur la carte"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="numeroCarte"
        placeholder="Numéro de carte"
        maxLength="16"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="expiration"
        placeholder="MM/AA"
        maxLength="5"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="cvc"
        placeholder="CVC"
        maxLength="3"
        onChange={handleChange}
        required
      />
      <button type="submit">Payer</button>
    </form>
  );
};

export default Paiement;
