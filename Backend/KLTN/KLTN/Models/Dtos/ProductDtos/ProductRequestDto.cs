namespace KLTN.Models.Dtos.ProductDtos
{
    public class ProductRequestDto : BaseRequestDto
    {
        public int Productid { get; set; }

        public string? Productname { get; set; }

        public int? Categories { get; set; }

        public int? Saleprice { get; set; }

        public int? Vat { get; set; }

        public string? Description { get; set; }

        public int? Saleunit { get; set; }

        public override object? GetId()
        {
            return Productid;
        }
    }
}
