using KLTN.Models;
using KLTN.Models.Customer;

namespace KLTN.Services.CustomerServices.RepositoryServices
{
    public class WardRepository : BaseRepository<Ward>
    {
        public WardRepository(KltnContext context) : base(context)
        {
        }
    }
}
