import React, { useState } from "react";
import './Contact.css';  // Assurez-vous que le chemin est correct

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: "",
  });

  const [isHovering, setIsHovering] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("📨 Message envoyé avec succès !");
    setFormData({ nom: "", email: "", message: "" });
  };

  return (
    <div className="container">
      <h2>Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="nom"
          placeholder="Votre nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Votre email"
          value={formData.email}
          onChange={handleChange}
          required
          className="input"
        />
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          required
          className="textarea"
        />
        <button
          type="submit"
          className={isHovering ? "button hover" : "button"}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Contact;
