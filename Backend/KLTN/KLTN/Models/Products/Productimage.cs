﻿using System;
using System.Collections.Generic;

namespace KLTN.Models.Products;

public  class Productimage
{
    public int Id { get; set; }

    public int? Productid { get; set; }

    public int? Imageid { get; set; }

    public virtual Image? Image { get; set; }

    public virtual Product? Product { get; set; }
}
