using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Orders;

namespace KLTN.Services.CustomerServices.ExternalServices
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRequestDto, User>();
            CreateMap<User, UserResponseDto>();
        }
    }
}
