using System.Text.Json.Serialization;

namespace KLTN.Models.Dtos.ProductDtos
{
    public class SaleUnitRequestDto : BaseRequestDto
    {
        [JsonPropertyName("saleUnitId")] public int Saleunitid { get; set; }


        [JsonPropertyName("saleUnit")] public string? Saleunit1 { get; set; }

        public override object GetId()
        {
            return Saleunitid;
        }
    }
}
