using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.BusinessServices;
using Microsoft.AspNetCore.Components;

namespace KLTN.Controllers.CustomerController
{
    [Route("api/city")]

    public class CityController : BaseController<CityRequestDto, CityResponseDto, City>
    {
        public CityController(CityServices services) : base(services)
        {

        }
    }
}
