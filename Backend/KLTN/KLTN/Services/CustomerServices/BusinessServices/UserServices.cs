using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models.Customer;
using KLTN.Models.Dtos.CustomerDtos;
using KLTN.Services.CustomerServices.RepositoryServices;
using System.Linq.Expressions;
using Microsoft.Extensions.FileProviders.Physical;
using System.Numerics;

namespace KLTN.Services.CustomerServices.BusinessServices
{
    public class UserServices : BaseService<UserRequestDto, UserResponseDto, User>
    {
        private readonly UserRepository _userRepository;
        private readonly UserTypeRepository _userTypeRepository;
        private readonly DicstrictRepository _dicstrictRepository;
        private readonly WardRepository _wardRepository;
        private readonly SalulationRepository _salulationRepository;
        private readonly CityRepository _cityRepository;
        public UserServices(UserRepository userRepository, UnitOfWork unitOfWork, IMapper mapper,
            UserTypeRepository userTypeRepository, DicstrictRepository dicstrictRepository, 
            WardRepository wardRepository, SalulationRepository salulationRepository, CityRepository cityRepository) : base(userRepository, unitOfWork, mapper)
        {
            _userRepository = userRepository;
            _userTypeRepository = userTypeRepository;
            _dicstrictRepository = dicstrictRepository;
            _wardRepository = wardRepository;
            _salulationRepository = salulationRepository;
            _cityRepository = cityRepository;
        }

        public async Task<UserResponseDto?> FindByIdWithIncludeAsync(int id)
        {
            var user = await _userRepository.FindByIdWithIncludeAsync(id);
            return  MapToResponseDto(user);
        }

        public async Task<UserResponseDto?> Login(LoginRequestDto loginRequest)
        {
            var user = await _userRepository.FindByPhone(loginRequest.Phone);
            if (user == null)
            {
                throw new ArgumentException($"User with phone {loginRequest.Phone} does not exist");
            }

            if (!user.Password.Equals(loginRequest.Password))
            {
                throw new ArgumentException($"Password is not correct");

            }
            return MapToResponseDto(user);
        }

        protected override async Task ValidateRequest(UserRequestDto userRequestDto)
        {
            //await ValidateSalulationCode(userRequestDto.Salulation);
            //await ValidateCityCode(userRequestDto.Idcity);
            //await ValidateUserTypeCode(userRequestDto.Usertype);
            //await ValidateDictristCode(userRequestDto.Iddictrist);
            //await ValidateWardCode(userRequestDto.Idward);
            await ValidatePhone(userRequestDto.Phone);
        }

        

        private async Task ValidateUserTypeCode(int? userTypeId)
        {
            var userType = await _userTypeRepository.FindByIdAsync(userTypeId);
            if (userType == null)
            {
                throw new ArgumentException($"User type with id {userTypeId} does not exist");
            }
        }

        private async Task ValidateDictristCode(int? districtId)
        {
            var district = await _dicstrictRepository.FindByIdAsync(districtId);
            if (district == null)
            {
                throw new ArgumentException($"Dicstrict with id {districtId} does not exist");
            }
        }

        private async Task ValidateWardCode(int? wardId)
        {
            var ward = await _wardRepository.FindByIdAsync(wardId);
            if (ward == null)
            {
                throw new ArgumentException($"Ward with id {wardId} does not exist");
            }
        }

        private async Task ValidateCityCode(int? cityId)
        {
            var city = await _cityRepository.FindByIdAsync(cityId);
            if (city == null)
            {
                throw new ArgumentException($"City with id {cityId} does not exist");
            }
        }


        private async Task ValidateSalulationCode(int? salulationId)
        {
            var salulation = await _salulationRepository.FindByIdAsync(salulationId);
            if (salulation == null)
            {
                throw new ArgumentException($"Salulation with id {salulationId} does not exist");
            }
        }

        private async Task ValidatePhone(string? phone)
        {
            var user = await _userRepository.FindByPhone(phone);
            if (user != null)
            {
                throw new ArgumentException($"Số điện thoại đã tồn tại");
            }
        }
    }
}
