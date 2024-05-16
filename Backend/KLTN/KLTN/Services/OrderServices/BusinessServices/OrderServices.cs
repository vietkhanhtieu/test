using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.OrderDtos;
using KLTN.Models.Orders;
using KLTN.Models.Products;
using KLTN.Services.CustomerServices.RepositoryServices;
using KLTN.Services.OrderServices.RepositoryServices;
using KLTN.Services.ProductServices.RepositoryServices;
using KLTN.Utils;
using System.Linq;

namespace KLTN.Services.OrderServices.BusinessServices
{
    public class OrderServices : BaseService<OrderRequestDto, OrderResponseDto, Order>
    {
        private readonly ShippingMethodRepository _shippingMethodRepository;
        private readonly OrderStatusRepository _orderStatusRepository;
        private readonly OrderDetailRepository _orderDetailRepository;
        private readonly CityRepository _cityRepository;
        private readonly WardRepository _wardRepository;
        private readonly DicstrictRepository _dicstrictRepository;
        private readonly OrderRepository _orderRepository;
        private readonly BussinessProductRepository _bussinessProductRepository;
        private readonly ProductRepository _productRepository;
        private readonly IMapper _mapper;
        public OrderServices(OrderRepository repository, UnitOfWork unitOfWork, IMapper mapper,
            ShippingMethodRepository shippingMethodRepository, OrderStatusRepository orderStatusRepository,
            OrderDetailRepository orderDetailRepository, CityRepository cityRepository, WardRepository wardRepository,
            DicstrictRepository dicstrictRepository, BussinessProductRepository bussinessProductRepository, ProductRepository productRepository) : base(repository, unitOfWork, mapper)
        {
            _shippingMethodRepository = shippingMethodRepository;
            _orderStatusRepository = orderStatusRepository;
            _orderDetailRepository = orderDetailRepository;
            _cityRepository = cityRepository;
            _wardRepository = wardRepository;
            _dicstrictRepository = dicstrictRepository;
            _orderRepository = repository;
            _mapper = mapper;
            _bussinessProductRepository = bussinessProductRepository;
            _productRepository = productRepository;
        }

        protected async override Task ValidateRequest(OrderRequestDto requestDto)
        {
            await ValidateShippingMethod(requestDto.Shippingmethod);
            await ValidateOrderStatus(requestDto.Status);
            await ValidateCity(requestDto.Idshippingcity);
            await ValidateDicstrict(requestDto.Idshippingdicstrict);
            await ValidateWard(requestDto.Idshippingward);
        }

        public async Task<List<OrderResponseDto>> FindByIdUserInclueAsync(int customerId)
        {
            List<Order> orders = await _orderRepository.FindByIdUserInclueAsync(customerId);
            List<OrderResponseDto> orderResponseDtos =  new List<OrderResponseDto>();
            foreach (var order in orders)
            {
                var orderResponseDto = MapToResponseDto(order);
                List<OrderDetailResponseDto> orderDetailResponseDtos = new List<OrderDetailResponseDto>();
                foreach (var ordetail in order.Orderdetails)
                {
                    var product = await _bussinessProductRepository.FindByProductIdWithIncludeAsync(ordetail.Productid);
                    var orderDetailResponse = new OrderDetailResponseDto
                    {
                        ProductName = product.Product.Productname,
                        Orderid = order.Orderid,
                        Productid = product.Productid,
                        Quantity = ordetail.Quantity,
                        Price = ordetail.Price

                    };
                    orderDetailResponseDtos.Add(orderDetailResponse);
                }
                orderResponseDto.OrderDetailResponseDto = orderDetailResponseDtos;
                orderResponseDtos.Add(orderResponseDto);

            }
            return orderResponseDtos;
        }

