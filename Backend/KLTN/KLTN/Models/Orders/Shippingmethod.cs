using System;
using System.Collections.Generic;

namespace KLTN.Models.Orders;

public  class Shippingmethod : BaseEntity
{
    public int Id { get; set; }

    public string? Shippingmethod1 { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public override object GetId()
    {
        return Id;
    }
}
