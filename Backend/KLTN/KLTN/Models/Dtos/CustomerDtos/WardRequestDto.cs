namespace KLTN.Models.Dtos.CustomerDtos
{
    public class WardRequestDto : BaseRequestDto
    {
        public int Idward { get; set; }

        public string? Wardname { get; set; }

        public int? Iddicstrict { get; set; }

        public int? Idcity { get; set; }


        public override object? GetId()
        {
            return Idward;
        }
    }
}
