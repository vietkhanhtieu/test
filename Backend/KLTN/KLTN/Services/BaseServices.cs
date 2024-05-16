using AutoMapper;
using KLTN.Infrastructure;
using KLTN.Models;
using KLTN.Models.Dtos;
using System.Linq.Expressions;

namespace KLTN.Services
{
    public class BaseService<TRequestDto, TResponseDto, TEntity>
    where TRequestDto : BaseRequestDto
    where TResponseDto : BaseResponseDto
    where TEntity : BaseEntity, new()
    {
        protected readonly IMapper _mapper;
        protected readonly BaseRepository<TEntity> _repository;
        private readonly UnitOfWork _unitOfWork;

        public BaseService(BaseRepository<TEntity> repository, UnitOfWork unitOfWork, IMapper mapper)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository));
            _unitOfWork = unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public virtual async Task<TResponseDto> FindByIdAsync(object id)
        {
            var entity = await _repository.FindByIdAsync(id);
            if (entity == null) throw new ArgumentException($"{typeof(TEntity).Name} not found");

            return MapToResponseDto(entity);
        }

        public virtual async Task<IEnumerable<TResponseDto>> FindAsync(
            Expression<Func<TEntity, bool>>? filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
            int? skip = null,
            int? take = null)
        {
            var entities = await _repository.FindAsync(filter, orderBy, skip: skip, take: take);
            return entities.Select(e => MapToResponseDto(e));
        }

        public virtual async Task<IEnumerable<TResponseDto>> GetAllAsync()
        {
            var entities = await _repository.FindAsync();
            return entities.Select(e => MapToResponseDto(e));
        }

        public virtual async Task<IEnumerable<TResponseDto>> PagingAsync(int skip, int take)
        {
            var entities = await _repository.FindAsync(skip: skip, take: take);
            return entities.Select(e => MapToResponseDto(e));
        }

        public virtual async Task<TResponseDto> CreateAsync(TRequestDto requestDto, bool isSave = true)
        {
            if (requestDto == null) throw new ArgumentNullException(nameof(requestDto));

            // if (!string.IsNullOrEmpty(requestDto.GetId()!.ToString()))
            //     throw new ArgumentException($"The provided id ({requestDto.GetId()}) must not be defined");

            await ValidateRequest(requestDto);
            TEntity entity = new TEntity();
            MapToEntity(requestDto, entity);
            _repository.Add(entity);

            // Create or update related entities
            await CreateOrUpdateRelatedEntity(requestDto);

            // Save changes
            if (isSave)
                await SaveChangesAsync();

            return MapToResponseDto(entity);
        }

        public virtual async Task<TResponseDto> UpdateAsync(object id, TRequestDto requestDto, bool isSave = true)
        {
            if (requestDto == null) throw new ArgumentNullException(nameof(requestDto));

            if (requestDto.GetId() != null)
                if (!id.Equals(requestDto.GetId()))
                    throw new ArgumentException(
                        $"The provided id ({id}) does not match the entity id ({requestDto.GetId()})");

            await ValidateRequest(requestDto);

            var entity = await _repository.FindByIdAsync(id);
            if (entity == null) throw new ArgumentException($"{typeof(TEntity).Name} not found");

            MapToEntity(requestDto, entity);

            _repository.Update(entity);

            // Create or update related entities
            await CreateOrUpdateRelatedEntity(requestDto);

            // Save changes
            if (isSave)
                await SaveChangesAsync();

            return MapToResponseDto(entity);
        }

        public async Task<List<FailedEntity<TEntity>>> AddOrUpdateRange(IEnumerable<TRequestDto> entiRequestDtos)
        {
            if (entiRequestDtos == null) throw new ArgumentNullException(nameof(entiRequestDtos));
            List<TEntity> entities = new List<TEntity>();
            var results = new List<FailedEntity<TEntity>>();
            foreach (var entiRequestDto in entiRequestDtos)
            {
                await ValidateRequest(entiRequestDto);
                TEntity entity = new TEntity();
                MapToEntity(entiRequestDto,entity);
                entities.Add(entity);
            }
            results = await _repository.AddOrUpdateRange(entities);
            await SaveChangesAsync();
            return results;
        }

        public virtual async Task DeleteAsync(object id, bool isSave = true)
        {
            var entity = await _repository.FindByIdAsync(id);
            if (entity == null) throw new ArgumentException($"{typeof(TEntity).Name} not found");

            _repository.Delete(entity);

            // Save changes
            if (isSave)
                await SaveChangesAsync();
        }

        protected virtual Task CreateOrUpdateRelatedEntity(TRequestDto requestDto)
        {
            return Task.CompletedTask;
        }

        protected virtual async Task SaveChangesAsync()
        {
            await _unitOfWork.SaveChangesAsync();
        }

        protected virtual Task ValidateRequest(TRequestDto requestDto)
        {
            return Task.CompletedTask;
        }

        protected virtual TResponseDto MapToResponseDto(TEntity entity)
        {
            return _mapper.Map<TResponseDto>(entity);
        }

        protected virtual async Task<bool> CheckExisted(object id)
        {
            TEntity? entity = await _repository.FindByIdAsync(id);
            return entity != null;
        }

        protected virtual void MapToEntity(TRequestDto requestDto, TEntity entity)
        {
            _mapper.Map(requestDto, entity);
        }
    }
}
