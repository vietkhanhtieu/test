using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.RepositoryServices;

namespace KLTN.Services.CustomerServices.BusinessServices
{
    public class DicstrictServices : BaseService<DicstrictRequestDto, DicstrictResponseDto, Dicstrict>
    {
        private readonly DicstrictRepository _dicstrictRepository;

        public DicstrictServices(BaseRepository<Dicstrict> repository, UnitOfWork unitOfWork, IMapper mapper
            , DicstrictRepository dicstrictRepository) : base(repository, unitOfWork, mapper)
        {
            _dicstrictRepository = dicstrictRepository;
        }

    }
}
