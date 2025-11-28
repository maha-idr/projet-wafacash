import { useState } from "react";
import { api } from "../api/client";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("Commercial");
  const [msg, setMsg] = useState(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setOk(false);
    setLoading(true);

    // Validations côté client (identiques à ta version précédente)
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
    if (!/[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]/.test(password)) {
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

      const okMsg = res?.data?.message || "Compte créé avec succès !";
      setMsg(okMsg);
      setOk(true);

      // Reset champs
      setName("");
      setEmail("");
      setUsername("");
      setPw("");
      setRole("Commercial");

      // Redirection après 2s
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      let errorMessage = "Erreur d'inscription";
      if (err?.response) {
        const apiData = err.response.data;
        if (typeof apiData === "string") errorMessage = apiData;
        else if (apiData?.message) errorMessage = apiData.message;
        else if (apiData?.errors) {
          errorMessage = Object.values(apiData.errors).flat().join(", ");
        }
      } else if (err?.request) {
        errorMessage = "Impossible de contacter le serveur";
      }
      setMsg(errorMessage);
      setOk(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.screen}>
      <div style={styles.card}>
        {/* Titre */}
        <h1 style={styles.title}>Créer un compte</h1>

        {/* Alerte */}
        {msg && (
          <div style={{ 
            ...styles.alert, 
            ...(ok ? styles.alertSuccess : null) 
          }}>
            <span style={styles.alertIcon}>{ok ? "✅" : "⚠️"}</span>
            <span>{msg}</span>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={submit} style={styles.form}>
          {/* Nom complet */}
          <label style={styles.label}>Nom complet</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 21a9 9 0 1118 0" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              style={styles.input}
              placeholder="Nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <label style={styles.label}>Email</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M4 6h16v12H4zM4 6l8 6 8-6" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          {/* Identifiant */}
          <label style={styles.label}>Identifiant</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM3 21a9 9 0 1118 0" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              style={styles.input}
              placeholder="Identifiant"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          {/* Mot de passe */}
          <label style={styles.label}>Mot de passe</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 11a7 7 0 0114 0v2h1a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6a1 1 0 011-1h1v-2z" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <input
              style={styles.input}
              type={show ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPw(e.target.value)}
              required
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              style={styles.eyeBtn}
              aria-label={show ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {show ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 3l18 18M10.58 10.58A3 3 0 0113.4 13.4M9.88 5.08C10.56 5 11.27 5 12 5c5.2 0 9.6 3.2 11 7-0.39 1.05-1 2.02-1.76 2.86M6.53 6.53C4.29 7.67 2.63 9.46 2 12c1.25 3.8 5.3 7 10 7 1.07 0 2.1-.14 3.07-.41" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7S2 12 2 12z" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#8a8a8a" strokeWidth="1.8"/>
                </svg>
              )}
            </button>
          </div>
          <small style={{ color: "#6b7280", fontSize: 12, marginTop: -2 }}>
            Doit contenir : 8+ caractères, majuscule, minuscule, chiffre, caractère spécial
          </small>

          {/* Rôle */}
          <label style={styles.label}>Rôle</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M6 9l6 6 6-6" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ ...styles.input, paddingLeft: 40, paddingRight: 12 }}
            >
              <option value="Commercial">Commercial</option>
              <option value="Support_IT">Support IT</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.primaryBtn, ...(loading ? styles.btnDisabled : null) }}
          >
            {loading ? "Création en cours..." : "CRÉER LE COMPTE"}
          </button>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <a href="/login" style={styles.link}>Déjà inscrit ? Se connecter</a>
          <div style={styles.copy}>© 2025 Wafacash. Tous droits réservés.</div>
        </div>
      </div>
    </div>
  );
}

/* --- mêmes styles que LoginPage.jsx --- */
const styles = {
  screen: {
    position: "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    background: "#f5f6f8",
    display: "grid",
    placeItems: "center",
    padding: "24px",
    boxSizing: "border-box",
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Ubuntu, Cantarell, "Noto Sans", "Helvetica Neue", Arial',
    color: "#101010",
    zIndex: 0,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "#fff",
    borderRadius: 18,
    boxShadow:
      "0 1px 2px rgba(16,24,40,.06), 0 8px 24px rgba(16,24,40,.08)",
    padding: "32px 36px",
  },
  title: {
    fontSize: 28,
    lineHeight: 1.2,
    margin: "6px 0 16px",
    fontWeight: 700,
  },
  alert: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "#fdecea",
    color: "#b42318",
    border: "1px solid #f6c5c0",
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 12,
  },
  alertSuccess: {
    background: "#e8f5e9",
    color: "#1b5e20",
    border: "1px solid #c8e6c9",
  },
  alertIcon: { fontSize: 16 },
  form: { display: "grid", gap: 10 },
  label: { fontSize: 14, color: "#4b5563", marginTop: 6 },
  inputWrap: { position: "relative", display: "grid" },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  input: {
    height: 44,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    padding: "0 12px 0 40px",
    fontSize: 15,
    outline: "none",
    transition: "border-color .15s, box-shadow .15s",
  },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "transparent",
    border: "none",
    padding: 6,
    cursor: "pointer",
  },
  primaryBtn: {
    marginTop: 6,
    height: 48,
    borderRadius: 10,
    border: "1px solid #e0b000",
    background: "#FFD12F",
    fontWeight: 800,
    letterSpacing: 0.3,
    fontSize: 15,
    cursor: "pointer",
  },
  btnDisabled: { opacity: 0.7, cursor: "not-allowed" },
  footer: { marginTop: 16, textAlign: "center" },
  link: { color: "#1f2937", textDecoration: "none" },
  copy: { marginTop: 16, fontSize: 12, color: "#6b7280" },
};
