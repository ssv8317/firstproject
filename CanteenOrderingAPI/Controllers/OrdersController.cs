using Microsoft.AspNetCore.Mvc;
using CanteenOrderingAPI.Models;
using Services;

namespace Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly OrderService _orderService;

    public OrdersController(OrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> Get()
    {
        try
        {
            var orders = await _orderService.GetOrdersAsync();
            return Ok(orders);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Order>> Post(Order order)
    {
        try
        {
            order.Id = null;
            order.OrderTime = DateTime.UtcNow;
            var result = await _orderService.CreateOrderAsync(order);
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}