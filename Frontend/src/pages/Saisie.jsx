import React, { useState } from "react";
import { apidemande } from "../api/client";

// 👉 Listes centralisées
const regions = [
    "GRAND CASABLANCA", "TENSIFT", "SOUSS SAHARA", "RABAT AL GHARB", "TADLA",
    "FES-SAISS", "ORIENTAL", "TANGER LOUKKOS", "CASA SUD", "CASA NORD"
];

const typesReseau = ["3G", "4G", "5G"];

const villes = [
    "CASABLANCA", "AGADIR", "OULED AYAD", "OULED YAICH", "OULED YOUSSEF", "OULED MBAREK",
    "TANTAN", "TLAT LOULAD", "TAROUDANT", "AL HOCEIMA", "BENI MELLAL", "SOUK SEBT",
    "FQUIH BEN SALAH", "BEN SLIMANE", "BOUJNIBA", "EL JADIDA", "ESSAOUIRA", "FES",
    "ZAGORA", "KENITRA", "SIDI KACEM", "SIDI SLIMANE", "KHENIFRA", "KHOURIBGA", "MARRAKECH",
    "MEKNES", "NADOR", "OUARZAZATE", "OUJDA", "BERKANE", "GUERCIF", "SAFI", "YOUSSOUFIA",
    "SETTAT", "TANGER", "RABAT", "SALE", "SKHIRAT", "TEMARA", "TETOUAN", "MOHAMMEDIA",
    "GUELMIM", "DAKHLA", "TINGHIR", "TIZNIT", "LAAYOUNE"
];

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
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données envoyées :", formData);

        try {
            await apidemande.post("api/Demande/CreateDemande", formData);
            alert(" Formulaire soumis avec succès");

            // Reset
            setFormData({
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
        } catch (error) {
            console.error(" Erreur lors de l'envoi :", error);
            alert("Erreur lors de l'envoi des données.");
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-header">
                    <h2 className="form-title">Saisie d'une agence</h2>
                </div>

                <form onSubmit={handleSubmit} className="agency-form">
                    {/* Région */}
                    <div className="form-group">
                        <label>Région <span className="required">*</span></label>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            required
                            className="form-input"
                        >
                            <option value="">-- Sélectionnez une région --</option>
                            {regions.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Type réseau */}
                    <div className="form-group">
                        <label>Type de réseau <span className="required">*</span></label>
                        <select
                            name="typeReseau"
                            value={formData.typeReseau}
                            onChange={handleChange}
                            required
                            className="form-input"
                        >
                            <option value="">-- Sélectionnez le type de réseau --</option>
                            {typesReseau.map((t) => (
                                <option key={t} value={t}>{t}</option>
                            ))}
                        </select>
                    </div>

                    {/* Libellé mandataire */}
                    <div className="form-group">
                        <label>Libellé mandataire <span className="required">*</span></label>
                        <input
                            type="text"
                            name="libelleMandataire"
                            value={formData.libelleMandataire}
                            onChange={handleChange}
                            placeholder="Entrez le libellé mandataire"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Code */}
                    <div className="form-group">
                        <label>Code <span className="required">*</span></label>
                        <input
                            type="text"
                            name="code"
                            value={formData.code}
                            onChange={handleChange}
                            placeholder="Entrez le code"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Nom agence */}
                    <div className="form-group">
                        <label>Nom de l'agence <span className="required">*</span></label>
                        <input
                            type="text"
                            name="nomAgence"
                            value={formData.nomAgence}
                            onChange={handleChange}
                            placeholder="Entrez le nom de l'agence"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Téléphone */}
                    <div className="form-group">
                        <label>Téléphone de contact <span className="required">*</span></label>
                        <input
                            type="tel"
                            name="telephoneContact"
                            value={formData.telephoneContact}
                            onChange={handleChange}
                            placeholder="06XXXXXXXX"
                            pattern="^0[5-7][0-9]{8}$"
                            required
                            className="form-input"
                        />
                    </div>

                    {/* Ville */}
                    <div className="form-group">
                        <label>Ville <span className="required">*</span></label>
                        <select
                            name="ville"
                            value={formData.ville}
                            onChange={handleChange}
                            required
                            className="form-input"
                        >
                            <option value="">-- Sélectionnez une ville --</option>
                            {villes.map((v) => (
                                <option key={v} value={v}>{v}</option>
                            ))}
                        </select>
                    </div>

                    {/* Adresse livraison */}
                    <div className="form-group">
                        <label>Adresse de livraison</label>
                        <input
                            type="text"
                            name="adresseLivraison"
                            value={formData.adresseLivraison}
                            onChange={handleChange}
                            placeholder="Entrez l'adresse de livraison"
                            className="form-input"
                        />
                    </div>
                    {/* Envoi modem */} <div className="form-group">

                        <label>Envoi modem</label>
                        <select name="envoiModem" value={formData.envoiModem}
                            onChange={handleChange} className="form-input" >
                            <option value="">-- Choisir --</option>
                            <option value="OUI">Oui</option>
                            <option value="NON">Non</option>
                        </select> </div>

                    {/* Modem */}
                    <div className="form-group">
                        <label>Modem</label>
                        <input type="text" name="modem" placeholder="Entrez le modèle de modem" value={formData.modem}
                            onChange={handleChange} className="form-input" />
                    </div>
                    <button type="submit" className="btn-submit">Envoyer</button>
                </form>
            </div>
            <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #fef9e7 0%, #fcf3cf 100%);
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .form-card {
          width: 100%;
          max-width: 650px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(255, 204, 0, 0.2);
          padding: 35px;
          border-top: 6px solid #ffcc00;
        }
        
        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #fef9e7;
        }
        
        .form-title {
          color: #333;
          margin: 0;
          font-size: 28px;
          font-weight: 700;
        }
        
        .form-icon {
          font-size: 36px;
          background: #ffcc00;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 10px rgba(255, 204, 0, 0.3);
        }
        
        .agency-form {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group label {
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
          font-size: 16px;
          display: flex;
          align-items: center;
        }
        
        .required {
          color: #ff4d4d;
          margin-left: 4px;
        }
        
        .form-input {
          padding: 15px 18px;
          border: 2px solid #eee;
          border-radius: 10px;
          font-size: 16px;
          transition: all 0.3s;
          background-color: #fff;
          color: #333;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #ffcc00;
          box-shadow: 0 0 0 3px rgba(255, 204, 0, 0.3);
        }
        
        .form-input::placeholder {
          color: #aaa;
        }
        
        .radio-group {
          display: flex;
          gap: 25px;
          margin-top: 8px;
        }
        
        .radio-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          position: relative;
          color: #555;
          font-weight: 500;
        }
        
        .radio-label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
        }
        
        .radio-custom {
          height: 22px;
          width: 22px;
          background-color: #fff;
          border: 2px solid #ffcc00;
          border-radius: 50%;
          margin-right: 12px;
          position: relative;
          transition: all 0.3s;
        }
        
        .radio-label input:checked ~ .radio-custom {
          background-color: #ffcc00;
        }
        
        .radio-label input:checked ~ .radio-custom:after {
          content: "";
          position: absolute;
          display: block;
          top: 4px;
          left: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #fff;
        }
        
        .submit-button {
          padding: 18px;
          background-color: #ffcc00;
          color: #333;
          border: none;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          margin-top: 15px;
          box-shadow: 0 4px 10px rgba(255, 204, 0, 0.3);
        }
        
        .submit-button:hover {
          background-color: #ffd633;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255, 204, 0, 0.4);
        }
        
        .submit-button:active {
          transform: translateY(0);
        }
        
        textarea.form-input {
          resize: vertical;
          min-height: 110px;
          font-family: inherit;
        }
        
        select.form-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffcc00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 18px center;
          background-size: 18px;
        }
        
        @media (max-width: 700px) {
          .form-card {
            padding: 25px 20px;
          }
          
          .form-header {
            flex-direction: column;
            text-align: center;
            gap: 15px;
          }
          
          .radio-group {
            flex-direction: column;
            gap: 12px;
          }
          
          .form-title {
            font-size: 24px;
          }
        }
      `}</style>
        </div>
    );
};

export default AgencyForm;
