using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.RepositoryServices;

namespace KLTN.Services.ProductServices.BusinessServices
{
    public class CategoryServices : BaseService<CategoriesRequestDto, CategoriesResponseDto, Category>
    {
        private readonly CategoryRepository _categoryRepository;
        public CategoryServices(BaseRepository<Category> repository, UnitOfWork unitOfWork, IMapper mapper,
            CategoryRepository categoryRepository) : base(repository, unitOfWork, mapper)
        {
            _categoryRepository = categoryRepository;
        }
    }
}
