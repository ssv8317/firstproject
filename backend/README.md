# Canteen Ordering System Backend

This is the backend API for the Canteen Ordering System built with .NET 8 and MongoDB.

## Prerequisites

- .NET 8 SDK
- MongoDB (running on localhost:27017)

## Setup

1. Clone the repository
2. Navigate to the backend directory
3. Run the following commands:

```bash
dotnet restore
dotnet run --project CanteenOrderingAPI/CanteenOrderingAPI.csproj
```

The API will be available at:
- HTTP: http://localhost:5097
- HTTPS: https://localhost:7100
- Swagger UI: http://localhost:5097/swagger

## API Endpoints

- GET /api/orders - Get all orders
- POST /api/orders - Create a new order