using System.Text.Json.Serialization;

namespace KLTN.Models.Dtos.CustomerDtos
{
    public class UserRequestDto : BaseRequestDto
    {
        public int Userid { get; set; }

        [JsonPropertyName("phone")]public string? Phone { get; set; }

        [JsonPropertyName("password")] public string? Password { get; set; }

        [JsonPropertyName("emailUser")] public string? Emailuser { get; set; }

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

        public override object? GetId()
        {
            return Userid;
        }
    }
}
