using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.RepositoryServices;

namespace KLTN.Services.ProductServices.BusinessServices
{
    public class SaleUnitServices : BaseService<SaleUnitRequestDto, SaleUnitResponseDto, Saleunit>
    {
        private readonly SaleUnitRepository _saleUnitRepository;

        public SaleUnitServices(BaseRepository<Saleunit> repository, UnitOfWork unitOfWork, IMapper mapper,
            SaleUnitRepository saleUnitRepository) : base(repository, unitOfWork, mapper)
        {
            _saleUnitRepository = saleUnitRepository;
        }
    }
}
