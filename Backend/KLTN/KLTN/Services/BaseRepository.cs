using KLTN.Models;
using KLTN.Models.Dtos;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace KLTN.Services
{
    public class BaseRepository<TEntity> where TEntity : BaseEntity
    {
        public readonly KltnContext _context;
        public readonly DbSet<TEntity> _dbSet;

        public BaseRepository(KltnContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _dbSet = context.Set<TEntity>();

        }

        public virtual async Task<TEntity?> FindByIdAsync(object id)
        {
            if (int.TryParse(id.ToString(), out var intId))
            {
                return await _dbSet.FindAsync(intId);
            }
            return await _dbSet.FindAsync(id);
        }

        public virtual async Task<TEntity?> FindByIdWithIncludeAsync(object id,
        List<Expression<Func<TEntity, object?>>>? includes = null)
        {
            // Construct the base query with included navigation properties
            IQueryable<TEntity> query = _dbSet;

            // Include navigation properties if specified
            if (includes != null)
                foreach (var includeExpression in includes)
                    query = query.Include(includeExpression);

            // Execute the query asynchronously to fetch all entities
            var entities = await query.ToListAsync();

            // Filter the entities by ID using the GetId() method
            var entity = entities.FirstOrDefault(e => e.GetId().Equals(id));

            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> FindAsync(
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null,
        List<Expression<Func<TEntity, object?>>>? includes = null,
        int? skip = null,
        int? take = null)
        {
            IQueryable<TEntity> query = _dbSet;

            if (includes != null)
                foreach (var include in includes)
                    query = query.Include(include);

            if (filter != null) query = query.Where(filter);

            if (orderBy != null) query = orderBy(query);

            if (skip.HasValue) query = query.Skip(skip.Value);

            if (take.HasValue) query = query.Take(take.Value);

            return await query.ToListAsync();
        }

        public void Add(TEntity entity)
        {
            try
            {
                _dbSet.Add(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error adding {typeof(TEntity).Name} entity to the database", ex);
            }
        }

        public void Update(TEntity entity)
        {
            try
            {
                _dbSet.Attach(entity);
                _context.Entry(entity).CurrentValues.SetValues(entity);

                // Chỉ đặt trạng thái Modified cho các trường có giá trị khác null
                foreach (var property in _context.Entry(entity).Properties)
                {
                    if (property.CurrentValue == null)
                    {
                        property.IsModified = false; // Không cập nhật trường này
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"Error updating {typeof(TEntity).Name} entity in the database", ex);
            }
        }

        public void Delete(TEntity entity)
        {
            try
            {
                _dbSet.Remove(entity);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error removing {typeof(TEntity).Name} entity from the database", ex);
            }
        }

        public void DeleteRange(IEnumerable<TEntity> entities)
        {
            try
            {
                _dbSet.RemoveRange(entities);
            }
            catch (Exception ex)
            {
                throw new Exception($"Error removing a range of {typeof(TEntity).Name} entities from the database", ex);
            }
        }

        public async Task<List<FailedEntity<TEntity>>> AddOrUpdateRange(IEnumerable<TEntity> entities)
        {
            var results = new List<FailedEntity<TEntity>>();

            foreach (var entity in entities)
                try
                {
                    var existingEntity = await FindByIdAsync(entity.GetId());

                    if (existingEntity == null)
                        _dbSet.Add(entity);
                    else
                        _context.Entry(existingEntity).CurrentValues.SetValues(entity);
                }
                catch (Exception ex)
                {
                    results.Add(new FailedEntity<TEntity> { Entity = entity, Exception = ex });
                }

            return results;
        }

        public async Task SaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Error saving changes to the {typeof(TEntity).Name} entity in the database", ex);
            }
        }
    }
}
