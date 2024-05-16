using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Customer;

public  class Dicstrict : BaseEntity
{
    public int Iddictrist { get; set; }

    public string? Dictristname { get; set; }

    public int? Idcity { get; set; }

    [JsonIgnore] public virtual City? IdcityNavigation { get; set; }

    [JsonIgnore] public virtual ICollection<User> Users { get; set; } = new List<User>();

    [JsonIgnore] public virtual ICollection<Ward> Wards { get; set; } = new List<Ward>();

    public override object? GetId()
    {
        return Iddictrist;
    }
}
