using KLTN.Models.Orders;
using KLTN.Models.Products;

namespace KLTN.Models.Dtos.OrderDtos
{
    public class OrderDetailRequestDto : BaseRequestDto
    {
        public int Id { get; set; }

        public int Orderid { get; set; }

        public int Productid { get; set; }

        public int? Quantity { get; set; }

        public int? Price { get; set; }

        public override object GetId()
        {
            return Id;
        }
    }
}
