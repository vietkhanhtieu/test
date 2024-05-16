using KLTN.Models;
using KLTN.Models.Customer;

namespace KLTN.Services.CustomerServices.RepositoryServices
{
    public class SalulationRepository : BaseRepository<Salulation>
    {
        public SalulationRepository(KltnContext kltnContext) : base(kltnContext)
        {
        }
    }
}
