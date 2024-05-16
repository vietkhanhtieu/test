using KLTN.Models;
using KLTN.Models.Customer;

namespace KLTN.Services.CustomerServices.RepositoryServices
{
    public class DicstrictRepository : BaseRepository<Dicstrict>
    {
        public DicstrictRepository(KltnContext context) : base(context)
        {
        }
    }
}
