namespace KLTN.Models.Dtos.OrderDtos
{
    public class OrderDetailResponseDto : BaseResponseDto
    {
        public int Id { get; set; }

        public string? Orderid { get; set; }

        public int? Productid { get; set; }

        public int? Quantity { get; set; }

        public int? Price { get; set; }
        public string? ProductName { get; set; }

        public override object GetId()
        {
            return Id;
        }
    }
}
