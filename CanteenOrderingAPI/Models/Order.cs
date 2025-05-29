using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Models;

public class Order
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("studentName")]
    public string StudentName { get; set; } = string.Empty;

    [BsonElement("stall")]
    public string Stall { get; set; } = string.Empty;

    [BsonElement("item")]
    public string Item { get; set; } = string.Empty;

    [BsonElement("quantity")]
    public int Quantity { get; set; }

    [BsonElement("orderTime")]
    public DateTime OrderTime { get; set; }
}