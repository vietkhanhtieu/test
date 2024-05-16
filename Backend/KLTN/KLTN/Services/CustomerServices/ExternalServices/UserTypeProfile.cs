using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;

namespace KLTN.Services.CustomerServices.ExternalServices
{
    public class UserTypeProfile : Profile
    {
        public UserTypeProfile() 
        {
            CreateMap<UserTypeRequestDto, Usertype>();
            CreateMap<Usertype, UserTypeResponseDto>();
        }
    }
}
