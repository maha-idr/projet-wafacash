using System;

namespace Demande_API.DTO;

public class DemandeReadDto
{
    public int Id { get; set; }
    public string Region { get; set; } = default!;
    public string TypeReseau { get; set; } = default!;
    public string LibelleMandataire { get; set; } = default!;
    public string Code { get; set; } = default!;
    public string NomAgence { get; set; } = default!;
    public string TelephoneContact { get; set; } = default!;
    public string Ville { get; set; } = default!;
    public string AdresseLivraison { get; set; } = default!;
    public bool EnvoisModem { get; set; }
    public string? Modem { get; set; }
    public int Statut { get; set; }
    public DateTime DateSaisie { get; set; }

    // champs support
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
