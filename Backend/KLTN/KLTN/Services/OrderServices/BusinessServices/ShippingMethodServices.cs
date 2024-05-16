using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Services.OrderServices.RepositoryServices;

namespace KLTN.Services.OrderServices.BusinessServices
{
    public class ShippingMethodServices : BaseService<ShippingMethodRequestDto, ShippingMethodResponseDto, Shippingmethod>
    {
        private readonly ShippingMethodRepository _shippingMethodRepository;
        public ShippingMethodServices(BaseRepository<Shippingmethod> repository, UnitOfWork unitOfWork, IMapper mapper,
            ShippingMethodRepository shippingMethodRepository) : base(repository, unitOfWork, mapper)
        {
            _shippingMethodRepository = shippingMethodRepository;
        }
    }
}
