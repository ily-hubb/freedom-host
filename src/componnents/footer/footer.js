import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./footer.css";

export default function Footer(){
    return(
        <div>
            <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Plan du site</h3>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/about">Configuration</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email : contact@configuration.com</p>
          <p>Téléphone : +212 6 00 00 00 00</p>
          <p>Adresse : Rue des atlas, rabat, Maroc</p>
        </div>

       
        <div className="footer-section">
          <h3>Informations</h3>
          <ul>
            <li><a href="/privacy-policy">Politique de confidentialité</a></li>
            <li><a href="/terms">Mentions légales</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy;  Infomaniak-Documents légaux-Mentions légales-
Protection des données-Politique de confidentialité-
Plan de site-Gérez vos cookies.</p>
      </div>
    </footer>
        </div>
    )
};