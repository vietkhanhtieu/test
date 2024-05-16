using System;
using System.Collections.Generic;
using KLTN.Models.Products;

namespace KLTN.Models.Orders;

public  class Orderdetail : BaseEntity
{
    public int Id { get; set; }

    public string Orderid { get; set; }

    public int Productid { get; set; }

    public int? Quantity { get; set; }

    public int? Price { get; set; }

    public virtual Order? Order { get; set; }

    public virtual Bussinessproduct? Product { get; set; }

    public override object GetId()
    {
        return Id;
    }
}
