using System;
using System.Collections.Generic;

namespace KLTN.Models.Orders;

public  class Orderstatus : BaseEntity
{
    public int Statusid { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public override object GetId()
    {
        return Statusid;
    }
}
