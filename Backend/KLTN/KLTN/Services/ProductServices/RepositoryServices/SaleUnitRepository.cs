using KLTN.Models;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.RepositoryServices
{
    public class SaleUnitRepository : BaseRepository<Saleunit>
    {
        public SaleUnitRepository(KltnContext  context) : base(context) { }
    }
}
