using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.RepositoryServices;

namespace KLTN.Services.CustomerServices.BusinessServices
{
    public class CityServices : BaseService<CityRequestDto, CityResponseDto, City>
    {
        private readonly CityRepository _cityRepository;
        public CityServices(BaseRepository<City> repository, UnitOfWork unitOfWork, IMapper mapper, 
            CityRepository cityRepository) : base(repository, unitOfWork, mapper)
        {
            _cityRepository = cityRepository;
        }
    }
}
