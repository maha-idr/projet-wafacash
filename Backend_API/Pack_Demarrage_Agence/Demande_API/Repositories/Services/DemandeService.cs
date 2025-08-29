using Demande_API.Data;
using Demande_API.DTO;
using Demande_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using WorkflowApp.DTOs;
using WorkflowApp.Models;

namespace Demande_API.Services
{
    public class DemandeService : IDemandeService
    {
        private readonly WafacashDbContext _context;

        public DemandeService(WafacashDbContext context)
        {
            _context = context;
        }

        public Demande CreateDemande(DemandeCreateDto dto)
        {
            var demande = new Demande
            {
                Region = dto.Region,
                TypeReseau = dto.TypeReseau,
                LibelleMandataire = dto.LibelleMandataire,
                Code = dto.Code,
                NomAgence = dto.NomAgence,
                TelephoneContact = dto.TelephoneContact,
                Ville = dto.Ville,
                AdresseLivraison = dto.AdresseLivraison,
                EnvoisModem = dto.EnvoisModem,
                Modem = dto.Modem,
                Statut = 0,
                DateSaisie = DateTime.UtcNow
            };

            _context.Demande.Add(demande);
            _context.SaveChanges();
            return demande;
        }

        public List<DemandeReadDto> GetAllDemandes()
        {
            return _context.Demande.Select(d => new DemandeReadDto
            {
                Id = d.Id,
                Region = d.Region,
                TypeReseau = d.TypeReseau,
                LibelleMandataire = d.LibelleMandataire,
                Code = d.Code,
                NomAgence = d.NomAgence,
                TelephoneContact = d.TelephoneContact,
                Ville = d.Ville,
                AdresseLivraison = d.AdresseLivraison,
                EnvoisModem = d.EnvoisModem,
                Modem = d.Modem,
                Statut = d.Statut,
                DateSaisie = d.DateSaisie
            }).ToList();
        }

        public DemandeReadDto? GetDemandeById(int id)
        {
            var d = _context.Demande.FirstOrDefault(x => x.Id == id);
            if (d == null) return null;

            return new DemandeReadDto
            {
                Id = d.Id,
                Region = d.Region,
                TypeReseau = d.TypeReseau,
                LibelleMandataire = d.LibelleMandataire,
                Code = d.Code,
                NomAgence = d.NomAgence,
                TelephoneContact = d.TelephoneContact,
                Ville = d.Ville,
                AdresseLivraison = d.AdresseLivraison,
                EnvoisModem = d.EnvoisModem,
                Modem = d.Modem,
                Statut = d.Statut,
                DateSaisie = d.DateSaisie
            };
        }

        public bool UpdateDemande(int id, DemandeUpdateDto dto)
        {
            var d = _context.Demande.FirstOrDefault(x => x.Id == id);
            if (d == null) return false;

            d.Statut = dto.Statut; // Pour l’instant, seule mise à jour du statut

            _context.SaveChanges();
            return true;
        }

        public bool DeleteDemande(int id)
        {
            var d = _context.Demande.FirstOrDefault(x => x.Id == id);
            if (d == null) return false;

            _context.Demande.Remove(d);
            _context.SaveChanges();
            return true;
        }
    }
}
