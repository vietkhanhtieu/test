namespace KLTN.Models.Dtos.CustomerDtos
{
    public class CityRequestDto : BaseRequestDto
    {
        public int IdCity { get; set; }

        public string? CityName { get; set; }

        public override object GetId()
        {
            return IdCity;
        }
    }
}
