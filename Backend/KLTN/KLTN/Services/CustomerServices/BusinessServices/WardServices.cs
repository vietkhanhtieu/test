using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.RepositoryServices;

namespace KLTN.Services.CustomerServices.BusinessServices
{
    public class WardServices : BaseService<WardRequestDto,WardResponseDto,Ward>
    {
        private readonly WardRepository _wardRepository;
        public WardServices(BaseRepository<Ward> repository, UnitOfWork unitOfWork, IMapper mapper,
            WardRepository wardRepository) : base(repository, unitOfWork, mapper)
        {
            _wardRepository = wardRepository;
        }
    }
    
}
