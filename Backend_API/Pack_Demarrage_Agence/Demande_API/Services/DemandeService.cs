using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Demande_API.DTO;
using Demande_API.Models;
using Demande_API.Repositories;

namespace Demande_API.Services
{
    public class DemandeService : IDemandeService
    {
        private readonly IDemandeRepository _repo;
        public DemandeService(IDemandeRepository repo) => _repo = repo;

        private static DemandeReadDto ToReadDto(Demande d) => new()
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
            DateSaisie = d.DateSaisie,
            Lot = d.Lot,
            Sqc = d.Sqc,
            IMEI = d.IMEI,
            CodeBarre = d.CodeBarre,
            NumeroLigne = d.NumeroLigne,
            Societe = d.Societe,
            DateAffectation = d.DateAffectation,
            OperateurTelecom = d.OperateurTelecom,
            NouvelleBox = d.NouvelleBox,
            DateReaffectation = d.DateReaffectation,
            NouveauIMEI = d.NouveauIMEI,
            NouveauNumeroLigne = d.NouveauNumeroLigne,
            EnvoiFactu = d.EnvoiFactu,
            DateDemandeFactu = d.DateDemandeFactu
        };

        public async Task<List<DemandeReadDto>> GetPendingAsync(CancellationToken ct = default) =>
            (await _repo.GetPendingAsync(ct)).Select(ToReadDto).ToList();

        public async Task<DemandeReadDto?> GetByIdAsync(int id, CancellationToken ct = default)
        {
            var d = await _repo.GetByIdAsync(id, ct);
            return d is null ? null : ToReadDto(d);
        }

        public async Task<bool> UpdateAffectationAsync(int id, UpdateAffectationDto dto, CancellationToken ct = default)
        {
            var d = await _repo.GetByIdAsync(id, ct);
            if (d is null) return false;

            d.Lot = dto.Lot;
            d.Sqc = dto.Sqc;
            d.IMEI = dto.IMEI;
            d.CodeBarre = dto.CodeBarre;
            d.NumeroLigne = dto.NumeroLigne;
            d.Societe = dto.Societe;
            d.DateAffectation = dto.DateAffectation;
            d.OperateurTelecom = dto.OperateurTelecom;
            d.NouvelleBox = dto.NouvelleBox;
            d.DateReaffectation = dto.DateReaffectation;
            d.NouveauIMEI = dto.NouveauIMEI;
            d.NouveauNumeroLigne = dto.NouveauNumeroLigne;
            d.EnvoiFactu = dto.EnvoiFactu;
            d.DateDemandeFactu = dto.DateDemandeFactu;

            d.Statut = 1;

            await _repo.UpdateAsync(d, ct);
            await _repo.SaveChangesAsync(ct);
            return true;
        }
    }
}
