using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.CustomerController
{
    [Route("api/Salulation")]

    public class SalulationController : BaseController<SalulationRequestDto, SalulationResponseDto, Salulation>
    {
        public SalulationController(SalulationServices services) : base(services)
        {

       }
    }
}
