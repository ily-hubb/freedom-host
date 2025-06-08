import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "../styles/ConfigForm.css";

const Configurator = () => {
  const [config, setConfig] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const elementConfig = {
    "vCPU (Per vCPU)": { maxQty: 16, type: "range" },
    "RAM (Per 1Gb)": { maxQty: 128, type: "range" },
    "HDD (Per 1Gb)": { maxQty: 100, type: "range" },
    "SSD (Per 1Gb)": { maxQty: 100, type: "range" },
    "Traffic (Per 100Go)": { maxQty: 100, type: "range" },
    "Licence cPanel (5 accounts)": { maxQty: 1, type: "radio" },
    "Licence Jet Backup (Per Server)": { maxQty: 1, type: "radio" },
    "Licence CloudLinux": { maxQty: 1, type: "radio" },
    "Licence Imunify 360": { maxQty: 1, type: "radio" },
    "CDN CloudFlare (Per Domain)": { maxQty: 1, type: "radio" },
    "CloudFlare Firewall Option - Faster Speeds & Enhanced Security (Per Domain)": { maxQty: 1, type: "radio" },
    "SSL (Per Domain)": { maxQty: 100, type: "range" },
    "Licence Veeam (Per Server)": { maxQty: 1, type: "radio" },
    "Backup Externe (Per 1Gb)": { maxQty: 1000, type: "range" },
    "Infogérence et Supervision 24/7 (Per Server)": { maxQty: 1, type: "radio" },
    "SMTP Security Gateway": { maxQty: 1, type: "radio" },
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/configurator.php") 
      .then((response) => {
        const data = response.data.map((item) => ({
          id: item.id,
          name: item.element,
          pu: item.pu,
          qty: item.qte !== null ? item.qte : 0,
          pt: item.pt !== null ? item.pt : 0,
          maxQty: elementConfig[item.element]?.maxQty || 10,
          type: elementConfig[item.element]?.type || "range",
        }));
        setConfig(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de chargement des données:", error);
        setLoading(false);
      });
  }, []);

  const handleChange = (id, value) => {
    setConfig((prevConfig) =>
      prevConfig.map((item) =>
        item.id === id
          ? { ...item, qty: Number(value), pt: Number(value) * item.pu }
          : item
      )
    );
  };
  const totalCost = config.reduce((sum, item) => sum + item.pt, 0);
  const handleOrder = () => {
    const selectedConfig = config.filter((item) => item.qty > 0);
    navigate("/commande", { state: { config: selectedConfig, total: totalCost } });
  };

  return (
    <div>
      <section className="hero-section">
        <h1>Bienvenue dans notre plateforme</h1>
        <p>Découvrez nos meilleures offres</p>
      </section>
    <div className="config-container">
      <h2>Configuration du Serveur</h2>
      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <div className="config-items">
          {config.map((item) => (
            <div key={item.id} className="config-item">
              <label>{item.name} ({item.pu} USD)</label>
              {item.type === "range" ? (
                <input
                  type="range"
                  min="0"
                  max={item.maxQty}
                  step="1"
                  value={item.qty}
                  onChange={(e) => handleChange(item.id, e.target.value)}
                />
              ) : (
                <div className="radio-group">
                  <label>
                    <input type="radio" checked={item.qty === 1} onChange={() => handleChange(item.id, 1)} /> Oui
                  </label>
                  <label>
                    <input type="radio" checked={item.qty === 0} onChange={() => handleChange(item.id, 0)} /> Non
                  </label>
                </div>
              )}
              <span> Quantité: {item.qty} </span>
              <span> | Prix Total: {item.pt} USD</span>
            </div>
          ))}
        </div>
      )}
      <h3>Total: {totalCost} USD</h3>
      <div className="command-button-container">
        <button onClick={handleOrder} className="btn">Commander</button>
      </div>
    </div>
    </div>
  );
};

export default Configurator;
