using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Customer;

public  class Usertype : BaseEntity
{
    public int Usertypeid { get; set; }

    public string? Usertypename { get; set; }

    [JsonIgnore]public virtual ICollection<User> Users { get; set; } = new List<User>();

    public override object GetId()
    {
        return Usertypeid;
    }
}
