using KLTN.Models;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace KLTN.Services.ProductServices.RepositoryServices
{
    public class BussinessProductRepository : BaseRepository<Bussinessproduct>
    {

        private readonly List<Expression<Func<Bussinessproduct, object?>>> _defaultBussinessProductIncludeExpressions =
            new()
            {
                product => product.User,
                product => product.Product,
            };

        public BussinessProductRepository(KltnContext context) : base(context)
        {
        }


        public async Task<Bussinessproduct?> FindByIdWithIncludeAsync(int id)
        {
            return await FindByIdWithIncludeAsync(id, _defaultBussinessProductIncludeExpressions);
        }

        public async Task<IEnumerable<Bussinessproduct>> GetAllAsync(int top, int skip,
            FilterBussinessProduct filterBussiness)
        {
            Expression<Func<Bussinessproduct, bool>> filter = bussinessProduct => true;
            if (!string.IsNullOrWhiteSpace(filterBussiness.ProductName))
            {
                filter = bussinessProduct => bussinessProduct.Product.Productname.ToLower()
                    .Contains(filterBussiness.ProductName.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(filterBussiness.Category))
            {
                filter = bussinessProduct => bussinessProduct.Product.CategoriesNavigation.Categoriname.ToLower()
                    .Contains(filterBussiness.Category.ToLower());
            }

            return await FindAsync(includes: _defaultBussinessProductIncludeExpressions, filter: filter, skip: skip,
                take: top);


        }

        public async Task<Bussinessproduct?> FindByProductIdWithIncludeAsync(int id)
        {
            return await _context.Bussinessproducts.Include(bp => bp.User)
                .Include(bp => bp.Product)
                .FirstOrDefaultAsync(bp => bp.Id == id);
        }
    }
}
