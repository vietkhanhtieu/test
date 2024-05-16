using KLTN.Models.Customer;
using KLTN.Models.Orders;
using KLTN.Models.Products;
using System.Text.Json.Serialization;

namespace KLTN.Models.Dtos.CustomerDtos
{
    public class UserResponseDto : BaseResponseDto
    {
        public int Userid { get; set; }

        [JsonPropertyName("phone")] public string? Phone { get; set; }

        [JsonPropertyName("password")] public string? Password { get; set; }

        [JsonPropertyName("email")] public string? Emailuser { get; set; }

        [JsonPropertyName("emailBussiness")] public string? Emailbussiness { get; set; }

        [JsonPropertyName("userType")] public int? Usertype { get; set; }

        [JsonPropertyName("firstName")] public string? Firstname { get; set; }

        [JsonPropertyName("lastName")] public string? Lastname { get; set; }

        [JsonPropertyName("storeName")] public string? Storename { get; set; }

        [JsonPropertyName("salulation")] public int? Salulation { get; set; }

        [JsonPropertyName("idDictrist")] public int? Iddictrist { get; set; }

        [JsonPropertyName("idWard")] public int? Idward { get; set; }

        [JsonPropertyName("idCity")] public int? Idcity { get; set; }

        [JsonPropertyName("houseNumber")] public string? Housenumber { get; set; }

        [JsonPropertyName("address")] public string? Address { get; set; }

        [JsonPropertyName("identifiNumber1")] public string? Identifinumberr1 { get; set; }

        [JsonPropertyName("identifi1Image")] public string? Identifi1Image { get; set; }

        [JsonPropertyName("sellerId")] public int? Sellerid { get; set; }

        public virtual ICollection<Bussinessproduct> Bussinessproducts { get; set; } = new List<Bussinessproduct>();

        public virtual City? IdcityNavigation { get; set; }

        public virtual Dicstrict? IddictristNavigation { get; set; }

        public virtual Ward? IdwardNavigation { get; set; }

        public virtual ICollection<Order> OrderCustomers { get; set; } = new List<Order>();

        public virtual ICollection<Order> OrderSellers { get; set; } = new List<Order>();

        public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

        public virtual Salulation? SalulationNavigation { get; set; }

        public virtual Usertype? UsertypeNavigation { get; set; }

        public override object? GetId()
        {
            return Userid;
        }
    }
}
