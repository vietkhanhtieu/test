using KLTN.Models;
using KLTN.Models.Customer;
using KLTN.Models.Orders;
using System.Linq.Expressions;
using Npgsql.EntityFrameworkCore.PostgreSQL.Query.ExpressionTranslators.Internal;
using KLTN.Models.Products;
using Microsoft.EntityFrameworkCore;

namespace KLTN.Services.OrderServices.RepositoryServices
{
    public class OrderRepository : BaseRepository<Order>
    {
        public OrderRepository(KltnContext kltnContext) : base(kltnContext){}

        public async Task<Order?> FindByIdWithIncludeAsync(int id)
        {
            return await FindByIdWithIncludeAsync(id,
                includes: new List<Expression<Func<Order, object?>>>
                {
                    order => order.Customer,
                    order => order.Seller,
                    order => order.Orderdetails,
                    order => order.ShippingmethodNavigation,
                    order => order.StatusNavigation
                });
        }

        public async Task<List<Order>> FindByIdUserInclueAsync(int customerId)
        {
            return await _context.Orders
                .Include(order => order.Orderdetails)
                .Where(order => order.Customerid == customerId && order.Sellerid != null)
                .ToListAsync();
        }
    }
}
