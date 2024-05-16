using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.ProductController
{
    [Route("api/category")]

    public class CategoryController : BaseController<CategoriesRequestDto, CategoriesResponseDto, Category>
    {
        public CategoryController(CategoryServices categoryServices) : base(categoryServices) { }
    }
}
