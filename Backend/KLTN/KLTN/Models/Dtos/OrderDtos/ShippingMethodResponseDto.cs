using System.Text.Json.Serialization;

namespace KLTN.Models.Dtos.OrderDtos
{
    public class ShippingMethodResponseDto : BaseResponseDto
    {

        public int Id { get; set; }
        [JsonPropertyName("shipping_method")] public string? Shippingmethod1 { get; set; }

        public override object GetId()
        {
            return Id;
        }
    }
}
