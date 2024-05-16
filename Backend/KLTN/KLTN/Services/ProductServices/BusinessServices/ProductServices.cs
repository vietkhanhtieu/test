using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.CustomerServices.RepositoryServices;
using KLTN.Services.ProductServices.RepositoryServices;

namespace KLTN.Services.ProductServices.BusinessServices
{
    public class ProductServices :BaseService<ProductRequestDto, ProductResponseDto, Product>
    {
        private readonly ProductRepository _productRepository;
        private readonly SaleUnitRepository _saleUnitRepository;
        private readonly CategoryRepository _categoryRepository;
        public ProductServices(ProductRepository repository, UnitOfWork unitOfWork, IMapper mapper,
            SaleUnitRepository saleUnitRepository, CategoryRepository categoryRepository) : base(repository, unitOfWork, mapper)
        {
            _productRepository = repository;
            _saleUnitRepository = saleUnitRepository;
            _categoryRepository = categoryRepository;
        }

        public async Task<ProductResponseDto?> FindByIdWithIncludeAsync(int id)
        {
            var product = await _productRepository.FindByIdWithIncludeAsync(id);
            return MapToResponseDto(product);
        }

        public override async Task<IEnumerable<ProductResponseDto>> GetAllAsync()
        {
            var entities = await _productRepository.GetAllAsync();
            return entities.Select(e => MapToResponseDto(e));
        }

        protected override async Task ValidateRequest(ProductRequestDto productRequest)
        {
            await ValidateCategory(productRequest.Categories);
            await ValidateSaleUnit(productRequest.Saleunit);
        }

        private async Task ValidateCategory(int? idCategory)
        {
            var category = await _categoryRepository.FindByIdAsync(idCategory);
            if (category == null)
            {
                throw new ArgumentException($"Categories with id {idCategory} does not exist");
            }
        }

        private async Task ValidateSaleUnit(int? idSaleUnit)
        {
            var saleUnit = await _saleUnitRepository.FindByIdAsync(idSaleUnit);
            if (saleUnit == null)
            {
                throw new ArgumentException($"Sale Unit with id {idSaleUnit} does not exist");
            }
        }
    }
}
