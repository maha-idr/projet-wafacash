import React, { useState, useEffect } from "react";
import { createDemande, updateDemande } from "../services/Api";

function DemandeForm({ editingDemande, setEditingDemande }) {
  const [nom, setNom] = useState("");

  useEffect(() => {
    if (editingDemande) setNom(editingDemande.nom);
  }, [editingDemande]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom.trim()) return;

    if (editingDemande) {
      await updateDemande(editingDemande.id, { nom });
      setEditingDemande(null);
    } else {
      await createDemande({ nom });
    }

    setNom("");
    window.location.reload(); // recharge la liste après ajout/modification
  };

  return (
    <div>
      <h2>{editingDemande ? "Modifier Demande" : "Nouvelle Demande"}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input 
          type="text" 
          value={nom} 
          onChange={(e) => setNom(e.target.value)} 
          placeholder="Nom de la demande" 
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">
          {editingDemande ? "Modifier" : "Ajouter"}
        </button>
        {editingDemande && (
          <button 
            type="button" 
            className="btn btn-secondary ms-2"
            onClick={() => setEditingDemande(null)}
          >
            Annuler
          </button>
        )}
      </form>
    </div>
  );
}

export default DemandeForm;
