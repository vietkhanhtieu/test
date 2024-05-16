using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.RepositoryServices;

namespace KLTN.Services.CustomerServices.BusinessServices
{
    public class SalulationServices : BaseService<SalulationRequestDto, SalulationResponseDto, Salulation>
    {
        private readonly SalulationRepository _salulationRepository;

        public SalulationServices(BaseRepository<Salulation> repository, UnitOfWork unitOfWork, IMapper mapper,
            SalulationRepository salulationRepository) : base(repository, unitOfWork, mapper)
        {
            _salulationRepository = salulationRepository;
        }
    }
}
