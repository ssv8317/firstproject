import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { getOrders, Order } from '../api/order';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const activeOrders = orders.filter(order =>
    order.status === 'pending' || order.status === 'preparing' || order.status === 'ready'
  );

  const completedOrders = orders.filter(order => order.status === 'completed');

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: <Clock size={16} className="mr-1" /> };
      case 'preparing':
        return { label: 'Preparing', color: 'bg-blue-100 text-blue-800', icon: <Clock size={16} className="mr-1" /> };
      case 'ready':
        return { label: 'Ready for Pickup', color: 'bg-green-100 text-green-800', icon: <CheckCircle size={16} className="mr-1" /> };
      case 'completed':
        return { label: 'Completed', color: 'bg-gray-100 text-gray-800', icon: <CheckCircle size={16} className="mr-1" /> };
      default:
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: <AlertTriangle size={16} className="mr-1" /> };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="text-center py-20">Loading orders...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h1>
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'active' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('active')}
        >
          Active Orders
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm focus:outline-none ${
            activeTab === 'completed' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Order History
        </button>
      </div>

      <div className="space-y-6">
        {(activeTab === 'active' ? activeOrders : completedOrders).map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <h2 className="text-lg font-semibold">{order.stall}</h2>
                <p className="text-sm text-gray-500">#{order.id} • {formatDate(order.orderTime)}</p>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusLabel(order.status).color}`}>
                {getStatusLabel(order.status).icon}
                {getStatusLabel(order.status).label}
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {order.items.map(item => (
                <div key={item.id}>{item.quantity}x {item.name}</div>
              ))}
            </div>
            <div className="mt-2 font-bold">₹{order.total.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
