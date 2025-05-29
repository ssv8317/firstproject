import React, { useState } from 'react';
import { placeOrder } from '../api/order';

function OrderForm() {
  const [form, setForm] = useState({
    studentName: '',
    stall: '',
    item: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await placeOrder(form);
      setSuccess(true);
      setForm({
        studentName: '',
        stall: '',
        item: '',
        quantity: 1
      });
    } catch (err) {
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 bg-white rounded-lg shadow-md w-full max-w-md">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md">
          Order placed successfully!
        </div>
      )}

      <div>
        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name
        </label>
        <input
          id="studentName"
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="stall" className="block text-sm font-medium text-gray-700 mb-1">
          Stall Name
        </label>
        <input
          id="stall"
          name="stall"
          value={form.stall}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="item" className="block text-sm font-medium text-gray-700 mb-1">
          Item Name
        </label>
        <input
          id="item"
          name="item"
          value={form.item}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 disabled:opacity-50"
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
}

export default OrderForm;