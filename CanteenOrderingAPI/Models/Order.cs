using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CanteenOrderingAPI.Models;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string StudentName { get; set; } = string.Empty;
    public string Stall { get; set; } = string.Empty;
    public string Item { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public DateTime OrderTime { get; set; }
}