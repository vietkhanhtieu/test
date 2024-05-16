using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.BusinessServices;
using Microsoft.AspNetCore.Components;

namespace KLTN.Controllers.CustomerController
{
    [Route("api/ward")]
    public class WardController : BaseController<WardRequestDto, WardResponseDto, Ward>
    {
        public WardController(WardServices services) : base(services)
        {

        }
    }
}
