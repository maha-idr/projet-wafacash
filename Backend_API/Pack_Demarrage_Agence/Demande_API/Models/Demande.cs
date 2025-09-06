using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Demande_API.Models;

[Table("Demande")] // mappe la table que tu as créée en SQL
public class Demande
{
    [Key] public int Id { get; set; }

    [Required, MaxLength(200)] public string Region { get; set; } = default!;
    [Required, MaxLength(200)] public string TypeReseau { get; set; } = default!;
    [Required, MaxLength(200)] public string LibelleMandataire { get; set; } = default!;
    [Required, MaxLength(100)] public string Code { get; set; } = default!;
    [Required, MaxLength(200)] public string NomAgence { get; set; } = default!;
    [Required, MaxLength(50)] public string TelephoneContact { get; set; } = default!;
    [Required, MaxLength(100)] public string Ville { get; set; } = default!;
    [Required, MaxLength(300)] public string AdresseLivraison { get; set; } = default!;
    [Required] public bool EnvoisModem { get; set; }
    [MaxLength(100)] public string? Modem { get; set; }
    [Required] public int Statut { get; set; } = 0; // 0=en attente, 1=affectée
    [Required] public DateTime DateSaisie { get; set; } = DateTime.UtcNow;

    // Champs Support_IT
    [MaxLength(100)] public string? Lot { get; set; }
    [MaxLength(100)] public string? Sqc { get; set; }
    [MaxLength(100)] public string? IMEI { get; set; }
    [MaxLength(100)] public string? CodeBarre { get; set; }
    [MaxLength(50)] public string? NumeroLigne { get; set; }
    [MaxLength(200)] public string? Societe { get; set; }
    public DateTime? DateAffectation { get; set; }
    [MaxLength(100)] public string? OperateurTelecom { get; set; }
    [MaxLength(100)] public string? NouvelleBox { get; set; }
    public DateTime? DateReaffectation { get; set; }
    [MaxLength(100)] public string? NouveauIMEI { get; set; }
    [MaxLength(50)] public string? NouveauNumeroLigne { get; set; }
    public bool? EnvoiFactu { get; set; }
    public DateTime? DateDemandeFactu { get; set; }
}
