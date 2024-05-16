using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Products;

public  class Saleunit : BaseEntity
{
    public int Saleunitid { get; set; }

    public string? Saleunit1 { get; set; }

    [JsonIgnore] public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public override object GetId()
    {
        throw new NotImplementedException();
    }
}
