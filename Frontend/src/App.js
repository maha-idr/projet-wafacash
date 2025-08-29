import React, { useState } from "react";

export default function App() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:63148/api/demandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });

    if (response.ok) {
      alert("Demande envoyée !");
    } else {
      alert("Erreur lors de l'envoi.");
    }
  };

  return (
    <div>
      <h1>Créer une demande</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
