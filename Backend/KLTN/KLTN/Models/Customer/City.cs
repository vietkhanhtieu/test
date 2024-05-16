using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Customer;

public  class City : BaseEntity
{
    public int Idcity { get; set; }

    public string? Cityname { get; set; }

    [JsonIgnore]public virtual ICollection<Dicstrict> Dicstricts { get; set; } = new List<Dicstrict>();

    [JsonIgnore] public virtual ICollection<User> Users { get; set; } = new List<User>();

    [JsonIgnore] public virtual ICollection<Ward> Wards { get; set; } = new List<Ward>();

    public override object GetId()
    {
        return Idcity;
    }
}
