using AutoMapper;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;

namespace KLTN.Services.CustomerServices.ExternalServices
{
    public class DicstrictProfile : Profile
    {
        public DicstrictProfile()
        {
            CreateMap<Dicstrict, DicstrictResponseDto>();
            CreateMap<DicstrictRequestDto, Dicstrict>();
        }
    }
}
