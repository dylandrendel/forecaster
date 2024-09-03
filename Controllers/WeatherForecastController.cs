using Microsoft.AspNetCore.Mvc;
using dotnet.Services;

namespace dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{


    private readonly ILogger<WeatherForecastController> _logger;

    private readonly WeatherForecastService _weather;

    public WeatherForecastController(ILogger<WeatherForecastController> logger, WeatherForecastService weather)
    {
        _logger = logger;
        _weather = weather;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var forecasts = await _weather.GetForecasts();

        return Ok(forecasts);
    }

    [HttpGet("filtered")]
    public async Task<IActionResult> GetFiltered([FromQuery] string? temp, [FromQuery] string? summary)
    {
        var forecasts = await _weather.GetForecastsFiltered(temp, summary);
        return Ok(forecasts);
    }
}
