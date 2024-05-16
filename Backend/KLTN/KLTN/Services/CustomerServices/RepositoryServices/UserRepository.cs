using System.Linq.Expressions;
using KLTN.Models;
using KLTN.Models.Customer;
using Microsoft.EntityFrameworkCore;

namespace KLTN.Services.CustomerServices.RepositoryServices
{
    public class UserRepository : BaseRepository<User>
    {

        public UserRepository(KltnContext context) : base(context) { }

        public async Task<User?> FindByIdWithIncludeAsync(int id)
        {
            return await FindByIdWithIncludeAsync(id,
                includes: new List<Expression<Func<User, object?>>>
                {
                    user => user.IdcityNavigation,
                    user => user.IdwardNavigation,
                    user => user.IddictristNavigation,
                    user => user.SalulationNavigation,
                    user => user.UsertypeNavigation
                });
        }

        public async Task<User?> FindByPhone(string phone)
        {
            return await _context.Users.FirstOrDefaultAsync(user => user.Phone == phone);
        }
    }
}
