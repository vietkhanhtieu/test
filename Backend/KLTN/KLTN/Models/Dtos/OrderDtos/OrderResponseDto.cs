using KLTN.Models.Orders;

namespace KLTN.Models.Dtos.OrderDtos
{
    public class OrderResponseDto : BaseResponseDto
    {
        public string Orderid { get; set; }

        public string? Orderrootid { get; set; }

        public DateTime? Orderdate { get; set; }

        public int? Customerid { get; set; }

        public int? Status { get; set; }

        public int? Idshippingward { get; set; }

        public int? Idshippingdicstrict { get; set; }

        public int? Idshippingcity { get; set; }

        public string? Shippingaddress { get; set; }

        public DateTime? Estimatedeliverytime { get; set; }

        public int? Shippingfee { get; set; }

        public int? Totalamount { get; set; }

        public int? Finalamount { get; set; }

        public int? Shippingfeediscount { get; set; }

        public int? Shippingmethod { get; set; }

        public int? Sellerid { get; set; }

        public virtual ICollection<OrderDetailResponseDto> OrderDetailResponseDto { get; set; } = new List<OrderDetailResponseDto>();


        public override object? GetId()
        {
            return Orderid;
        }
    }
}
