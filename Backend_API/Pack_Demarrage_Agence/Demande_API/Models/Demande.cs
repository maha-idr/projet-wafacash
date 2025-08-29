using System.ComponentModel.DataAnnotations;

namespace WorkflowApp.Models
{
    public class Demande
    {
        [Key]
        public int Id { get; set; }
        public string Region { get; set; } = string.Empty;
        public string TypeReseau { get; set; } = string.Empty;
        public string LibelleMandataire { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string NomAgence { get; set; } = string.Empty;
        public string TelephoneContact { get; set; } = string.Empty;
        public string Ville { get; set; } = string.Empty;
        public string AdresseLivraison { get; set; } = string.Empty;
        public bool EnvoisModem { get; set; }
        public string Modem { get; set; } = string.Empty;
        public int Statut { get; set; } = 0;
        public DateTime DateSaisie { get; set; } = DateTime.UtcNow;

        // Champs pour support_IT
        public string? Lot { get; set; }
        public string? Sqc { get; set; }
        public string? IMEI { get; set; }
        public string? CodeBarre { get; set; }
        public string? NumeroLigne { get; set; }
        public string? Societe { get; set; }
        public DateTime? DateAffectation { get; set; }
        public string? OperateurTelecom { get; set; }
        public string? NouvelleBox { get; set; }
        public DateTime? DateReaffectation { get; set; }
        public string? NouveauIMEI { get; set; }
        public string? NouveauNumeroLigne { get; set; }
        public bool? EnvoiFactu { get; set; }
        public DateTime? DateDemandeFactu { get; set; }
    }
}
