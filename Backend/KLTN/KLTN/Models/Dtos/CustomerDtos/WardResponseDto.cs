namespace KLTN.Models.Dtos.CustomerDtos
{
    public class WardResponseDto : BaseResponseDto
    {
        public int IdWard { get; set; }

        public string? WardName { get; set; }

        public int? IdDicstrict { get; set; }

        public int? IdCity { get; set; }

        public override object? GetId()
        {
            return IdWard;
        }
    }
}
