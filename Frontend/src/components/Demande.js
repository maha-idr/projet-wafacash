import React, { useEffect, useState } from "react";
import { getDemandes, createDemande, deleteDemande } from "../services/Api";

function Demande() {
  const [demandes, setDemandes] = useState([]);
  const [newDemande, setNewDemande] = useState("");

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    const res = await getDemandes();
    setDemandes(res);
  };

  const handleAdd = async () => {
    if (!newDemande.trim()) return;
    const res = await createDemande({ nom: newDemande });
    setDemandes([...demandes, res]);
    setNewDemande("");
  };

  const handleDelete = async (id) => {
    await deleteDemande(id);
    setDemandes(demandes.filter((d) => d.id !== id));
  };

  return (
    <div>
      <h2>Liste des demandes</h2>
      <ul>
        {demandes.map((d) => (
          <li key={d.id}>
            {d.nom}
            <button onClick={() => handleDelete(d.id)}>❌</button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        value={newDemande}
        onChange={(e) => setNewDemande(e.target.value)}
        placeholder="Nouvelle demande"
      />
      <button onClick={handleAdd}>Ajouter</button>
    </div>
  );
}

export default Demande;
