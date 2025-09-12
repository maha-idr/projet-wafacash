using Demande_API.Data;
using Demande_API.DTO;
using Demande_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WorkflowApp.DTOs;
using WorkflowApp.Models;

namespace Demande_API.Services
{
    public class DemandeService : IDemandeService
    {
        private readonly IDemandeRepository _repo;
        public DemandeService(IDemandeRepository repo)
        {
            _repo = repo;
        }

        public async Task CreateDemande(DemandeCreateDto dto)
        {
            Demande demande = new Demande
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
            await _repo.AddAsync(demande);
            
        }

        public async Task<List<DemandeReadDto>> GetAllDemandesAsync()
        {
            var demandes_repo = await _repo.GetAllAsync();
            return demandes_repo.Select(d => new DemandeReadDto
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

        public async Task<DemandeReadDto?> GetDemandeById(int id)
        {
            Demande demande = await _repo.GetByIdAsync(id);
            return new DemandeReadDto
            {
                Id = demande.Id,
                Region = demande.Region,
                TypeReseau = demande.TypeReseau,
                LibelleMandataire = demande.LibelleMandataire,
                Code = demande.Code,
                NomAgence = demande.NomAgence,
                TelephoneContact = demande.TelephoneContact,
                Ville = demande.Ville,
                AdresseLivraison = demande.AdresseLivraison,
                EnvoisModem = demande.EnvoisModem,
                Modem = demande.Modem,
                Statut = demande.Statut,
                DateSaisie = demande.DateSaisie
            };
        }

        public async Task<bool> UpdateDemande(int id, DemandeUpdateDto dto)
        {
            Demande? demandeExistante = await _repo.GetByIdAsync(id);
            if (demandeExistante == null) 
                return false;
            
            demandeExistante.Region = dto.Region;
            demandeExistante.TypeReseau = dto.TypeReseau;
            demandeExistante.LibelleMandataire = dto.LibelleMandataire;
            demandeExistante.Code = dto.Code;
            demandeExistante.NomAgence = dto.NomAgence;
            demandeExistante.TelephoneContact = dto.TelephoneContact;
            demandeExistante.Ville = dto.Ville;
            demandeExistante.AdresseLivraison = dto.AdresseLivraison;
            demandeExistante.EnvoisModem = dto.EnvoisModem;
            demandeExistante.Modem = dto.Modem;

            await _repo.UpdateAsync(demandeExistante);
            return true;

        }


        public async Task<List<DemandeConsultationDto>> GetFilteredDemandesAsync(ConsultationFilterDto filters)
        {
            var demandes = await _repo.GetDemandesAsync(filters);
            return demandes.Select(d => new DemandeConsultationDto
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
    }
}
