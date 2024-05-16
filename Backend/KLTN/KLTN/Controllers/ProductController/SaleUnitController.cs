using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.ProductController
{
    [Route("api/saleUnit")]

    public class SaleUnitController : BaseController<SaleUnitRequestDto, SaleUnitResponseDto, Saleunit>
    {
        public SaleUnitController(SaleUnitServices saleUnitServices) : base(saleUnitServices)
        {

        }
    }
}
