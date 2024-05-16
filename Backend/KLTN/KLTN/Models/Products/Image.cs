using System;
using System.Collections.Generic;

namespace KLTN.Models.Products;

public  class Image : BaseEntity
{
    public int Imageid { get; set; }

    public string? Url { get; set; }

    public virtual ICollection<Productimage> Productimages { get; set; } = new List<Productimage>();

    public override object GetId()
    {
        return Imageid;
    }
}
