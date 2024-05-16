using KLTN.Models;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;

namespace KLTN.Services.OrderServices.RepositoryServices
{
    public class OrderDetailRepository : BaseRepository<Orderdetail>
    {
        public OrderDetailRepository(KltnContext kltnContext) : base(kltnContext) { }

    }
}
