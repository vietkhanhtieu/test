using KLTN.Models;
using KLTN.Models.Orders;

namespace KLTN.Services.OrderServices.RepositoryServices
{
    public class ShippingMethodRepository : BaseRepository<Shippingmethod>
    {
        public ShippingMethodRepository(KltnContext context) : base(context) { }
    }
}
