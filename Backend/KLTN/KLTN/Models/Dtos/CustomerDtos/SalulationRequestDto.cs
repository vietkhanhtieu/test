namespace KLTN.Models.Dtos.CustomerDtos
{
    public class SalulationRequestDto : BaseRequestDto
    {
        public int Salulationid { get; set; }

        public string? Salulationname { get; set; }

        public override object GetId()
        {
            return Salulationid;
        }
    }
}
