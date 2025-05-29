import React, { useState } from 'react';
import { placeOrder } from '../api/orders';

function OrderForm() {
  const [form, setForm] = useState({
    studentName: '',
    stall: '',
    item: '',
    quantity: 1
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await placeOrder(form);
      alert("Order placed successfully!");
    } catch (err) {
      alert("Failed to place order.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2 border rounded w-80">
      <input name="studentName" placeholder="Name" onChange={handleChange} required className="border p-2 w-full" />
      <input name="stall" placeholder="Stall (e.g. Juice)" onChange={handleChange} required className="border p-2 w-full" />
      <input name="item" placeholder="Item" onChange={handleChange} required className="border p-2 w-full" />
      <input type="number" name="quantity" placeholder="Qty" min="1" onChange={handleChange} required className="border p-2 w-full" />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">Place Order</button>
    </form>
  );
}

export default OrderForm;