using KLTN.Models;
using KLTN.Models.Products;

namespace KLTN.Services.ProductServices.RepositoryServices
{
    public class ImageRepository : BaseRepository<Image>
    {
        public ImageRepository(KltnContext context) : base(context)
        {

        }
    }
}
