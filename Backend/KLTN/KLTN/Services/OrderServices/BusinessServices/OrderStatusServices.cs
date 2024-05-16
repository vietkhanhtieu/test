using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Services.CustomerServices.RepositoryServices;
using KLTN.Services.OrderServices.RepositoryServices;

namespace KLTN.Services.OrderServices.BusinessServices
{
    public class OrderStatusServices : BaseService<OrderStatusRequestDto, OrderStatusResponseDto, Orderstatus>
    {
        private readonly OrderStatusRepository _orderStatusRepository;
        public OrderStatusServices(BaseRepository<Orderstatus> repository, UnitOfWork unitOfWork, IMapper mapper,
            OrderStatusRepository OrderStatusRepository) : base(repository, unitOfWork, mapper)
        {
            _orderStatusRepository = OrderStatusRepository;
        }
    }
}
