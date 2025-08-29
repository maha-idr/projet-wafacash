import React, { useState } from "react";
import DemandeList from "../components/DemandeList";
import DemandeForm from "../components/DemandeForm";

const Dashboard = () => {
  const [demandeToEdit, setDemandeToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Tableau de bord</h1>
      <DemandeForm
        demandeToEdit={demandeToEdit}
        onSaved={() => {
          setRefresh(!refresh);
          setDemandeToEdit(null);
        }}
      />
      <DemandeList onEdit={(d) => setDemandeToEdit(d)} key={refresh} />
    </div>
  );
};

export default Dashboard;
