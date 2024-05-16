using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.RepositoryServices;

namespace KLTN.Services.CustomerServices.BusinessServices
{
    public class UserTypeServices : BaseService<UserTypeRequestDto, UserTypeResponseDto, Usertype>
    {
        private readonly UserTypeRepository _userTypeRepository;
        public UserTypeServices(BaseRepository<Usertype> repository, UnitOfWork unitOfWork, IMapper mapper,
            UserTypeRepository userTypeRepository) : base(repository, unitOfWork, mapper)
        { 
            _userTypeRepository = userTypeRepository;
        }

        protected override async Task ValidateRequest(UserTypeRequestDto userTypeRequestDto)
        {
            
        } 
    }
}
