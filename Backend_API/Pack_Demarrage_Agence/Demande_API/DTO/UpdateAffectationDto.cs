using System;
using System.ComponentModel.DataAnnotations;

namespace Demande_API.DTO;

public class UpdateAffectationDto
{
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