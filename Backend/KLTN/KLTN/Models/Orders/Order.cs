using System;
using System.Collections.Generic;
using KLTN.Models.Customer;

namespace KLTN.Models.Orders
{
    public class Order : BaseEntity
    {
        public string Orderid { get; set; }

        public string? Orderrootid { get; set; }

        public DateTime? Orderdate { get; set; }

        public int? Customerid { get; set; }

        public int? Status { get; set; }

        public int? Idshippingward { get; set; }

        public int? Idshippingdicstrict { get; set; }

        public int? Idshippingcity { get; set; }

        public string? Shippingaddress { get; set; }

        public DateTime? Estimatedeliverytime { get; set; }

        public int? Shippingfee { get; set; }

        public int? Totalamount { get; set; }

        public int? Finalamount { get; set; }

        public int? Shippingfeediscount { get; set; }

        public int? Shippingmethod { get; set; }

        public int? Sellerid { get; set; }

        public virtual User? Customer { get; set; }

        public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

        public virtual User? Seller { get; set; }

        public virtual Shippingmethod? ShippingmethodNavigation { get; set; }

        public virtual Orderstatus? StatusNavigation { get; set; }

        public override object GetId()
        {
            return Orderid;
        }
    }

}
