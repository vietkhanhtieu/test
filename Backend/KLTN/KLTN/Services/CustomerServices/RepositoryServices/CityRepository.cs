using KLTN.Models;
using KLTN.Models.Customer;

namespace KLTN.Services.CustomerServices.RepositoryServices
{
    public class CityRepository : BaseRepository<City>
    {
        public CityRepository(KltnContext kltnContext) : base(kltnContext)
        {
        }

    }
}
