using KLTN.Models;
using KLTN.Models.Customer;

namespace KLTN.Services.CustomerServices.RepositoryServices
{
    public class UserTypeRepository : BaseRepository<Usertype>
    {
        public UserTypeRepository(KltnContext kltnContext) : base(kltnContext)
        {

        }
    }
}
