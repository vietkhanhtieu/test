using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Customer;

public class Salulation : BaseEntity
{
    public int Salulationid { get; set; }

    public string? Salulationname { get; set; }

    [JsonIgnore] public virtual ICollection<User> Users { get; set; } = new List<User>();

    public override object GetId()
    {
        return Salulationid;
    }
}
