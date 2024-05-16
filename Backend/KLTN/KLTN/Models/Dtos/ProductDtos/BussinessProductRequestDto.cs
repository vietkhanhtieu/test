namespace KLTN.Models.Dtos.ProductDtos
{
    public class BussinessProductRequestDto : BaseRequestDto
    {
        public int Id { get; set; }

        public int? Userid { get; set; }

        public int? Productid { get; set; }

        public int? Stockquantity { get; set; }

        public int? Saleprice { get; set; }

        public string? Batchcode { get; set; }

        public override object? GetId()
        {
            return Id;
        }
    }
}
