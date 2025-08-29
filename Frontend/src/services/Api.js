import axios from "axios";

const API_URL = "http://localhost:63148"; // adapte selon ton backend

export const getDemandes = async () => {
  try {
    const res = await axios.get(`${API_URL}/demandes`);
    return res.data;
  } catch (error) {
    console.error("Erreur chargement demandes", error);
    return [];
  }
};

export const createDemande = async (demande) => {
  try {
    const res = await axios.post(`${API_URL}/demandes`, demande);
    return res.data;
  } catch (error) {
    console.error("Erreur création demande", error);
  }
};

export const updateDemande = async (id, demande) => {
  try {
    await axios.put(`${API_URL}/demandes/${id}`, demande);
  } catch (error) {
    console.error("Erreur modification demande", error);
  }
};

export const deleteDemande = async (id) => {
  try {
    await axios.delete(`${API_URL}/demandes/${id}`);
  } catch (error) {
    console.error("Erreur suppression demande", error);
  }
};
