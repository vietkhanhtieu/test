using KLTN.Models;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.RepositoryServices
{
    public class CategoryRepository : BaseRepository<Category>
    {
        public CategoryRepository(KltnContext  context) : base(context) { }
    }
}
