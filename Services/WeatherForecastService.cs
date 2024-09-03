using Microsoft.EntityFrameworkCore;

namespace dotnet.Services;
public class WeatherForecastService
{

  private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

  public string GetForecast()
  {
    return "Weather forecast";
  }

  public async void AddForecasts()
  {
    await using var ctx = new WeatherContext();
    await ctx.Database.EnsureDeletedAsync();
    await ctx.Database.EnsureCreatedAsync();

    // Insert a Forecast
    ctx.Forecasts.Add(new() { Date = new DateTime(), Summary = "Freezing", TemperatureC = 0 });
    await ctx.SaveChangesAsync();

    // // Query all forecasts who's name starts with F
    // var fBlogs = await ctx.Forecasts.Where(b => b.Summary.StartsWith("F")).ToListAsync();
  }

  public async Task SeedDb(WeatherContext ctx)
  {
    await ctx.Database.EnsureDeletedAsync();
    await ctx.Database.EnsureCreatedAsync();
    var numbers = Enumerable.Range(1, 100);
    foreach (var number in numbers)
    {
      ctx.Forecasts.Add(new()
      {
        Date = DateTime.Now.AddDays(number).ToUniversalTime(),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
      });
    }
    await ctx.SaveChangesAsync();
  }

  public async Task<List<WeatherForecast>> GetForecasts()
  {
    await using var ctx = new WeatherContext();
    var forecasts = await ctx.Forecasts.ToListAsync();
    if (forecasts.Count == 0)
    {
      await SeedDb(ctx);
      return await ctx.Forecasts.ToListAsync();
    }
    else
    {
      return forecasts;
    }
  }

  public async Task<List<WeatherForecast>> GetForecastsFiltered(string? temp, string? summary)
  {
    await using var ctx = new WeatherContext();
    return await ctx.Forecasts
      .Where(f => temp != null ? f.TemperatureC > int.Parse(temp) : true)
      .Where(f => summary != null ? f.Summary == summary : true)
      .ToListAsync();
  }
}
