using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;

namespace KLTN.Services.CustomerServices.ExternalServices
{
    public class SalulationProfile : Profile
    {
        public SalulationProfile()
        {
            CreateMap<SalulationRequestDto, Salulation>();
            CreateMap<Salulation, SalulationResponseDto>();
        }
    }
}
