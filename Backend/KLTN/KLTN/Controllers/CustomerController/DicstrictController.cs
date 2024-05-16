using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.BusinessServices;
using Microsoft.AspNetCore.Components;

namespace KLTN.Controllers.CustomerController
{
    [Route("api/dicstrict")]
    public class DicstrictController : BaseController<DicstrictRequestDto, DicstrictResponseDto, Dicstrict>
    {
        public DicstrictController(DicstrictServices services) : base(services)
        {

        }
    }
   
}
