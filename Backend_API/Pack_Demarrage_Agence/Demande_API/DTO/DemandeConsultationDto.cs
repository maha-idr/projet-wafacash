// DTOs/DemandeConsultationDto.cs
public class DemandeConsultationDto
{
    public int Id { get; set; }
    public string LibelleMandataire { get; set; }
    public string Region { get; set; }
    public string TypeReseau { get; set; }
    public string Code { get; set; }
    public string NomAgence { get; set; }
    public string TelephoneContact { get; set; }
    public string Ville { get; set; }
    public string AdresseLivraison { get; set; }
    public bool EnvoisModem { get; set; }
    public string Modem { get; set; }
    public int Statut { get; set; }
    public string StatutLibelle => Statut == 0 ? "En attente d'affectation" : "Affectée";
    public DateTime DateSaisie { get; set; }
}

// DTOs/ConsultationFilterDto.cs
public class ConsultationFilterDto
{
    public DateTime? DateDebut { get; set; }
    public DateTime? DateFin { get; set; }
    public int? Statut { get; set; } // null: tous, 0: en attente, 1: affectée
}