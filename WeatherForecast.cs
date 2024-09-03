using Microsoft.EntityFrameworkCore;

public class WeatherContext : DbContext
{
    public DbSet<WeatherForecast> Forecasts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(@"Host=localhost:5432;Username=postgres;Password=404681;Database=weather");
}

public class WeatherForecast
{
    public int Id { get; set; }
    public DateTime Date { get; set; }

    public int TemperatureC { get; set; }

    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

    public string? Summary { get; set; }
}
