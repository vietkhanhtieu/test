using System;
using System.Collections.Generic;
using KLTN.Models.Customer;
using KLTN.Models.Orders;

namespace KLTN.Models.Products;

public  class Bussinessproduct : BaseEntity
{
    public int Id { get; set; }

    public int? Userid { get; set; }

    public int? Productid { get; set; }

    public int? Stockquantity { get; set; }

    public int? Saleprice { get; set; }

    public string? Batchcode { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual Product? Product { get; set; }

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual User? User { get; set; }

    public override object GetId()
    {
        return Id;
    }
}
