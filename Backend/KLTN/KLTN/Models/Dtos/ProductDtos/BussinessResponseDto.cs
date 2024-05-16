using KLTN.Models.Customer;
using KLTN.Models.Products;

namespace KLTN.Models.Dtos.ProductDtos
{
    public class BussinessResponseDto : BaseResponseDto
    {
        public int Id { get; set; }

        public int? Userid { get; set; }

        public int? Productid { get; set; }

        public int? Stockquantity { get; set; }

        public int? Saleprice { get; set; }

        public string? Batchcode { get; set; }

        public virtual Product? Product { get; set; }

        public virtual User? User { get; set; }

        public override object GetId()
        {
            return Id;
        }
    }
}
