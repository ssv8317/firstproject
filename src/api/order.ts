import axios from 'axios';

const API_URL = 'http://localhost:5097/api/orders'; // ✅ Use HTTP, NOT HTTPS

export interface Order {
  id: string;
  studentName: string;
  stall: string;
  item: string;
  quantity: number;
  orderTime: string;
}

export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    throw error;
  }
};

export const placeOrder = async (order: Partial<Order>) => {
  try {
    const response = await axios.post(API_URL, order);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to place order:", error);
    throw error;
  }
};