using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;

namespace KLTN.Controllers.CustomerController
{
    [Route("api/UserType")]

    public class UserTypeController : BaseController<UserTypeRequestDto, UserTypeResponseDto, Usertype>
    {
        public UserTypeController(UserTypeServices services) : base(services)
        {

        }
    }
}
