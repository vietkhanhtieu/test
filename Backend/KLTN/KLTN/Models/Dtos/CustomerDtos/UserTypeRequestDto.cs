using KLTN.Models.Customer;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace KLTN.Models.Dtos.CustomerDtos
{
    public class UserTypeRequestDto : BaseRequestDto
    {
        public int UserTypeId { get; set; }

        [Required(ErrorMessage = "Usertypename is require")]
        public string? UserTypeName { get; set; }
        public override object GetId()
        {
            return UserTypeId;
        }
    }
}
