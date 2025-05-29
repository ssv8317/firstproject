using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Models;
using CanteenOrderingAPI.Models;

namespace Services;

public class OrderService
{
    private readonly IMongoCollection<Order> _ordersCollection;

    public OrderService(IOptions<CanteenDatabaseSettings> dbSettings)
    {
        var client = new MongoClient(dbSettings.Value.ConnectionString);
        var database = client.GetDatabase(dbSettings.Value.DatabaseName);
        _ordersCollection = database.GetCollection<Order>(dbSettings.Value.OrdersCollectionName);
    }

    public async Task<List<Order>> GetOrdersAsync() =>
        await _ordersCollection.Find(_ => true).ToListAsync();

    public async Task CreateOrderAsync(Order order) =>
        await _ordersCollection.InsertOneAsync(order);
}