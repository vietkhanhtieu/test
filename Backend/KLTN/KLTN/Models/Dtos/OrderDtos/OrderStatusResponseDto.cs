using KLTN.Models.Orders;

namespace KLTN.Models.Dtos.OrderDtos
{
    public class OrderStatusResponseDto : BaseResponseDto
    {
        public int Statusid { get; set; }

        public string? Status { get; set; }

        public override object GetId()
        {
            return Statusid;
        }
    }
}
