using KLTN.Models;
using KLTN.Models.Customer;
using KLTN.Models.Products;
using System.Linq.Expressions;

namespace KLTN.Services.ProductServices.RepositoryServices
{
   
    public class ProductRepository : BaseRepository<Product>
    {
        private readonly List<Expression<Func<Product, object?>>> _defaultProductIncludeExpressions =
            new()
            {
                product => product.CategoriesNavigation,
                product => product.SaleunitNavigation,
                product => product.Productimages
            };
        public ProductRepository(KltnContext  context) : base(context) { }

        public async Task<Product?> FindByIdWithIncludeAsync(int id)
        {
            return await FindByIdWithIncludeAsync(id, _defaultProductIncludeExpressions);
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await FindAsync(includes: _defaultProductIncludeExpressions);
        }
    }
}
