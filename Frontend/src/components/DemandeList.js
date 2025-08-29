import React, { useEffect, useState } from "react";
import { getDemandes, deleteDemande } from "../services/Api";

function DemandeList({ setEditingDemande }) {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    fetchDemandes();
  }, []);

  const fetchDemandes = async () => {
    const data = await getDemandes();
    setDemandes(data);
  };

  const handleDelete = async (id) => {
    await deleteDemande(id);
    fetchDemandes();
  };

  return (
    <div>
      <h2>Liste des demandes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((d) => (
            <tr key={d.id}>
              <td>{d.nom}</td>
              <td>{d.statut}</td>
              <td>
                <button 
                  className="btn btn-sm btn-primary me-2" 
                  onClick={() => setEditingDemande(d)}
                >
                  Modifier
                </button>
                <button 
                  className="btn btn-sm btn-danger" 
                  onClick={() => handleDelete(d.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DemandeList;
