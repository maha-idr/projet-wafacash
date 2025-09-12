namespace Demande_API.DTOs
{
    public class DemandeUpdateDto
    {
        public object DateSaisie { get; internal set; }

        public int Id { get; set; }
        public string Region { get; set; }
        public string TypeReseau { get; set; }
        public string LibelleMandataire { get; set; }
        public string Code { get; set; }
        public string NomAgence { get; set; }
        public string TelephoneContact { get; set; }
        public string Ville { get; set; }
        public string AdresseLivraison { get; set; }
        public bool EnvoisModem { get; set; }
        public string Modem { get; set; }
        public int Statut { get; set; }
        public string Lot { get; set; } = string.Empty;
        public string Sqc { get; set; } = string.Empty;
        public string IMEI { get; set; } = string.Empty;
        public string CodeBarre { get; set; } = string.Empty;
        public string NumeroLigne { get; set; } = string.Empty;
        public string Societe { get; set; } = string.Empty;
        public DateTime? DateAffectation { get; set; }
        public string OperateurTelecom { get; set; } = string.Empty;
        public string NouvelleBox { get; set; } = string.Empty;
        public DateTime? DateReaffectation { get; set; }
        public string NouveauIMEI { get; set; } = string.Empty;
        public string NouveauNumeroLigne { get; set; } = string.Empty;
        public bool? EnvoiFactu { get; set; }
        public DateTime? DateDemandeFactu { get; set; }
    }
}
