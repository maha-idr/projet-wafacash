namespace Demande_API.DTOs
{
    public class DemandeUpdateDto
    {
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
        public int Statut { get; set; } = 1; // Affectée
    }
}
