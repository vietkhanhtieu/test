using KLTN.Models.Products;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace KLTN.Models.Products;

public  class Product : BaseEntity
{
    public int Productid { get; set; }

    public string? Productname { get; set; }

    public int? Categories { get; set; }

    public int? Saleprice { get; set; }

    public int? Vat { get; set; }

    public string? Description { get; set; }

    public int? Saleunit { get; set; }

    [JsonIgnore]public virtual ICollection<Bussinessproduct> Bussinessproducts { get; set; } = new List<Bussinessproduct>();

    public virtual Category? CategoriesNavigation { get; set; }

    public virtual ICollection<Productimage> Productimages { get; set; } = new List<Productimage>();

    public virtual Saleunit? SaleunitNavigation { get; set; }

    public override object? GetId()
    {
        return Productid;
    }
}
