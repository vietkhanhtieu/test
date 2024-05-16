using System;
using System.Collections.Generic;
using KLTN.Models.Orders;
using KLTN.Models.Products;

namespace KLTN.Models.Customer;

public  class User : BaseEntity
{
    public int Userid { get; set; }

    public string? Phone { get; set; }

    public string? Password { get; set; }

    public string? Emailuser { get; set; }

    public string? Emailbussiness { get; set; }

    public int? Usertype { get; set; }

    public string? Firstname { get; set; }

    public string? Lastname { get; set; }

    public string? Storename { get; set; }

    public int? Salulation { get; set; }

    public int? Iddictrist { get; set; }

    public int? Idward { get; set; }

    public int? Idcity { get; set; }

    public string? Housenumber { get; set; }

    public string? Address { get; set; }

    public string? Identifinumberr1 { get; set; }

    public string? Identifi1Image { get; set; }

    public int? Sellerid { get; set; }

    public virtual ICollection<Bussinessproduct> Bussinessproducts { get; set; } = new List<Bussinessproduct>();

    public virtual City? IdcityNavigation { get; set; }

    public virtual Dicstrict? IddictristNavigation { get; set; }

    public virtual Ward? IdwardNavigation { get; set; }

    public virtual ICollection<Order> OrderCustomers { get; set; } = new List<Order>();

    public virtual ICollection<Order> OrderSellers { get; set; } = new List<Order>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual Salulation? SalulationNavigation { get; set; }

    public virtual Usertype? UsertypeNavigation { get; set; }

    public override object GetId()
    {
        return Userid;
    }
}
