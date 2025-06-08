
import React from "react";
import Configurator from "./pages/configurator";
import Navbar from "./componnents/navbar/nav";
import Footer from "./componnents/footer/footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Commande from "./pages/commande";
import Contact from "./pages/contact";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Configurator />} /> 
            <Route path="/config" element={<Configurator />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/commande" element={<Commande />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
export default App;

