using KLTN.Models.Customer;
using KLTN.Models.Products;

namespace KLTN.Models.Dtos.OrderDtos
{
    public class RatingRequestDto : BaseRequestDto
    {
        public int Ratingid { get; set; }

        public int? Productid { get; set; }

        public int? Ratingproduct { get; set; }

        public int? Sellerid { get; set; }

        public int? Ratingseller { get; set; }

        public string? Comment { get; set; }

        public string? Image { get; set; }

        public DateOnly? Ratingdate { get; set; }

        public override object GetId()
        {
            return Ratingid;
        }
    }
}
