namespace KLTN.Models.Dtos.CustomerDtos
{
    public class DicstrictRequestDto : BaseRequestDto
    {
        public int Iddictrist { get; set; }

        public string? Dictristname { get; set; }

        public int? Idcity { get; set; }

        public override object? GetId()
        {
            return Iddictrist;
        }
    }
}
