using System.Text.Json.Serialization;

namespace KLTN.Models.Dtos.ProductDtos
{
    public class CategoriesRequestDto : BaseRequestDto
    {
        [JsonPropertyName("categoryId")] public int Categoriesid { get; set; }

        [JsonPropertyName("categoryName")] public string? Categoriname { get; set; }
        public override object GetId()
        {
            return Equals(Categoriesid);
        }
    }
}
