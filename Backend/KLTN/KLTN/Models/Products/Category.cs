using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Products;

public  class Category : BaseEntity
{
    public int Categoriesid { get; set; }

    public string? Categoriname { get; set; }

    [JsonIgnore]public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public override object GetId()
    {
        return Categoriesid;
    }
}
