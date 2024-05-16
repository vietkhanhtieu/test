namespace KLTN.Models.Dtos.CustomerDtos
{
    public class DicstrictResponseDto : BaseResponseDto
    {
        public int IdDictrist { get; set; }

        public string? Dictristname { get; set; }

        public int? IdCity { get; set; }

        public override object? GetId()
        {
            return IdDictrist;
        }
    }
}
