using System;
using System.Collections.Generic;
using KLTN.Models.Customer;
using KLTN.Models.Orders;
using KLTN.Models.Products;
using Microsoft.EntityFrameworkCore;

namespace KLTN.Models;

public partial class KltnContext : DbContext
{
    public KltnContext()
    {
    }

    public KltnContext(DbContextOptions<KltnContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Bussinessproduct> Bussinessproducts { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Dicstrict> Dicstricts { get; set; }

    public virtual DbSet<Image> Images { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderdetail> Orderdetails { get; set; }

    public virtual DbSet<Orderstatus> Orderstatuses { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<Productimage> Productimages { get; set; }

    public virtual DbSet<Rating> Ratings { get; set; }

    public virtual DbSet<Saleunit> Saleunits { get; set; }

    public virtual DbSet<Salulation> Salulations { get; set; }

    public virtual DbSet<Shippingmethod> Shippingmethods { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Usertype> Usertypes { get; set; }

    public virtual DbSet<Ward> Wards { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Bussinessproduct>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("bussinessproduct_pkey");

            entity.ToTable("bussinessproduct", "product");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Batchcode)
                .HasMaxLength(255)
                .HasColumnName("batchcode");
            entity.Property(e => e.Productid).HasColumnName("productid");
            entity.Property(e => e.Saleprice).HasColumnName("saleprice");
            entity.Property(e => e.Stockquantity).HasColumnName("stockquantity");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.Product).WithMany(p => p.Bussinessproducts)
                .HasForeignKey(d => d.Productid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("bussinessproduct_productid_fkey");

            entity.HasOne(d => d.User).WithMany(p => p.Bussinessproducts)
                .HasForeignKey(d => d.Userid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("bussinessproduct_userid_fkey");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.Categoriesid).HasName("categories_pkey");

            entity.ToTable("categories", "product");

            entity.Property(e => e.Categoriesid).HasColumnName("categoriesid");
            entity.Property(e => e.Categoriname)
                .HasMaxLength(255)
                .HasColumnName("categoriname");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Idcity).HasName("city_pkey");

            entity.ToTable("city", "user");

            entity.Property(e => e.Idcity).HasColumnName("idcity");
            entity.Property(e => e.Cityname)
                .HasMaxLength(255)
                .HasColumnName("cityname");
        });

        modelBuilder.Entity<Dicstrict>(entity =>
        {
            entity.HasKey(e => e.Iddictrist).HasName("dicstrict_pkey");

            entity.ToTable("dicstrict", "user");

            entity.Property(e => e.Iddictrist).HasColumnName("iddictrist");
            entity.Property(e => e.Dictristname)
                .HasMaxLength(255)
                .HasColumnName("dictristname");
            entity.Property(e => e.Idcity).HasColumnName("idcity");

            entity.HasOne(d => d.IdcityNavigation).WithMany(p => p.Dicstricts)
                .HasForeignKey(d => d.Idcity)
                .HasConstraintName("dicstrict_idcity_fkey");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.HasKey(e => e.Imageid).HasName("image_pkey");

            entity.ToTable("image", "product");

            entity.Property(e => e.Imageid).HasColumnName("imageid");
            entity.Property(e => e.Url)
                .HasMaxLength(255)
                .HasColumnName("url");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Orderid).HasName("order_pkey");

            entity.ToTable("order", "order");

            entity.Property(e => e.Orderid)
                .HasMaxLength(20)
                .HasColumnName("orderid");
            entity.Property(e => e.Customerid).HasColumnName("customerid");
            entity.Property(e => e.Estimatedeliverytime)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("estimatedeliverytime");
            entity.Property(e => e.Finalamount).HasColumnName("finalamount");
            entity.Property(e => e.Idshippingcity).HasColumnName("idshippingcity");
            entity.Property(e => e.Idshippingdicstrict).HasColumnName("idshippingdicstrict");
            entity.Property(e => e.Idshippingward).HasColumnName("idshippingward");
            entity.Property(e => e.Orderdate)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("orderdate");
            entity.Property(e => e.Orderrootid)
                .HasMaxLength(20)
                .HasColumnName("orderrootid");
            entity.Property(e => e.Sellerid).HasColumnName("sellerid");
            entity.Property(e => e.Shippingaddress)
                .HasMaxLength(255)
                .HasColumnName("shippingaddress");
            entity.Property(e => e.Shippingfee).HasColumnName("shippingfee");
            entity.Property(e => e.Shippingfeediscount).HasColumnName("shippingfeediscount");
            entity.Property(e => e.Shippingmethod).HasColumnName("shippingmethod");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Totalamount).HasColumnName("totalamount");

            entity.HasOne(d => d.Customer).WithMany(p => p.OrderCustomers)
                .HasForeignKey(d => d.Customerid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("order_customerid_fkey");

            entity.HasOne(d => d.Seller).WithMany(p => p.OrderSellers)
                .HasForeignKey(d => d.Sellerid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("order_sellerid_fkey");

            entity.HasOne(d => d.ShippingmethodNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Shippingmethod)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("order_shippingmethod_fkey");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.Status)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("order_status_fkey");
        });

        modelBuilder.Entity<Orderdetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orderdetail_pkey");

            entity.ToTable("orderdetail", "order");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Orderid)
                .HasMaxLength(20)
                .HasColumnName("orderid");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Productid).HasColumnName("productid");
            entity.Property(e => e.Quantity).HasColumnName("quantity");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.Orderid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("orderdetail_orderid_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.Productid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("orderdetail_productid_fkey");
        });

        modelBuilder.Entity<Orderstatus>(entity =>
        {
            entity.HasKey(e => e.Statusid).HasName("orderstatus_pkey");

            entity.ToTable("orderstatus", "order");

            entity.Property(e => e.Statusid).HasColumnName("statusid");
            entity.Property(e => e.Status)
                .HasMaxLength(255)
                .HasColumnName("status");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.Productid).HasName("product_pkey");

            entity.ToTable("product", "product");

            entity.Property(e => e.Productid).HasColumnName("productid");
            entity.Property(e => e.Categories).HasColumnName("categories");
            entity.Property(e => e.Description)
                .HasMaxLength(255)
                .HasColumnName("description");
            entity.Property(e => e.Productname)
                .HasMaxLength(255)
                .HasColumnName("productname");
            entity.Property(e => e.Saleprice).HasColumnName("saleprice");
            entity.Property(e => e.Saleunit).HasColumnName("saleunit");
            entity.Property(e => e.Vat).HasColumnName("vat");

            entity.HasOne(d => d.CategoriesNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.Categories)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("product_categories_fkey");

            entity.HasOne(d => d.SaleunitNavigation).WithMany(p => p.Products)
                .HasForeignKey(d => d.Saleunit)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("product_saleunit_fkey");
        });

        modelBuilder.Entity<Productimage>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("productimage_pkey");

            entity.ToTable("productimage", "product");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Imageid).HasColumnName("imageid");
            entity.Property(e => e.Productid).HasColumnName("productid");

            entity.HasOne(d => d.Image).WithMany(p => p.Productimages)
                .HasForeignKey(d => d.Imageid)
                .HasConstraintName("productimage_imageid_fkey");

            entity.HasOne(d => d.Product).WithMany(p => p.Productimages)
                .HasForeignKey(d => d.Productid)
                .HasConstraintName("productimage_productid_fkey");
        });

        modelBuilder.Entity<Rating>(entity =>
        {
            entity.HasKey(e => e.Ratingid).HasName("rating_pkey");

            entity.ToTable("rating", "order");

            entity.Property(e => e.Ratingid).HasColumnName("ratingid");
            entity.Property(e => e.Comment)
                .HasMaxLength(255)
                .HasColumnName("comment");
            entity.Property(e => e.Image)
                .HasMaxLength(255)
                .HasColumnName("image");
            entity.Property(e => e.Productid).HasColumnName("productid");
            entity.Property(e => e.Ratingdate).HasColumnName("ratingdate");
            entity.Property(e => e.Ratingproduct).HasColumnName("ratingproduct");
            entity.Property(e => e.Ratingseller).HasColumnName("ratingseller");
            entity.Property(e => e.Sellerid).HasColumnName("sellerid");

            entity.HasOne(d => d.Product).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.Productid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("rating_productid_fkey");

            entity.HasOne(d => d.Seller).WithMany(p => p.Ratings)
                .HasForeignKey(d => d.Sellerid)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("rating_sellerid_fkey");
        });

        modelBuilder.Entity<Saleunit>(entity =>
        {
            entity.HasKey(e => e.Saleunitid).HasName("saleunit_pkey");

            entity.ToTable("saleunit", "product");

            entity.Property(e => e.Saleunitid).HasColumnName("saleunitid");
            entity.Property(e => e.Saleunit1)
                .HasMaxLength(255)
                .HasColumnName("saleunit");
        });

        modelBuilder.Entity<Salulation>(entity =>
        {
            entity.HasKey(e => e.Salulationid).HasName("salulation_pkey");

            entity.ToTable("salulation", "user");

            entity.Property(e => e.Salulationid).HasColumnName("salulationid");
            entity.Property(e => e.Salulationname)
                .HasMaxLength(255)
                .HasColumnName("salulationname");
        });

        modelBuilder.Entity<Shippingmethod>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("shippingmethod_pkey");

            entity.ToTable("shippingmethod", "order");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Shippingmethod1)
                .HasMaxLength(255)
                .HasColumnName("shippingmethod");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("user_pkey");

            entity.ToTable("user", "user");

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Emailbussiness)
                .HasMaxLength(255)
                .HasColumnName("emailbussiness");
            entity.Property(e => e.Emailuser)
                .HasMaxLength(255)
                .HasColumnName("emailuser");
            entity.Property(e => e.Firstname)
                .HasMaxLength(255)
                .HasColumnName("firstname");
            entity.Property(e => e.Housenumber)
                .HasMaxLength(255)
                .HasColumnName("housenumber");
            entity.Property(e => e.Idcity).HasColumnName("idcity");
            entity.Property(e => e.Iddictrist).HasColumnName("iddictrist");
            entity.Property(e => e.Identifi1Image)
                .HasMaxLength(255)
                .HasColumnName("identifi_1_image");
            entity.Property(e => e.Identifinumberr1)
                .HasMaxLength(255)
                .HasColumnName("identifinumberr_1");
            entity.Property(e => e.Idward).HasColumnName("idward");
            entity.Property(e => e.Lastname)
                .HasMaxLength(255)
                .HasColumnName("lastname");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.Salulation).HasColumnName("salulation");
            entity.Property(e => e.Sellerid).HasColumnName("sellerid");
            entity.Property(e => e.Storename)
                .HasMaxLength(255)
                .HasColumnName("storename");
            entity.Property(e => e.Usertype).HasColumnName("usertype");

            entity.HasOne(d => d.IdcityNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Idcity)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("user_idcity_fkey");

            entity.HasOne(d => d.IddictristNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Iddictrist)
                .HasConstraintName("user_iddictrist_fkey");

            entity.HasOne(d => d.IdwardNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Idward)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("user_idward_fkey");

            entity.HasOne(d => d.SalulationNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Salulation)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("user_salulation_fkey");

            entity.HasOne(d => d.UsertypeNavigation).WithMany(p => p.Users)
                .HasForeignKey(d => d.Usertype)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("user_usertype_fkey");
        });

        modelBuilder.Entity<Usertype>(entity =>
        {
            entity.HasKey(e => e.Usertypeid).HasName("usertype_pkey");

            entity.ToTable("usertype", "user");

            entity.Property(e => e.Usertypeid).HasColumnName("usertypeid");
            entity.Property(e => e.Usertypename)
                .HasMaxLength(255)
                .HasColumnName("usertypename");
        });

        modelBuilder.Entity<Ward>(entity =>
        {
            entity.HasKey(e => e.Idward).HasName("ward_pkey");

            entity.ToTable("ward", "user");

            entity.Property(e => e.Idward).HasColumnName("idward");
            entity.Property(e => e.Idcity).HasColumnName("idcity");
            entity.Property(e => e.Iddicstrict).HasColumnName("iddicstrict");
            entity.Property(e => e.Wardname)
                .HasMaxLength(255)
                .HasColumnName("wardname");

            entity.HasOne(d => d.IdcityNavigation).WithMany(p => p.Wards)
                .HasForeignKey(d => d.Idcity)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("ward_idcity_fkey");

            entity.HasOne(d => d.IddicstrictNavigation).WithMany(p => p.Wards)
                .HasForeignKey(d => d.Iddicstrict)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("ward_iddicstrict_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
