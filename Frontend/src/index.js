import React from "react";
import { createRoot } from "react-dom/client";
import AgencyForm from "./AgencyForm";

const rootElement = document.createElement("div"); 
rootElement.id = "root";
document.body.appendChild(rootElement);

const root = createRoot(rootElement);
root.render(<AgencyForm />);
