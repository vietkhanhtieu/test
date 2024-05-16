using KLTN.Models.Products;

namespace KLTN.Models.Dtos.ProductDtos
{
    public class ProductResponseDto : BaseResponseDto
    {
        public int Productid { get; set; }

        public string? Productname { get; set; }

        public int? Categories { get; set; }

        public int? Saleprice { get; set; }

        public int? Vat { get; set; }

        public string? Description { get; set; }

        public int? Saleunit { get; set; }

        public virtual Category? CategoriesNavigation { get; set; }

        public virtual ICollection<Productimage> Productimages { get; set; } = new List<Productimage>();

        public virtual Saleunit? SaleunitNavigation { get; set; }

        public override object? GetId()
        {
            return Productid;
        }
    }
}
