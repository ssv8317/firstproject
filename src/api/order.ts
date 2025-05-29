import axios from 'axios';

const API_URL = 'http://localhost:5097/api/orders'; // ✅ Use HTTP, NOT HTTPS

export const getOrders = async () => {
  try {
    return await axios.get(API_URL);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    throw error;
  }
};

export const placeOrder = async (order: any) => {
  try {
    return await axios.post(API_URL, order);
  } catch (error) {
    console.error("❌ Failed to place order:", error);
    throw error;
  }
};