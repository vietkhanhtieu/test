using KLTN.Models.Dtos;
using KLTN.Models;
using Microsoft.AspNetCore.Mvc;
using KLTN.Services;

namespace KLTN.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController<TRequestDto, TResponseDto, TEntity> : ControllerBase
         where TRequestDto : BaseRequestDto
         where TResponseDto : BaseResponseDto
         where TEntity : BaseEntity, new()
    {
        private readonly BaseService<TRequestDto, TResponseDto, TEntity> _service;

        public BaseController(BaseService<TRequestDto, TResponseDto, TEntity> service)
        {
            _service = service ?? throw new ArgumentNullException(nameof(service));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TResponseDto>> GetById(string id)
        {
            try
            {
                var result = await _service.FindByIdAsync(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TResponseDto>>> GetAll()
        {
            try
            {
                var result = await _service.GetAllAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<TResponseDto>> Create(TRequestDto requestDto)
        {
            try
            {
                var result = await _service.CreateAsync(requestDto);
                return CreatedAtAction(nameof(GetById), new { id = result.GetId() }, result);
            }
            catch (ArgumentException ex)
            {
                // Log the exception
                var errorResponse = new
                {
                    id = requestDto.GetId(), // Assumes there is an Id property in TRequestDto
                    message = ex.Message
                };
                return BadRequest(errorResponse);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TResponseDto>> Update(string id, TRequestDto requestDto)
        {
            try
            {
                var result = await _service.UpdateAsync(id, requestDto);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                // Log the exception
                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("AddOrUpdateRange")]
        public async Task<ActionResult<IEnumerable<TResponseDto>>> AddOrUpdateRange(IEnumerable<TRequestDto> requestDtos)
        {
            try
            {
                var result = await _service.AddOrUpdateRange(requestDtos);
                return CreatedAtAction(nameof(GetAll), result);
            }
            catch (ArgumentException ex)
            {
                // Log the exception
                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            try
            {
                await _service.DeleteAsync(id);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                // Log the exception
                return StatusCode(400, ex.Message);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, ex.Message);
            }
        }
    }
}
