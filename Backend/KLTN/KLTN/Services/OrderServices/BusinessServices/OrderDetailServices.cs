using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Services.OrderServices.RepositoryServices;

namespace KLTN.Services.OrderServices.BusinessServices
{
    public class OrderDetailServices : BaseService<OrderDetailRequestDto, OrderDetailResponseDto, Orderdetail>
    {
        private readonly OrderDetailRepository _orderDetailRepository;
        public OrderDetailServices(BaseRepository<Orderdetail> repository, UnitOfWork unitOfWork, IMapper mapper,
            OrderDetailRepository OrderDetailRepository) : base(repository, unitOfWork, mapper)
        {
            _orderDetailRepository = OrderDetailRepository;
        }
    }
}
