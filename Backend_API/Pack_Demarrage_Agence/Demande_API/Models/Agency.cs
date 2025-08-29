// Models/Agency.cs
using System.ComponentModel.DataAnnotations;

public class Agency
{
    public int Id { get; set; }

    [Required]
    public string Region { get; set; }

    [Required]
    public string TypeReseau { get; set; }

    [Required]
    public string LibelleMandataire { get; set; }

    [Required]
    public string Code { get; set; }

    [Required]
    public string NomAgence { get; set; }

    [Required]
    public string TelephoneContact { get; set; }

    [Required]
    public string Ville { get; set; }

    [Required]
    public string AdresseLivraison { get; set; }

    [Required]
    public bool EnvoiModem { get; set; }

    public string Modem { get; set; }
}
