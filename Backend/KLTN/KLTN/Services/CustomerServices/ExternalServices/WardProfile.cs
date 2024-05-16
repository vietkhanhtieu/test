using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;

namespace KLTN.Services.CustomerServices.ExternalServices
{
    public class WardProfile : Profile
    {
        public WardProfile()
        {
            CreateMap<Ward, WardResponseDto>();
            CreateMap<WardRequestDto, Ward>();
        }
    }
}
