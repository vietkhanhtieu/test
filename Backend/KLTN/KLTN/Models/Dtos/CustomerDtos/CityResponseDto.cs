namespace KLTN.Models.Dtos.CustomerDtos
{
    public class CityResponseDto : BaseResponseDto
    {
        public int IdCity { get; set; }

        public string? CityName { get; set; }

        public override object GetId()
        {
            return IdCity;
        }
    }
}
