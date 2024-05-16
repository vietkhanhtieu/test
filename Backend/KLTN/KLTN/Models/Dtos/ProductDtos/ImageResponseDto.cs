namespace KLTN.Models.Dtos.ProductDtos
{
    public class ImageResponseDto : BaseResponseDto
    {
        public int Imageid { get; set; }

        public string? Url { get; set; }

        public override object GetId()
        {
            return Imageid;
        }
    }
}
