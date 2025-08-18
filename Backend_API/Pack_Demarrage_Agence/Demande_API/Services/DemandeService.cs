using Demande_API.Repositories;

namespace Demande_API.Services
{

    public class DemandeService : IDemandeService
    {
        private readonly IDemandeRepository _repo;

        public DemandeService(IDemandeRepository repo)
        {
            _repo = repo;
        }
    }
}
