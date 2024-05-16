using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using KLTN.Models.Products;

namespace KLTN.Models.Dtos.CustomerDtos
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "Phone is require")]public string Phone { get; set; }

        [Required(ErrorMessage = "Password is require")] public string Password { get; set; }
    }
}
