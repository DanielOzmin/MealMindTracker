var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options => options.AddPolicy("AllowFrontend", policy => policy.WithOrigins("http://localhost:5173")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowFrontend");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();

