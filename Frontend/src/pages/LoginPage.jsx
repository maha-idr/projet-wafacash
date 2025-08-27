import { useState } from "react";
import api from "../api/client";
import { setAuth } from "../auth/useAuth";

export default function LoginPage() {
  const [identifier, setId] = useState("");
  const [password, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const { data } = await api.post("/auth/login", { identifier, password });
      // data: { accessToken, role, expiresAt }
      setAuth({ accessToken: data.accessToken, role: data.role, expiresAt: data.expiresAt });
      if (data.role === "Commercial") window.location.href = "/saisie";
      else window.location.href = "/affectation"; // Support_IT
    } catch (err) {
      setMsg(err?.response?.data?.message ?? "Identifiants invalides");
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "3rem auto", fontFamily: "system-ui", display: "grid", gap: 12 }}>
      <h2>Wafacash – Connexion</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
        <label>Identifiant / Email</label>
        <input value={identifier} onChange={(e) => setId(e.target.value)} required />
        <label>Mot de passe</label>
        <div style={{ display: "flex", gap: 8 }}>
          <input type={show ? "text" : "password"} value={password} onChange={(e) => setPw(e.target.value)} required />
          <button type="button" onClick={() => setShow((s) => !s)}>{show ? "Masquer" : "Afficher"}</button>
        </div>
        <button type="submit">Se connecter</button>
      </form>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
      <p><a href="/register">Créer un compte</a></p>
    </div>
  );
}
