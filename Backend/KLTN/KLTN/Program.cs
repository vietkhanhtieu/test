using KLTN.Infrastructure;
using KLTN.Models;
using KLTN.Services;
using KLTN.Services.CustomerServices.BusinessServices;
using KLTN.Services.CustomerServices.RepositoryServices;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using KLTN.Services.ProductServices.BusinessServices;
using KLTN.Services.ProductServices.RepositoryServices;
using System.Text.Json.Serialization;
using KLTN.Models.Orders;
using KLTN.Services.OrderServices.BusinessServices;
using KLTN.Services.OrderServices.RepositoryServices;

var builder = WebApplication.CreateBuilder(args);
const string CORS_POLICY = "CorsPolicy";
// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(CORS_POLICY, builder =>
    {
        builder.AllowAnyMethod();
        builder.AllowAnyHeader();
        builder.AllowAnyOrigin();
    });
});

builder.Services.AddEntityFrameworkNpgsql()
    .AddDbContext<KltnContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("KltnContext")));


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(Assembly.GetExecutingAssembly());


builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

builder.Services.AddScoped<UserTypeRepository>();
builder.Services.AddScoped<UserTypeServices>();
builder.Services.AddScoped<SalulationRepository>();
builder.Services.AddScoped<SalulationServices>();
builder.Services.AddScoped<CityRepository>();
builder.Services.AddScoped<CityServices>();
builder.Services.AddScoped<DicstrictServices>();
builder.Services.AddScoped<DicstrictRepository>();
builder.Services.AddScoped<WardRepository>();
builder.Services.AddScoped<WardServices>();
builder.Services.AddScoped<SaleUnitServices>();
builder.Services.AddScoped<SaleUnitRepository>();
builder.Services.AddScoped<ImageRepository>();
builder.Services.AddScoped<ImageServices>();
builder.Services.AddScoped<UserServices>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<ProductServices>();
builder.Services.AddScoped<ProductRepository>();
builder.Services.AddScoped<CategoryRepository>();
builder.Services.AddScoped<CategoryServices>();
builder.Services.AddScoped<BussinessProductRepository>();
builder.Services.AddScoped<BussinessProductServices>();
builder.Services.AddScoped<ShippingMethodRepository>();
builder.Services.AddScoped<ShippingMethodServices>();
builder.Services.AddScoped<OrderStatusRepository>();
builder.Services.AddScoped<OrderStatusServices>();
builder.Services.AddScoped<OrderDetailRepository>();
builder.Services.AddScoped<OrderDetailServices>();
builder.Services.AddScoped<OrderRepository>();
builder.Services.AddScoped<OrderServices>();

builder.Services.AddScoped(typeof(BaseRepository<>));
builder.Services.AddScoped(typeof(BaseService<,,>));
builder.Services.AddScoped<UnitOfWork>();


var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(CORS_POLICY);


app.UseAuthorization();

app.MapControllers();

app.Run();
