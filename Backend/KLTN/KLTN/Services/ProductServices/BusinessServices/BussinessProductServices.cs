using System.Diagnostics.CodeAnalysis;
using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.CustomerServices.RepositoryServices;
using KLTN.Services.ProductServices.RepositoryServices;

namespace KLTN.Services.ProductServices.BusinessServices
{
    public class BussinessProductServices : BaseService<BussinessProductRequestDto, BussinessResponseDto, Bussinessproduct>
    {
        private readonly BussinessProductRepository _bussinessProductRepository;
        private readonly ProductRepository _productRepository;
        private readonly UserRepository  _userRepository;

        public BussinessProductServices(BussinessProductRepository bussinessProductRepository, UnitOfWork unitOfWork, IMapper mapper,
            ProductRepository productRepository, UserRepository userRepository) : base(bussinessProductRepository, unitOfWork, mapper)
        {
            _bussinessProductRepository = bussinessProductRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }

        public async Task<BussinessResponseDto?> FindByIdWithIncludeAsync(int id)
        {
            var product = await _bussinessProductRepository.FindByIdWithIncludeAsync(id);
            return MapToResponseDto(product);
        }

        public async Task<IEnumerable<BussinessResponseDto>> GetAllAsync(int top, int skip, FilterBussinessProduct filterBussiness)
        {
            var entities = await _bussinessProductRepository.GetAllAsync(top, skip, filterBussiness);
            return entities.Select(e => MapToResponseDto(e));
        }

        protected override async Task ValidateRequest(BussinessProductRequestDto requestDto)
        {
            await ValidateSellerCode(requestDto.Userid);
            await ValidateProduct(requestDto.Productid);
        }

        private async Task ValidateSellerCode(int? userId)
        {
            var user = await _userRepository.FindByIdAsync(userId);
            if (user == null)
            {
                throw new ArgumentException($"User with id {userId} does not exist");
            }

            if (user.Sellerid == 0)
            {
                throw new ArgumentException($"User with id {userId} is not seller");

            }
        }

        private async Task ValidateProduct(int? productId)
        {
            var product = await _productRepository.FindByIdAsync(productId);
            if (productId == null)
            {
                throw new ArgumentException($"Product with id {productId} does not exist");
            }
        }
    }
}
