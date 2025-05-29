import React, { useState } from 'react';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data for orders
const mockOrders = [
  {
    id: '1005',
    customer: 'Rahul Sharma',
    date: '2023-09-16T18:45:00',
    status: 'pending',
    total: 250,
    stall: 'Frankie Corner',
    pickupTime: '7:30 PM',
    items: [
      { id: '101', name: 'Paneer Frankie', quantity: 2, price: 80 },
      { id: '102', name: 'Chicken Frankie', quantity: 1, price: 90 }
    ]
  },
  {
    id: '1004',
    customer: 'Priya Patel',
    date: '2023-09-16T18:30:00',
    status: 'preparing',
    total: 150,
    stall: 'Biryani Point',
    pickupTime: '7:15 PM',
    items: [
      { id: '401', name: 'Chicken Biryani', quantity: 1, price: 150 }
    ]
  },
  {
    id: '1003',
    customer: 'Amit Kumar',
    date: '2023-09-16T17:45:00',
    status: 'ready',
    total: 190,
    stall: 'Breakfast Express',
    pickupTime: '6:45 PM',
    items: [
      { id: '301', name: 'Idli Sambar', quantity: 2, price: 50 },
      { id: '302', name: 'Masala Dosa', quantity: 1, price: 90 }
    ]
  },
  {
    id: '1002',
    customer: 'Sneha Reddy',
    date: '2023-09-16T16:15:00',
    status: 'completed',
    total: 170,
    stall: 'Fresh Juice Bar',
    pickupTime: '5:30 PM',
    items: [
      { id: '201', name: 'Mango Juice', quantity: 2, price: 60 },
      { id: '202', name: 'Orange Juice', quantity: 1, price: 50 }
    ]
  },
  {
    id: '1001',
    customer: 'Vikram Singh',
    date: '2023-09-16T15:30:00',
    status: 'completed',
    total: 250,
    stall: 'Frankie Corner',
    pickupTime: '4:45 PM',
    items: [
      { id: '101', name: 'Paneer Frankie', quantity: 2, price: 80 },
      { id: '102', name: 'Chicken Frankie', quantity: 1, price: 90 }
    ]
  }
];

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedStall, setSelectedStall] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchesStall = selectedStall ? order.stall === selectedStall : true;
    
    return matchesSearch && matchesStatus && matchesStall;
  });
  
  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === 'total') {
      return sortDirection === 'asc' ? a.total - b.total : b.total - a.total;
    } else if (sortField === 'id') {
      return sortDirection === 'asc' 
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    }
    return 0;
  });
  
  // Get unique stalls for filter
  const stalls = Array.from(new Set(orders.map(order => order.stall)));
  
  // Format date
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
  
  // Update order status
  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };
  
  // Toggle sort
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'preparing':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Preparing</span>;
      case 'ready':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Ready</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Completed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Unknown</span>;
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Orders</h2>
      
      {/* Filters and search */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by order ID or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <select
                value={selectedStatus || ''}
                onChange={(e) => setSelectedStatus(e.target.value || null)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <select
                value={selectedStall || ''}
                onChange={(e) => setSelectedStall(e.target.value || null)}
                className="pl-3 pr-8 py-2 border border-gray-300 rounded-md appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="">All Stalls</option>
                {stalls.map(stall => (
                  <option key={stall} value={stall}>{stall}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Orders table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('id')}
                    className="flex items-center focus:outline-none"
                  >
                    Order ID
                    {sortField === 'id' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('date')}
                    className="flex items-center focus:outline-none"
                  >
                    Date & Time
                    {sortField === 'date' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stall
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => handleSort('total')}
                    className="flex items-center focus:outline-none"
                  >
                    Total
                    {sortField === 'total' && (
                      sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                    )}
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.length > 0 ? (
                sortedOrders.map((order) => (
                  <React.Fragment key={order.id}>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <button
                          onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                          className="flex items-center text-left"
                        >
                          #{order.id}
                          {expandedOrderId === order.id ? (
                            <ChevronUp size={16} className="ml-1" />
                          ) : (
                            <ChevronDown size={16} className="ml-1" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.stall}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        ₹{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          {order.status !== 'completed' && (
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                              className="p-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="completed">Completed</option>
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedOrderId === order.id && (
                      <tr>
                        <td colSpan={7} className="px-6 py-4 bg-gray-50">
                          <div className="text-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Order Details</h4>
                                <p><span className="text-gray-500">Pickup Time:</span> {order.pickupTime}</p>
                                <p><span className="text-gray-500">Stall:</span> {order.stall}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Customer Details</h4>
                                <p><span className="text-gray-500">Name:</span> {order.customer}</p>
                              </div>
                            </div>
                            
                            <h4 className="font-medium mt-4 mb-2">Items</h4>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Item
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Quantity
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Price
                                    </th>
                                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {order.items.map((item) => (
                                    <tr key={item.id}>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        {item.name}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                        {item.quantity}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                                        ₹{item.price.toFixed(2)}
                                      </td>
                                      <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">
                                        ₹{(item.price * item.quantity).toFixed(2)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                  <tr>
                                    <td colSpan={3} className="px-3 py-2 text-sm font-medium text-right">
                                      Subtotal:
                                    </td>
                                    <td className="px-3 py-2 text-sm font-medium">
                                      ₹{order.total.toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3} className="px-3 py-2 text-sm font-medium text-right">
                                      Taxes (5%):
                                    </td>
                                    <td className="px-3 py-2 text-sm font-medium">
                                      ₹{(order.total * 0.05).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td colSpan={3} className="px-3 py-2 text-sm font-bold text-right">
                                      Total:
                                    </td>
                                    <td className="px-3 py-2 text-sm font-bold">
                                      ₹{(order.total + order.total * 0.05).toFixed(2)}
                                    </td>
                                  </tr>
                                </tfoot>
                              </table>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;