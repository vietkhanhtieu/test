namespace KLTN.Models.Dtos.CustomerDtos
{
    public class UserTypeResponseDto : BaseResponseDto
    {
        public int Usertypeid { get; set; }
        public string UserTypeName { get; set; }
        public override object GetId()
        {
            return Usertypeid;
        }
    }
}
