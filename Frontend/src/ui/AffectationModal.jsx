import { useEffect, useState } from "react";
import { apidemande } from "../api/client";

import { authHeader } from "../auth/useAuth";

const telecoms = ["Orange", "Maroc Telecom", "Inwi"];
const boxes = ["Box_4G", "Box_Fibre", "Box_ADSL"];

export default function AffectationModal({ demande, onClose, onSaved }) {
  const [data, setData] = useState({
    lot: "", sqc: "", imei: "", codeBarre: "", numeroLigne: "",
    societe: "Wafacash",
    dateAffectation: new Date().toISOString().slice(0,10),
    operateurTelecom: telecoms[0],
    nouvelleBox: boxes[0],
    dateReaffectation: "",
    nouveauIMEI: "", nouveauNumeroLigne: "",
    envoiFactu: false, dateDemandeFactu: ""
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  // Charger la demande complète si besoin (detail)
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const { data: d } = await apidemande.get(`/api/Demande/${demande.id}`, { headers: authHeader() });
        if (ignore) return;
        // pré-remplir si déjà partiellement saisi
        setData(prev => ({
          ...prev,
          lot: d.lot ?? prev.lot,
          sqc: d.sqc ?? prev.sqc,
          imei: d.imei ?? prev.imei,
          codeBarre: d.codeBarre ?? prev.codeBarre,
          numeroLigne: d.numeroLigne ?? prev.numeroLigne,
          societe: d.societe ?? prev.societe,
          dateAffectation: (d.dateAffectation ?? prev.dateAffectation)?.slice?.(0,10) ?? prev.dateAffectation,
          operateurTelecom: d.operateurTelecom ?? prev.operateurTelecom,
          nouvelleBox: d.nouvelleBox ?? prev.nouvelleBox,
          dateReaffectation: d.dateReaffectation?.slice?.(0,10) ?? "",
          nouveauIMEI: d.nouveauIMEI ?? "",
          nouveauNumeroLigne: d.nouveauNumeroLigne ?? "",
          envoiFactu: d.envoiFactu ?? false,
          dateDemandeFactu: d.dateDemandeFactu?.slice?.(0,10) ?? ""
        }));
      } catch { /* pas bloquant */ }
    })();
    return () => { ignore = true; };
  }, [demande.id]);

  const setField = (k, v) => setData(s => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true); setErr(null);
    try {
      const payload = {
        ...data,
        // normaliser dates -> ISO si non vide
        dateAffectation: data.dateAffectation ? new Date(data.dateAffectation).toISOString() : null,
        dateReaffectation: data.dateReaffectation ? new Date(data.dateReaffectation).toISOString() : null,
        dateDemandeFactu: data.dateDemandeFactu ? new Date(data.dateDemandeFactu).toISOString() : null
      };
      await apidemande.put(`/api/Demande/${demande.id}/affectation`, payload, { headers: authHeader() });
      onSaved();
    } catch (e) {
      setErr(e?.response?.data?.message || "Échec de l’enregistrement");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <h3>Affecter la demande #{demande.id}</h3>

        {/* Données commercial (lecture seule) */}
        <fieldset style={fs}>
          <legend>Informations saisies</legend>
          <div style={grid2}>
            <Read label="Agence" value={demande.nomAgence} />
            <Read label="Ville" value={demande.ville} />
            <Read label="Code" value={demande.code} />
            <Read label="Téléphone" value={demande.telephoneContact} />
            <Read label="Adresse" value={demande.adresseLivraison} />
            <Read label="Réseau" value={demande.typeReseau} />
          </div>
        </fieldset>

        {/* Champs Support_IT */}
        <form onSubmit={submit} style={grid2}>
          <Input label="Lot" value={data.lot} onChange={v=>setField("lot", v)} />
          <Input label="Sqc" value={data.sqc} onChange={v=>setField("sqc", v)} />
          <Input label="IMEI" value={data.imei} onChange={v=>setField("imei", v)} />
          <Input label="Code à barre" value={data.codeBarre} onChange={v=>setField("codeBarre", v)} />
          <Input label="Numéro ligne" value={data.numeroLigne} onChange={v=>setField("numeroLigne", v)} />
          <Input label="Société" value={data.societe} onChange={v=>setField("societe", v)} />

          <Input type="date" label="Date d’affectation" value={data.dateAffectation} onChange={v=>setField("dateAffectation", v)} />
          <Select label="Opérateur Télécom" value={data.operateurTelecom} onChange={v=>setField("operateurTelecom", v)} options={telecoms} />
          <Select label="Nouvelle box" value={data.nouvelleBox} onChange={v=>setField("nouvelleBox", v)} options={boxes} />

          <Input type="date" label="Date de réaffectation" value={data.dateReaffectation} onChange={v=>setField("dateReaffectation", v)} />
          <Input label="Nouveau IMEI" value={data.nouveauIMEI} onChange={v=>setField("nouveauIMEI", v)} />
          <Input label="Nouveau numéro ligne" value={data.nouveauNumeroLigne} onChange={v=>setField("nouveauNumeroLigne", v)} />

          <label style={{display:"flex", gap:8, alignItems:"center"}}>
            <input type="checkbox" checked={data.envoiFactu} onChange={e=>setField("envoiFactu", e.target.checked)} />
            Envoi factu
          </label>
          <Input type="date" label="Date demande factu" value={data.dateDemandeFactu} onChange={v=>setField("dateDemandeFactu", v)} />

          {err && <p style={{ color:"crimson", gridColumn:"1/-1" }}>{err}</p>}

          <div style={{ gridColumn:"1/-1", display:"flex", gap:8, justifyContent:"flex-end", marginTop:10 }}>
            <button type="button" onClick={onClose}>Annuler</button>
            <button type="submit" disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Read({ label, value }) {
  return (
    <div style={{display:"grid", gap:4}}>
      <label style={{fontSize:12, color:"#666"}}>{label}</label>
      <div style={{padding:"8px 10px", background:"#fafafa", border:"1px solid #eee", borderRadius:6}}>{value ?? "-"}</div>
    </div>
  );
}

function Input({ label, value, onChange, type="text" }) {
  return (
    <div style={{display:"grid", gap:4}}>
      <label style={{fontSize:12, color:"#666"}}>{label}</label>
      <input type={type} value={value ?? ""} onChange={e=>onChange(e.target.value)}
             style={{padding:"8px 10px", border:"1px solid #ddd", borderRadius:6}}/>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div style={{display:"grid", gap:4}}>
      <label style={{fontSize:12, color:"#666"}}>{label}</label>
      <select value={value} onChange={e=>onChange(e.target.value)}
              style={{padding:"8px 10px", border:"1px solid #ddd", borderRadius:6}}>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

const overlay = { position:"fixed", inset:0, background:"rgba(0,0,0,.25)", display:"grid", placeItems:"center", zIndex:1000 };
const modal = { background:"#fff", borderRadius:12, padding:20, width:"min(900px, 96vw)", maxHeight:"90vh", overflow:"auto", boxShadow:"0 10px 30px rgba(0,0,0,.15)" };
const fs = { border:"1px solid #eee", borderRadius:10, padding:12, marginBottom:12 };
const grid2 = { display:"grid", gridTemplateColumns:"repeat(2, minmax(0,1fr))", gap:12 };
