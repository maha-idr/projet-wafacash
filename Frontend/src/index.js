import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import AgencyForm from "./AgencyForm";
import ConsultationExport from "./components/ConsultationExport";


function App() {
  const [screen, setScreen] = useState("form"); // form ou consult

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setScreen("form")}>Écran 1 - Saisie</button>
        <button onClick={() => setScreen("consult")}>Écran 3 - Consultation</button>
      </div>

      {screen === "form" && <AgencyForm />}
      {screen === "consult" && <ConsultationExport />}
    </div>
  );
}

const rootElement = document.createElement("div"); 
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<App />);
