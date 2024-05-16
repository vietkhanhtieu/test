namespace KLTN.Models.Dtos
{
    public class FailedEntity<TEntity> where TEntity : BaseEntity
    {
        public TEntity Entity { get; set; }
        public Exception Exception { get; set; }
    }
}
