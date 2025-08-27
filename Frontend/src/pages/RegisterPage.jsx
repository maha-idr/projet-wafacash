import { useState } from "react";
import api from "../api/client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPw] = useState("");
  const [role, setRole] = useState("Commercial");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    
    // Validation côté client
    if (password.length < 8) {
      setMsg("Le mot de passe doit contenir au moins 8 caractères");
      setLoading(false);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setMsg("Le mot de passe doit contenir au moins une majuscule");
      setLoading(false);
      return;
    }

    if (!/[a-z]/.test(password)) {
      setMsg("Le mot de passe doit contenir au moins une minuscule");
      setLoading(false);
      return;
    }

    if (!/[0-9]/.test(password)) {
      setMsg("Le mot de passe doit contenir au moins un chiffre");
      setLoading(false);
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      setMsg("Le mot de passe doit contenir au moins un caractère spécial");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        username,
        password,
        roles: [role],
      });

      const okMsg = res?.data?.message || "Compte créé avec succès! ";
      setMsg(okMsg);
      
      // Réinitialiser les champs après succès
      setName("");
      setEmail("");
      setUsername("");
      setPw("");
      setRole("Commercial");
      
      // Redirection automatique après 2 secondes
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      
    } catch (err) {
      console.error("Erreur d'inscription:", err);
      
      let errorMessage = "Erreur d'inscription";
      
      if (err.response) {
        const apiData = err.response.data;
        
        if (typeof apiData === 'string') {
          errorMessage = apiData;
        } else if (apiData?.message) {
          errorMessage = apiData.message;
        } else if (apiData?.errors) {
          // Gestion des erreurs de validation
          errorMessage = Object.values(apiData.errors).flat().join(', ');
        }
      } else if (err.request) {
        errorMessage = "Impossible de contacter le serveur";
      }
      
      setMsg(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "3rem auto",
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans",
        display: "grid",
        gap: "1rem",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}
    >
      <h2 style={{ textAlign: "center", margin: 0 }}>Créer un compte</h2>

      <form onSubmit={submit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <input
            placeholder="Nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box" }}
          />
        </div>
        
        <div>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box" }}
          />
        </div>
        
        <div>
          <input
            placeholder="Identifiant"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box" }}
          />
        </div>
        
        <div>
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPw(e.target.value)}
            required
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box" }}
          />
          <small style={{ color: "#666", fontSize: "0.8rem" }}>
            Doit contenir: 8+ caractères, majuscule, minuscule, chiffre, caractère spécial
          </small>
        </div>
        
        <div>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: "0.75rem", boxSizing: "border-box" }}
          >
            <option value="Commercial">Commercial</option>
            <option value="Support_IT">Support IT</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: "0.75rem",
            backgroundColor: loading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {loading ? "Création en cours..." : "S'inscrire"}
        </button>
      </form>

      {msg && (
        <div
          style={{
            padding: "1rem",
            borderRadius: "6px",
            background: msg.toLowerCase().includes("créé") || msg.toLowerCase().includes("succès")
              ? "#d4edda"
              : "#f8d7da",
            color: msg.toLowerCase().includes("créé") || msg.toLowerCase().includes("succès")
              ? "#155724"
              : "#721c24",
            border: "1px solid",
            borderColor: msg.toLowerCase().includes("créé") || msg.toLowerCase().includes("succès")
              ? "#c3e6cb"
              : "#f5c6cb"
          }}
        >
          {msg}
        </div>
      )}

      <p style={{ textAlign: "center", margin: 0 }}>
        <a href="/login" style={{ color: "#007bff", textDecoration: "none" }}>
          Déjà un compte ? Se connecter
        </a>
      </p>
    </div>
  );
}