        public async Task<RestAPIResponseDto> CreateAsync(OrderRequestDto orderRequest)
        {
            await ValidateRequest(orderRequest);
            List<Order> orders = new List<Order>();
            List<string> sellerIds = new();
            foreach (OrderDetailRequestDto orderdetail in orderRequest.Orderdetails)
            {
                var sellerId = (await _bussinessProductRepository.FindByProductIdWithIncludeAsync(orderdetail.Productid)).User
                    .Sellerid;
                if (!sellerIds.Contains(sellerId.ToString()))
                {
                    var order = _mapper.Map<Order>(orderRequest);
                    order.Sellerid = sellerId;
                    order.Orderid = IdHelper.GenerateId();
                    orders.Add(order);
                    sellerIds.Add(sellerId.ToString());
                }
            }

            var rootOrder = new Order();
            if (sellerIds.Count > 1)
            {
                orderRequest.Orderdetails = null;
                rootOrder = _mapper.Map<Order>(orderRequest);
                rootOrder.Orderid = IdHelper.GenerateId();
                _orderRepository.Add(rootOrder);
            }
            var newOrderDetails = new List<Orderdetail>();
            foreach (Order orderObj in orders)
            {

                foreach (var orderDetail in orderObj.Orderdetails)
                {
                    var sellerId = (await _bussinessProductRepository.FindByProductIdWithIncludeAsync(orderDetail.Productid)).User
                        .Sellerid;
                    if (sellerId == orderObj.Sellerid)
                    {
                        var newDetail = new Orderdetail
                        {
                            Orderid = orderObj.Orderid,
                            Productid = orderDetail.Productid,
                            Price = orderDetail.Price,
                            Quantity = orderDetail.Quantity
                        };
                        newOrderDetails.Add(newDetail);
                    }
                }
                orderObj.Orderdetails = null;
                orderObj.Orderrootid = rootOrder.Orderid;
                _orderRepository.Add(orderObj);

            }
            foreach (var detail in newOrderDetails)
            {
                _orderDetailRepository.Add(detail);
            }
            await SaveChangesAsync();

            return new RestAPIResponseDto
            {
                Success = true,
                Message = "Order created successfully"
            };

        }

        private async Task CreateOrUpdateRelatedEntity(int orderId, Order order)
        {


            foreach (var orderDetail in order.Orderdetails)
            {

            }
        }

        public async Task<OrderResponseDto?> FindByIdWithIncludeAsync(int id)
        {
            var order = await _orderRepository.FindByIdWithIncludeAsync(id);
            try
            {
                return MapToResponseDto(order);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        private async Task ValidateShippingMethod(int? shippingMethodId)
        {
            var shippingMethod = await _shippingMethodRepository.FindByIdAsync(shippingMethodId);
            if (shippingMethod == null)
            {
                throw new ArgumentException($"Shipping method with id {shippingMethodId} does not exist");
            }
        }

        private async Task ValidateOrderStatus(int? ordetStatusId)
        {
            var orderStatus = await _orderStatusRepository.FindByIdAsync(ordetStatusId);
            if (orderStatus == null)
            {
                throw new ArgumentException($"Order status with id {ordetStatusId} does not exist");
            }
        }

        private async Task ValidateCity(int? cityId)
        {
            var city = await _cityRepository.FindByIdAsync(cityId);
            if (city == null)
            {
                throw new ArgumentException($"City with id {cityId} does not exist");
            }
        }

        private async Task ValidateDicstrict(int? dicstrictId)
        {
            var dicstrict = await _dicstrictRepository.FindByIdAsync(dicstrictId);
            if (dicstrict == null)
            {
                throw new ArgumentException($"Dicstrict with id {dicstrictId} does not exist");
            }
        }

        private async Task ValidateWard(int? wardId)
        {
            var ward = await _wardRepository.FindByIdAsync(wardId);
            if (ward == null)
            {
                throw new ArgumentException($"Ward with id {wardId} does not exist");
            }
        }

        private async Task ValidateOrder(int? orderId)
        {
            var order = await _orderRepository.FindByIdAsync(orderId);
            if (order == null)
            {
                throw new ArgumentException($"Order with id {orderId} does not exist");
            }
        }
    }
}
