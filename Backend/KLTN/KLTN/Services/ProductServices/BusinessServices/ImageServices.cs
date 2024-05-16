using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Dtos.ProductDtos;
using KLTN.Models.Products;
using KLTN.Services.ProductServices.RepositoryServices;

namespace KLTN.Services.ProductServices.BusinessServices
{
    public class ImageServices : BaseService<ImageRequestDto, ImageResponseDto, Image>
    {
        private readonly ImageRepository _imageRepository;

        public ImageServices(BaseRepository<Image> repository, UnitOfWork unitOfWork, IMapper mapper,
            ImageRepository ImageRepository) : base(repository, unitOfWork, mapper)
        {
            _imageRepository = ImageRepository;
        }
    }
}
