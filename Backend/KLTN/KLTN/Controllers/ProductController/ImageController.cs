using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.BusinessServices;
using Microsoft.AspNetCore.Components;

namespace KLTN.Controllers.ProductController
{
    [Route("api/Image")]

    public class ImageController : BaseController<ImageRequestDto, ImageResponseDto, Image>
    {
        public ImageController(ImageServices ImageServices) : base(ImageServices)
        {

        }
    }
}
