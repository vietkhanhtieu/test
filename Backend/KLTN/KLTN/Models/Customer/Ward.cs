using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Customer;

public  class Ward : BaseEntity
{
    public int Idward { get; set; }

    public string? Wardname { get; set; }

    public int? Iddicstrict { get; set; }

    public int? Idcity { get; set; }

    [JsonIgnore] public virtual City? IdcityNavigation { get; set; }

    [JsonIgnore] public virtual Dicstrict? IddicstrictNavigation { get; set; }

    [JsonIgnore] public virtual ICollection<User> Users { get; set; } = new List<User>();

    public override object? GetId()
    {
        return Idward;
    }
}
