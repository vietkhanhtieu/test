namespace KLTN.Models.Dtos
{
    public class RestAPIResponseDto
    {
        public string Message { get; set; }
        public bool Success { get; set; }
        public object Data { get; set; }
    }
}
