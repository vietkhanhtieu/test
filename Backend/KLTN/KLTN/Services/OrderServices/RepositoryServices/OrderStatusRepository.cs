using KLTN.Models.Orders;
using KLTN.Models;

namespace KLTN.Services.OrderServices.RepositoryServices
{
    public class OrderStatusRepository : BaseRepository<Orderstatus>
    {
        public OrderStatusRepository(KltnContext context) : base(context)
        {
        }
    }
}
