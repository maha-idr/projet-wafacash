import React, { useState } from "react";

const AgencyForm = () => {
  const [formData, setFormData] = useState({
    region: "",
    typeReseau: "",
    libelleMandataire: "",
    code: "",
    nomAgence: "",
    telephoneContact: "",
    ville: "",
    adresseLivraison: "",
    envoiModem: "",
    modem: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    // 🔹 Ici tu enverras les données vers ton backend Django
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Saisie d’une agence</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Region */}
        <select
          name="region"
          value={formData.region}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Sélectionnez une région --</option>
          <option value="region1">Région 1</option>
          <option value="region2">Région 2</option>
          <option value="region3">Région 3</option>
        </select>

        {/* Type réseau */}
        <select
          name="typeReseau"
          value={formData.typeReseau}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Sélectionnez le type de réseau --</option>
          <option value="3G">3G</option>
          <option value="4G">4G</option>
          <option value="5G">5G</option>
        </select>

        {/* Libellé mandataire */}
        <input
          type="text"
          name="libelleMandataire"
          placeholder="Libellé mandataire"
          value={formData.libelleMandataire}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Code */}
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Nom agence */}
        <input
          type="text"
          name="nomAgence"
          placeholder="Nom de l’agence"
          value={formData.nomAgence}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Téléphone contact */}
        <input
          type="tel"
          name="telephoneContact"
          placeholder="Numéro de téléphone"
          value={formData.telephoneContact}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        {/* Ville */}
        <select
          name="ville"
          value={formData.ville}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        >
          <option value="">-- Sélectionnez une ville --</option>
          <option value="Casablanca">Casablanca</option>
          <option value="Rabat">Rabat</option>
          <option value="Fès">Fès</option>
        </select>

        {/* Adresse de livraison */}
        <textarea
          name="adresseLivraison"
          placeholder="Adresse de livraison"
          value={formData.adresseLivraison}
          onChange={handleChange}
          rows={4}
          className="w-full border rounded p-2"
          required
        />

        {/* Envoi modem (radio) */}
        <div className="flex space-x-4 items-center">
          <span>Envoi modem :</span>
          <label>
            <input
              type="radio"
              name="envoiModem"
              value="oui"
              checked={formData.envoiModem === "oui"}
              onChange={handleChange}
            /> Oui
          </label>
          <label>
            <input
              type="radio"
              name="envoiModem"
              value="non"
              checked={formData.envoiModem === "non"}
              onChange={handleChange}
            /> Non
          </label>
        </div>

        {/* Modem */}
        <input
          type="text"
          name="modem"
          placeholder="Numéro modem (alphanumérique)"
          value={formData.modem}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required={formData.envoiModem === "oui"}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default AgencyForm;
