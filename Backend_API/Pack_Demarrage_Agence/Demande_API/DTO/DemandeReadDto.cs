namespace Demande_API.DTO
{
    public class DemandeReadDto
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
    }
}