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
    public async Task<List<Order>> Get() =>
        await _orderService.GetOrdersAsync();

    [HttpPost]
    public async Task<IActionResult> Post(Order order)
    {
        Console.WriteLine("🔔 Received POST from frontend");
        Console.WriteLine($"Student: {order.StudentName}, Item: {order.Item}");

        order.Id = null;
        order.OrderTime = DateTime.UtcNow;
        await _orderService.CreateOrderAsync(order);

        return Ok(order);
    }
}