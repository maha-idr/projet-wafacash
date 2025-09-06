// src/pages/Affectation.jsx
import { useEffect, useState } from "react";
import { apidemande } from "../api/client";
import { authHeader } from "../auth/useAuth";
import AffectationModal from "../ui/AffectationModal";
import { useNavigate, useLocation } from "react-router-dom";

export default function Affectation() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState(null);
  const [editing, setEditing] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const response = await apidemande.get("/api/Demande/pending", {
        headers: authHeader(),
      });
      setRows(response.data || []);
    } catch (e) {
      setErr(e.response?.data?.message || "Impossible de charger les demandes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setUserRole(role);
    load();

    // Reset global pour enlever marges du body et tout débordement horizontal
    const reset = document.createElement("style");
    reset.innerHTML = `
      html, body { width:100%; max-width:100%; overflow-x:hidden; }
      body { margin:0; padding:0; background:#f6f9fc; }
      *, *::before, *::after { box-sizing:border-box; }
      @keyframes spin { 0%{transform:rotate(0)} 100%{transform:rotate(360deg)} }
    `;
    document.head.appendChild(reset);
    return () => reset.remove();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      {/* NAV pleine largeur (full-bleed jusqu'aux bords) */}
      <nav style={styles.navbar}>
        <div style={styles.navInner}>
          <div style={styles.navBrand}>Workflow App</div>
          <ul style={styles.navList}>
            {userRole === "Commercial" && (
              <li>
                <button
                  onClick={() => navigate("/saisie")}
                  style={{
                    ...styles.navLink,
                    ...(location.pathname === "/saisie" ? styles.activeNavLink : {}),
                  }}
                >
                  Consultation
                </button>
              </li>
            )}

            {userRole === "Support_IT" && (
              <li>
                <button
                  onClick={() => navigate("/affectation")}
                  style={{
                    ...styles.navLink,
                    ...(location.pathname === "/affectation" ? styles.activeNavLink : {}),
                  }}
                >
                  Consultation
                </button>
              </li>
            )}

            <li>
              <button
                onClick={() => navigate("/consultation")}
                style={{
                  ...styles.navLink,
                  ...(location.pathname === "/consultation" ? styles.activeNavLink : {}),
                }}
              >
                Consultation
              </button>
            </li>

            <li>
              <button onClick={handleLogout} style={styles.logoutButton}>
                Déconnexion
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* CONTENU CENTRÉ (titre + bouton + tableau) */}
      <main style={styles.centerWrap}>
        <div style={styles.headerBar}>
          <h2 style={styles.title}>Affectation (Support_IT)</h2>
          <button onClick={load} style={styles.refreshButton}>
            Actualiser
          </button>
        </div>

        {err && <p style={styles.error}>{err}</p>}

        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner} />
            <p>Chargement…</p>
          </div>
        ) : rows.length === 0 ? (
          <div style={styles.emptyState}>
            <p>Aucune demande en attente.</p>
          </div>
        ) : (
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>#</th>
                  <th style={styles.th}>Agence</th>
                  <th style={styles.th}>Ville</th>
                  <th style={styles.th}>Code</th>
                  <th style={styles.th}>Téléphone</th>
                  <th style={styles.th}>Statut</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.id} style={styles.tr}>
                    <td style={styles.td}>{d.id}</td>
                    <td style={styles.td}>{d.nomAgence}</td>
                    <td style={styles.td}>{d.ville}</td>
                    <td style={styles.td}>{d.code}</td>
                    <td style={styles.td}>{d.telephoneContact}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.status,
                          ...(d.statut === "En attente" ? styles.statusPending : {}),
                          ...(d.statut === "Traité" ? styles.statusCompleted : {}),
                          ...(d.statut === "En cours" ? styles.statusProgress : {}),
                        }}
                      >
                        {d.statut || "En attente"}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button onClick={() => setEditing(d)} style={styles.editButton}>
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editing && (
          <AffectationModal
            demande={editing}
            onClose={() => setEditing(null)}
            onSaved={() => {
              setEditing(null);
              load();
            }}
          />
        )}
      </main>
    </div>
  );
}

/* ===== Styles ===== */
const MAX = 1100;

const styles = {
  page: { minHeight: "100vh", width: "100%" },

  // NAV full-bleed: prend toute la largeur d'écran, même si parent centré
  navbar: {
    backgroundColor: "#2c3e50",
    color: "white",
    position: "sticky",
    top: 0,
    zIndex: 10,
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  // Contenu du menu centré mais SANS padding latéral -> “jusqu’au bord”
  navInner: {
    maxWidth: MAX,
    margin: "0 auto",
    padding: "12px 0", // pas de padding gauche/droite
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  navBrand: { fontWeight: 700, fontSize: 18 },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: 10,
    margin: 0,
    padding: 0,
    alignItems: "center",
  },
  navLink: {
    padding: "8px 14px",
    borderRadius: 8,
    background: "transparent",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
    fontWeight: 500,
  },
  activeNavLink: { background: "#3498db", borderColor: "#3498db" },
  logoutButton: {
    padding: "8px 14px",
    borderRadius: 8,
    background: "#e74c3c",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
  },

  // WRAPPER CENTRÉ pour tout le contenu (titre + bouton + tableau)
  centerWrap: {
    maxWidth: MAX,
    margin: "24px auto 48px",
    padding: "0 16px",
  },

  headerBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    color: "#2c3e50",
    fontWeight: 700,
    fontSize: 26,
  },
  refreshButton: {
    padding: "10px 18px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(52,152,219,0.35)",
  },

  error: {
    color: "#b00020",
    background: "#fdecef",
    border: "1px solid #ffd5db",
    padding: "10px 12px",
    borderRadius: 10,
    margin: "12px 0 16px",
  },

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 40,
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    border: "4px solid #e9eef5",
    borderTop: "4px solid #3498db",
    animation: "spin 1s linear infinite",
    marginBottom: 12,
  },

  emptyState: {
    textAlign: "center",
    background: "white",
    borderRadius: 14,
    padding: "40px 24px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
  },

  tableCard: {
    background: "white",
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    overflow: "hidden",
  },

  table: { width: "100%", borderCollapse: "collapse", tableLayout: "fixed" },
  th: {
    textAlign: "left",
    padding: "14px 16px",
    background: "#34495e",
    color: "white",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  tr: { borderBottom: "1px solid #edf2f7" },
  td: {
    padding: "14px 16px",
    fontSize: 14,
    color: "#2c3e50",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  status: {
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    display: "inline-block",
  },
  statusPending: { background: "#fff1c6", color: "#a66b00" },
  statusCompleted: { background: "#d1f2eb", color: "#1e8e63" },
  statusProgress: { background: "#d6eaf8", color: "#1e6fb9" },

  editButton: {
    padding: "8px 14px",
    background: "#2ecc71",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
};
