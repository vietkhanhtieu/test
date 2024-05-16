using KLTN.Models.Customer;
using KLTN.Models.Dtos;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.BusinessServices;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

namespace KLTN.Controllers.CustomerController
{
    [Route("api/")]

    public class UserController : Controller
    {
        private readonly UserServices _userServices;
        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

   
        [HttpGet]
        [Route("user/{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            try
            {
                var user = await _userServices.FindByIdWithIncludeAsync(id);
                if (user == null) return NotFound();

                return Ok(user);
            }
            catch
            {
                return Problem();
            }
        }


        [HttpPost]
        [Route("user/register")]
        public async Task<ActionResult> Create([FromBody] UserRequestDto userRequestDto)
        {
            try
            {
                var user = await _userServices.CreateAsync(userRequestDto);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                var response = new ResfulAPIResponseDto()
                {
                    Success = false,
                    Message = ex.Message,
                    Phone = ex.Message
                };
                return BadRequest(response);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        [HttpPut]
        [Route("user/update-user-infor/{id}")]
        public async Task<ActionResult<User>> Update([FromRoute] int id, [FromBody] UserRequestDto userRequestDto)
        {
            try
            {
                if (id != userRequestDto.Userid)
                    return BadRequest($"Can't find user: {userRequestDto.Userid}");
                var user = await _userServices.UpdateAsync(id,userRequestDto);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [HttpDelete]
        [Route("user/{id}")]
        public async Task<ActionResult<User>> Delete(int id)
        {
            try
            {
                await _userServices.DeleteAsync(id);
                return NoContent();
            }
            catch (ArgumentException argumentException)
            {
                return NotFound(argumentException.Message);
            }
            catch
            {
                return Problem();
            }
        }


        [HttpPost]
        [Route("user/login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginRequestDto loginRequest)
        {
            try
            {
                var user = await _userServices.Login(loginRequest);
                return Ok(user);
            }
            catch (ArgumentException ex)
            {
                var errorResponse = new
                {
                    status = 0,
                    message = ex.Message
                };
                return BadRequest(errorResponse);
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }
    }
}
