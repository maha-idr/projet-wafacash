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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formData);
    try {
      const response = await fetch("http://localhost:63148/api/demandes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des données");
      }
      alert("Formulaire soumis avec succès!");
      // Réinitialiser le formulaire après soumission réussie
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
      console.error(error);
      alert("Erreur lors de l'envoi des données");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2 className="form-title">Saisie d'une agence</h2>
          
        </div>
        
        <form onSubmit={handleSubmit} className="agency-form">
          
          {/* Region */}
          <div className="form-group">
            <label>Région <span className="required">*</span></label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="form-input"
              required
            >
               <option value="">-- Sélectionnez une région --</option>
              <option value="GRAND CASABLANCA">GRAND CASABLANCA</option>
              <option value="TENSIFT">TENSIFT</option>
              <option value="SOUSS SAHARA">SOUSS SAHARA</option>
              <option value="RABAT AL GHARB">RABAT AL GHARB</option>
              <option value="TADLA">TADLA</option>
              <option value="FES-SAISS">FES-SAISS</option>
              <option value="ORIENTAL">ORIENTAL</option>
              <option value="TANGER LOUKKOS">TANGER LOUKKOS</option>
              <option value="CASA SUD">CASA SUD</option>
              <option value="CASA NORD">CASA NORD</option>
              
            </select>
          </div>

          {/* Type réseau */}
          <div className="form-group">
            <label>Type de réseau <span className="required">*</span></label>
            <select
              name="typeReseau"
              value={formData.typeReseau}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">-- Sélectionnez le type de réseau --</option>
              <option value="3G">3G</option>
              <option value="4G">4G</option>
              <option value="5G">5G</option>
            </select>
          </div>

          {/* Libellé mandataire */}
          <div className="form-group">
            <label>Libellé mandataire <span className="required">*</span></label>
            <input
              type="text"
              name="libelleMandataire"
              placeholder="Entrez le libellé mandataire"
              value={formData.libelleMandataire}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Code */}
          <div className="form-group">
            <label>Code <span className="required">*</span></label>
            <input
              type="text"
              name="code"
              placeholder="Entrez le code"
              value={formData.code}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Nom agence */}
          <div className="form-group">
            <label>Nom de l'agence <span className="required">*</span></label>
            <input
              type="text"
              name="nomAgence"
              placeholder="Entrez le nom de l'agence"
              value={formData.nomAgence}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Téléphone contact */}
          <div className="form-group">
            <label>Téléphone de contact <span className="required">*</span></label>
            <input
              type="tel"
              name="telephoneContact"
              placeholder="Entrez le numéro de téléphone"
              value={formData.telephoneContact}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          {/* Ville */}
          <div className="form-group">
            <label>Ville <span className="required">*</span></label>
            <select
              name="ville"
              value={formData.ville}
              onChange={handleChange}
              className="form-input"
              required
            >
              
               <option value="">-- Sélectionnez une ville --</option>
              <option value="CASABLANCA">CASABLANCA</option>
              <option value="AGADIR">AGADIR</option>
              <option value="OULED AYAD">OULED AYAD</option>
              <option value="OULED YAICH">OULED YAICH</option>
              <option value="OULED YOUSSEF">OULED YOUSSEF</option>
              <option value="OULED MBAREK">OULED MBAREK</option>
              <option value="TANTAN">TANTAN</option>
              <option value="TLAT LOULAD">TLAT LOULAD</option>
              <option value="TAROUDANT">TAROUDANT</option>
              <option value="AL HOCEIMA">AL HOCEIMA</option>
              <option value="BENI MELLAL">BENI MELLAL</option>
              <option value="SOUK SEBT">SOUK SEBT</option>
              <option value="FQUIH BEN SALAH">FQUIH BEN SALAH</option>
              <option value="BEN SLIMANE">BEN SLIMANE</option>
              <option value="BOUJNIBA">BOUJNIBA</option>
              <option value="EL JADIDA">EL JADIDA</option>
              <option value="EL AIOUNE">EL AIOUNE</option>
              <option value="HAD BRADIA">HAD BRADIA</option>
              <option value="TAZARINE">TAZARINE</option>
              <option value="ERRACHIDIA">ERRACHIDIA</option>
              <option value="ZAOUIAT ECHIKH">ZAOUIAT ECHIKH</option>
              <option value="ERFOUD">ERFOUD</option>
              <option value="ESSAOUIRA">ESSAOUIRA</option>
              <option value="FES">FES</option>
              <option value="ZAGORA">ZAGORA</option>
              <option value="JERADA">JERADA</option>
              <option value="BOUARFA">BOUARFA</option>
              <option value="SIDI YAHIA ZAER">SIDI YAHIA ZAER</option>
              <option value="KENITRA">KENITRA</option>
              <option value="SIDI KACEM">SIDI KACEM</option>
              <option value="SIDI SLIMANE">SIDI SLIMANE</option>
              <option value="KHENIFRA">KHENIFRA</option>
              <option value="KHOURIBGA">KHOURIBGA</option>
              <option value="MARRAKECH">MARRAKECH</option>
              <option value="MEKNES">MEKNES</option>
              <option value="NADOR">NADOR</option>
              <option value="MIDAR">MIDAR</option>
              <option value="OUARZAZATE">OUARZAZATE</option>
              <option value="SIDI ALLAL BAHRAOUI">SIDI ALLAL BAHRAOUI</option>
              <option value="OUJDA">OUJDA</option>
              <option value="BERKANE">BERKANE</option>
              <option value="GUERCIF">GUERCIF</option>
              <option value="TAOURIRT">TAOURIRT</option>
              <option value="SAFI">SAFI</option>
              <option value="YOUSSOUFIA">YOUSSOUFIA</option>
              <option value="SETTAT">SETTAT</option>
              <option value="TANGER">TANGER</option>
              <option value="LARACHE">LARACHE</option>
              <option value="TAOUNATE">TAOUNATE</option>
              <option value="TAZA">TAZA</option>
              <option value="TETOUAN">TETOUAN</option>
              <option value="BERRECHID">BERRECHID</option>
              <option value="MOHAMMEDIA">MOHAMMEDIA</option>
              <option value="RABAT">RABAT</option>
              <option value="SALE">SALE</option>
              <option value="SIDI HAJJAJ">SIDI HAJJAJ</option>
              <option value="GUELMIM">GUELMIM</option>
              <option value="MONT ARRUIT">MONT ARRUIT</option>
              <option value="DRIOUCH">DRIOUCH</option>
              <option value="KELAAT MGOUNA">KELAAT MGOUNA</option>
              <option value="BEN TAYEB">BEN TAYEB</option>
              <option value="ZAIO">ZAIO</option>
              <option value="IMZOURAN">IMZOURAN</option>
              <option value="INZEGANE">INZEGANE</option>
              <option value="BENI BOUAYACHE">BENI BOUAYACHE</option>
              <option value="TARGUIST">TARGUIST</option>
              <option value="AZILAL">AZILAL</option>
              <option value="DEMNATE">DEMNATE</option>
              <option value="KSIBA">KSIBA</option>
              <option value="KASBAT TADLA">KASBAT TADLA</option>
              <option value="BOUZNIKA">BOUZNIKA</option>
              <option value="AZEMMOUR">AZEMMOUR</option>
              <option value="KELAAT SRAGHNA">KELAAT SRAGHNA</option>
              <option value="TINEJDAD">TINEJDAD</option>
              <option value="SEFROU">SEFROU</option>
              <option value="KHEMISSET">KHEMISSET</option>
              <option value="TIFLET">TIFLET</option>
              <option value="BOUJAAD">BOUJAAD</option>
              <option value="OUED ZEM">OUED ZEM</option>
              <option value="BOUDINAR">BOUDINAR</option>
              <option value="DAKHLA">DAKHLA</option>
              <option value="TINGHIR">TINGHIR</option>
              <option value="BEN AHMED">BEN AHMED</option>
              <option value="EL BROUJ">EL BROUJ</option>
              <option value="ASSILAH">ASSILAH</option>
              <option value="OULED AMLIL">OULED AMLIL</option>
              <option value="KSAR EL KEBIR">KSAR EL KEBIR</option>
              <option value="TIZNIT">TIZNIT</option>
              <option value="AL ATTAWIA">AL ATTAWIA</option>
              <option value="SKHIRAT">SKHIRAT</option>
              <option value="TEMARA">TEMARA</option>
              <option value="KASSITA">KASSITA</option>
              <option value="CROUNA">CROUNA</option>
              <option value="LAAYOUNE">LAAYOUNE</option>
              <option value="AIT MELLOUL">AIT MELLOUL</option>
              <option value="OULED ZIDOUH">OULED ZIDOUH</option>
              <option value="FNIDEQ">FNIDEQ</option>
              <option value="AIN TAOUJDATE">AIN TAOUJDATE</option>
              <option value="AIN BENI MATHAR">AIN BENI MATHAR</option>
              <option value="OULED TEIMA">OULED TEIMA</option>
              <option value="CHEMAIA">CHEMAIA</option>
              <option value="BOUJDOUR">BOUJDOUR</option>
              <option value="OULED SAID">OULED SAID</option>
              <option value="OULAD BERHIL">OULAD BERHIL</option>
              <option value="BIOUGRA">BIOUGRA</option>
              <option value="AFOURAR">AFOURAR</option>
              <option value="IMINTANOUTE">IMINTANOUTE</option>
              <option value="BOUMALEN DADES">BOUMALEN DADES</option>
              <option value="MIDELT">MIDELT</option>
              <option value="SIDI BENNOUR">SIDI BENNOUR</option>
              <option value="EL HAJEB">EL HAJEB</option>
              <option value="SIDI YAHIA EL GHARB">SIDI YAHIA EL GHARB</option>
              <option value="KHEMISS ZMAMRA">KHEMISS ZMAMRA</option>
              <option value="BENI ANSAR">BENI ANSAR</option>
              <option value="SIDI IFNI">SIDI IFNI</option>
              <option value="AOULOUZ">AOULOUZ</option>
              <option value="ALNIF">ALNIF</option>
              <option value="TAFRAOUT">TAFRAOUT</option>
              <option value="AGDEZ">AGDEZ</option>
              <option value="AGHBALOU">AGHBALOU</option>
              <option value="AGOURAI">AGOURAI</option>
              <option value="AGUELMOUS">AGUELMOUS</option>
              <option value="AHFIR">AHFIR</option>
              <option value="AIN CHEGGAG">AIN CHEGGAG</option>
              <option value="AIN EL AOUDA">AIN EL AOUDA</option>
              <option value="AIN HARROUDA">AIN HARROUDA</option>
              <option value="AIN LEUH">AIN LEUH</option>
              <option value="AIN MEDIOUNA">AIN MEDIOUNA</option>
              <option value="AIN ZORA">AIN ZORA</option>
              <option value="AIT AATAB">AIT AATAB</option>
              <option value="AIT BAHA">AIT BAHA</option>
              <option value="AIT DAOUD">AIT DAOUD</option>
              <option value="AIT ISHAK">AIT ISHAK</option>
              <option value="AIT OURIR">AIT OURIR</option>
              <option value="AJDIR">AJDIR</option>
              <option value="AKLIM">AKLIM</option>
              <option value="AKNOUL">AKNOUL</option>
              <option value="AL AAOUAMRA">AL AAOUAMRA</option>
              <option value="AL JDIRIYA">AL JDIRIYA</option>
              <option value="AMELLAGO">AMELLAGO</option>
              <option value="AMIZMIZ">AMIZMIZ</option>
              <option value="ANJRA">ANJRA</option>
              <option value="AOUFOUSS">AOUFOUSS</option>
              <option value="AOURIR">AOURIR</option>
              <option value="ARBAOUA">ARBAOUA</option>
              <option value="ASSA">ASSA</option>
              <option value="ASSIFANE">ASSIFANE</option>
              <option value="ASSOUL">ASSOUL</option>
              <option value="AZROU">AZROU</option>
              <option value="BAB BERRED">BAB BERRED</option>
              <option value="BAB TAZA">BAB TAZA</option>
              <option value="BEN GUERIR">BEN GUERIR</option>
              <option value="BENI CHIKER">BENI CHIKER</option>
              <option value="BENI HLAL">BENI HLAL</option>
              <option value="BENI YAZRHA">BENI YAZRHA</option>
              <option value="BHALIL">BHALIL</option>
              <option value="BIR JDID">BIR JDID</option>
              <option value="BNI DRAR">BNI DRAR</option>
              <option value="BNI GARFETT">BNI GARFETT</option>
              <option value="BNI YAKHLAF">BNI YAKHLAF</option>
              <option value="BOU MAIZ">BOU MAIZ</option>
              <option value="BOUAROUSS">BOUAROUSS</option>
              <option value="BOUDNIB">BOUDNIB</option>
              <option value="BOUFEKRANE">BOUFEKRANE</option>
              <option value="BOUIZAKARNE">BOUIZAKARNE</option>
              <option value="BOUKRAA">BOUKRAA</option>
              <option value="BOULEMANE">BOULEMANE</option>
              <option value="BOUMIA">BOUMIA</option>
              <option value="BOURED">BOURED</option>
              <option value="BOUSKOURA">BOUSKOURA</option>
              <option value="BRADIA">BRADIA</option>
              <option value="BZOU">BZOU</option>
              <option value="CHEFCHAOUEN">CHEFCHAOUEN</option>
              <option value="CHICHAOUA">CHICHAOUA</option>
              <option value="CHTOUKA">CHTOUKA</option>
              <option value="DAR BOUAZZA">DAR BOUAZZA</option>
              <option value="DAR EL KABDANI">DAR EL KABDANI</option>
              <option value="DAR KEBDANI">DAR KEBDANI</option>
              <option value="DARWA">DARWA</option>
              <option value="DCHIRA">DCHIRA</option>
              <option value="DEBDOU">DEBDOU</option>
              <option value="EL AOUNATE">EL AOUNATE</option>
              <option value="EL AYOUN (P.OUJDA)">EL AYOUN (P.OUJDA)</option>
              <option value="EL GARA">EL GARA</option>
              <option value="EL KEBAB">EL KEBAB</option>
              <option value="FAHS">FAHS</option>
              <option value="FAM EL HISSN">FAM EL HISSN</option>
              <option value="FARKHANA">FARKHANA</option>
              <option value="FIGUIG">FIGUIG</option>
              <option value="FOUM ZGUID">FOUM ZGUID</option>
              <option value="MEJJAT">MEJJAT</option>
              <option value="GOULMIMA">GOULMIMA</option>
              <option value="GOURRAMA">GOURRAMA</option>
              <option value="HAD AIT BELFAA">HAD AIT BELFAA</option>
              <option value="HAD KOURT">HAD KOURT</option>
              <option value="HAD OULAD FENNANE">HAD OULAD FENNANE</option>
              <option value="HAD SOUALEM">HAD SOUALEM</option>
              <option value="HARHOURA">HARHOURA</option>
              <option value="HATTANE">HATTANE</option>
              <option value="HOUAFAT">HOUAFAT</option>
              <option value="IAAZZANENE">IAAZZANENE</option>
              <option value="IFRANE">IFRANE</option>
              <option value="IMILCHIL">IMILCHIL</option>
              <option value="IMMOUZZER MARMOUCHA">IMMOUZZER MARMOUCHA</option>
              <option value="IMOUZZER KANDAR">IMOUZZER KANDAR</option>
              <option value="IRHERM">IRHERM</option>
              <option value="IRKLAOUEN TIMAHDITE">IRKLAOUEN TIMAHDITE</option>
              <option value="ITZER">ITZER</option>
              <option value="JEBHA">JEBHA</option>
              <option value="JEMAA SHAIM">JEMAA SHAIM</option>
              <option value="JORF">JORF</option>
              <option value="JORF EL MELHA">JORF EL MELHA</option>
              <option value="KAF NSOUR">KAF NSOUR</option>
              <option value="KAHF EL RHAR">KAHF EL RHAR</option>
              <option value="KARIAT AREKMANE">KARIAT AREKMANE</option>
              <option value="KARIAT BA MOHAMED">KARIAT BA MOHAMED</option>
              <option value="IKAOUNE">IKAOUNE</option>
              <option value="KHEMIS ATTAOUIA">KHEMIS ATTAOUIA</option>
              <option value="KHEMIS D ISSAFEN">KHEMIS D ISSAFEN</option>
              <option value="KHEMIS IDDA OU GNIDI">KHEMIS IDDA OU GNIDI</option>
              <option value="KHEMIS SAHEL">KHEMIS SAHEL</option>
              <option value="KHNICHET">KHNICHET</option>
              <option value="KSABI">KSABI</option>
              <option value="KSIBIA DAR BEL AMRI">KSIBIA DAR BEL AMRI</option>
              <option value="LAKHSASS">LAKHSASS</option>
              <option value="LALLA MIMOUNA">LALLA MIMOUNA</option>
              <option value="TEMSIA">TEMSIA</option>
              <option value="MDIQ">MDIQ</option>
              <option value="M RIRT">M RIRT</option>
              <option value="MAAZIZ">MAAZIZ</option>
              <option value="MARTIL">MARTIL</option>
              <option value="MASSA">MASSA</option>
              <option value="MDAKRA">MDAKRA</option>
              <option value="MECHRA BEL KSIRI">MECHRA BEL KSIRI</option>
              <option value="MEDIOUNA">MEDIOUNA</option>
              <option value="MEKNASSA">MEKNASSA</option>
              <option value="MESFIOUA">MESFIOUA</option>
              <option value="MIRLEFT">MIRLEFT</option>
              <option value="MISSOUR">MISSOUR</option>
              <option value="MOULAY BOUAZZA">MOULAY BOUAZZA</option>
              <option value="MOULAY DRISS ZERHOUN">MOULAY DRISS ZERHOUN</option>
              <option value="MOULAY YACOUB">MOULAY YACOUB</option>
              <option value="MSAGHRA AIT YADINE">MSAGHRA AIT YADINE</option>
              <option value="MSEMRIR">MSEMRIR</option>
              <option value="NOUACEUR">NOUACEUR</option>
              <option value="OUALIDIYA">OUALIDIYA</option>
              <option value="OUAOUIZARHT">OUAOUIZARHT</option>
              <option value="OUAZZANE">OUAZZANE</option>
              <option value="OUDAYA">OUDAYA</option>
              <option value="OULAD AAMRANE">OULAD AAMRANE</option>
              <option value="OULAD ABBOU">OULAD ABBOU</option>
              <option value="OULAD BEN DAOUD">OULAD BEN DAOUD</option>
              <option value="OULAD FREJ">OULAD FREJ</option>
              <option value="OULAD HSINE">OULAD HSINE</option>
              <option value="OULAD M BAREK">OULAD M BAREK</option>
              <option value="OULAD SALAH">OULAD SALAH</option>
              <option value="OULAD YAICHE">OULAD YAICHE</option>
              <option value="OULMES">OULMES</option>
              <option value="OURIKA">OURIKA</option>
              <option value="OUTAT EL HAJ">OUTAT EL HAJ</option>
              <option value="RAS EL MA">RAS EL MA</option>
              <option value="RHAFSAI">RHAFSAI</option>
              <option value="RHIATE">RHIATE</option>
              <option value="RIBAT EL KHEIR">RIBAT EL KHEIR</option>
              <option value="RICH">RICH</option>
              <option value="RISSANI">RISSANI</option>
              <option value="ROUMANI">ROUMANI</option>
              <option value="SAIDIA">SAIDIA</option>
              <option value="SAKA">SAKA</option>
              <option value="SEBAA AYOUN">SEBAA AYOUN</option>
              <option value="SEBT GUERDANE">SEBT GUERDANE</option>
              <option value="SEBT GZOULA">SEBT GZOULA</option>
              <option value="ZEGHANGHANE">ZEGHANGHANE</option>
              <option value="SELOUANE">SELOUANE</option>
              <option value="SEMGUET">SEMGUET</option>
              <option value="SIDI ALLAL BAHRAOUI">SIDI ALLAL BAHRAOUI</option>
              <option value="SIDI ALLAL TAZI">SIDI ALLAL TAZI</option>
              <option value="SIDI BOU OTHMANE">SIDI BOU OTHMANE</option>
              <option value="SIDI BOUAFIF">SIDI BOUAFIF</option>
              <option value="SIDI BOUBKER EL HAJ">SIDI BOUBKER EL HAJ</option>
              <option value="SIDI BOUSBER">SIDI BOUSBER</option>
              <option value="SIDI EL AIDI">SIDI EL AIDI</option>
              <option value="SIDI HAJJAJ">SIDI HAJJAJ</option>
              <option value="SIDI ISMAEL">SIDI ISMAEL</option>
              <option value="SIDI MOHAMED AHMAR">SIDI MOHAMED AHMAR</option>
              <option value="SIDI MOKHTAR">SIDI MOKHTAR</option>
              <option value="SIDI RAHHAL">SIDI RAHHAL</option>
              <option value="SIDI REDOUANE">SIDI REDOUANE</option>
              <option value="SKOURA">SKOURA</option>
              <option value="SMARA">SMARA</option>
              <option value="SMIMOU">SMIMOU</option>
              <option value="SOUK EL ARBA DUGHARB">SOUK EL ARBA DUGHARB</option>
              <option value="TAFARSIT">TAFARSIT</option>
              <option value="TAFORHALT">TAFORHALT</option>
              <option value="TAGOUNITE">TAGOUNITE</option>
              <option value="TAHANNAOUTE">TAHANNAOUTE</option>
              <option value="TAHAR SOUK">TAHAR SOUK</option>
              <option value="TAHLA">TAHLA</option>
              <option value="TALIOUINE">TALIOUINE</option>
              <option value="TALMEST">TALMEST</option>
              <option value="TALSINNT">TALSINNT</option>
              <option value="TAMANAR">TAMANAR</option>
              <option value="TAMANSOURT">TAMANSOURT</option>
              <option value="TAMELLALT">TAMELLALT</option>
              <option value="TAMESLOUHT AIT IMOUR">TAMESLOUHT AIT IMOUR</option>
              <option value="TAMESNA">TAMESNA</option>
              <option value="TAMRI">TAMRI</option>
              <option value="TAMSAMANE / NADOR">TAMSAMANE / NADOR</option>
              <option value="TAN TAN PLAGE">TAN TAN PLAGE</option>
              <option value="TANANNT">TANANNT</option>
              <option value="TARFAYA">TARFAYA</option>
              <option value="TATA">TATA</option>
              <option value="TAZNAKHT">TAZNAKHT</option>
              <option value="TAZZARINE">TAZZARINE</option>
              <option value="TENDRAR">TENDRAR</option>
              <option value="TISSA">TISSA</option>
              <option value="TIT MELLIL">TIT MELLIL</option>
              <option value="TIZGUITE">TIZGUITE</option>
              <option value="TLAT AZLAF">TLAT AZLAF</option>
              <option value="TLATA HANCHANE">TLATA HANCHANE</option>
              <option value="TNIN SIDI LYAMANI">TNIN SIDI LYAMANI</option>
              <option value="TNINE EL GHARBIA">TNINE EL GHARBIA</option>
              <option value="TOUNFITE">TOUNFITE</option>
              <option value="ZAGGOUTA HAD TEKNA">ZAGGOUTA HAD TEKNA</option>
              <option value="ZHILIGA">ZHILIGA</option>
              <option value="ZOUMI">ZOUMI</option>
              <option value="SMARA">SMARA</option>
              <option value="BOUKNADEL">BOUKNADEL</option>
              <option value="AIN DORRIJ">AIN DORRIJ</option>
              <option value="SIDI BIBI">SIDI BIBI</option>
              <option value="DRARGUA">DRARGUA</option>
              <option value="HADDADA">HADDADA</option>
              <option value="HASSI BERKANE">HASSI BERKANE</option>
              <option value="JBEL LAHBIB">JBEL LAHBIB</option>
              <option value="LQLIAA">LQLIAA</option>
              <option value="SIDI BOUZID">SIDI BOUZID</option>
              <option value="ZAIDA">ZAIDA</option>
              <option value="AIT IAZZA">AIT IAZZA</option>
              <option value="RAS TABOUDA">RAS TABOUDA</option>
              <option value="AIT AMIRA">AIT AMIRA</option>
              <option value="AIN DORIJ">AIN DORIJ</option>
              <option value="OULED ZMAM">OULED ZMAM</option>
              <option value="AIN ATTIG">AIN ATTIG</option>
              <option value="LARBAA DE BOUTAYEB">LARBAA DE BOUTAYEB</option>
              <option value="CASA NORD">CASA NORD</option>
              <option value="CASA SUD">CASA SUD</option>
              <option value="ZAIDA">ZAIDA</option>
            </select>
          </div>

          {/* Adresse de livraison */}
          <div className="form-group">
            <label>Adresse de livraison <span className="required">*</span></label>
            <textarea
              name="adresseLivraison"
              placeholder="Entrez l'adresse de livraison complète"
              value={formData.adresseLivraison}
              onChange={handleChange}
              rows={4}
              className="form-input"
              required
            />
          </div>

          {/* Envoi modem (radio) */}
          <div className="form-group">
            <label>Envoi modem : <span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="envoiModem"
                  value="oui"
                  checked={formData.envoiModem === "oui"}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Oui
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="envoiModem"
                  value="non"
                  checked={formData.envoiModem === "non"}
                  onChange={handleChange}
                />
                <span className="radio-custom"></span>
                Non
              </label>
            </div>
          </div>

          {/* Modem */}
          {formData.envoiModem === "oui" && (
            <div className="form-group">
              <label>Numéro modem (alphanumérique) <span className="required">*</span></label>
              <input
                type="text"
                name="modem"
                placeholder="Entrez le numéro de modem"
                value={formData.modem}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
          >
            Enregistrer
          </button>
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