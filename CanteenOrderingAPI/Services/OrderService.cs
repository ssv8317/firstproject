using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Models;

namespace Services;

public class OrderService
{
    private readonly IMongoCollection<Order> _ordersCollection;

    public OrderService(IOptions<CanteenDatabaseSettings> dbSettings)
    {
        var mongoClient = new MongoClient(dbSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(dbSettings.Value.DatabaseName);
        _ordersCollection = mongoDatabase.GetCollection<Order>(dbSettings.Value.OrdersCollectionName);
    }

    public async Task<List<Order>> GetOrdersAsync() =>
        await _ordersCollection.Find(_ => true).SortByDescending(o => o.OrderTime).ToListAsync();

    public async Task<Order> CreateOrderAsync(Order order)
    {
        if (order == null)
        {
            throw new ArgumentNullException(nameof(order));
        }

        await _ordersCollection.InsertOneAsync(order);
        return order;
    }
}