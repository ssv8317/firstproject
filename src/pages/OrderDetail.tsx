import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle, Star } from 'lucide-react';

// Mock data for a single order
const mockOrder = {
  id: '1004',
  date: '2023-09-16T18:30:00',
  status: 'preparing',
  total: 150,
  stall: 'Biryani Point',
  stallId: '4',
  pickupTime: '7:30 PM',
  items: [
    {
      id: '401',
      name: 'Chicken Biryani',
      quantity: 1,
      price: 150,
      image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ],
  statusUpdates: [
    { status: 'pending', timestamp: '2023-09-16T18:30:00', message: 'Order received' },
    { status: 'preparing', timestamp: '2023-09-16T18:35:00', message: 'Order is being prepared' }
  ]
};

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<typeof mockOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrder = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrder(mockOrder);
      setLoading(false);
    };
    
    fetchOrder();
  }, [orderId]);
  
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
        return { label: 'Unknown', color: 'bg-gray-100 text-gray-800', icon: null };
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
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send the review to the backend here
    console.log('Review submitted:', { rating: reviewRating, comment: reviewComment });
    
    // Reset form and hide it
    setReviewRating(0);
    setReviewComment('');
    setShowReviewForm(false);
    
    // Show success message or update UI
    alert('Thank you for your review!');
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-6 w-48 mx-auto bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 mx-auto bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Not Found</h2>
        <p className="text-gray-600 mb-8">The order you're looking for doesn't exist or has been removed.</p>
        <Link to="/orders" className="text-orange-500 hover:text-orange-600">
          Return to Orders
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/orders" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        <span>Back to Orders</span>
      </Link>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Order #{order.id}</h1>
              <p className="text-gray-500">{formatDate(order.date)}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusLabel(order.status).color}`}>
                {getStatusLabel(order.status).icon}
                {getStatusLabel(order.status).label}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">Order Details</h2>
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <p><span className="font-medium">Stall:</span> {order.stall}</p>
                <p><span className="font-medium">Pickup Time:</span> {order.pickupTime}</p>
                <p><span className="font-medium">Total Amount:</span> ₹{order.total.toFixed(2)}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  to={`/stall/${order.stallId}`}
                  className="text-orange-500 hover:text-orange-600"
                >
                  Visit Stall
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="divide-y divide-gray-200">
            {order.items.map(item => (
              <div key={item.id} className="py-4 flex">
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <div className="flex justify-between mt-2">
                    <div className="text-orange-500 font-bold">₹{item.price}</div>
                    <div>₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes (5%)</span>
              <span>₹{(order.total * 0.05).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2"></div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{(order.total + order.total * 0.05).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {order.statusUpdates.map((update, index) => (
              <div key={index} className="relative pl-10 pb-8">
                <div className="absolute left-0 top-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium">{getStatusLabel(update.status).label}</h3>
                  <p className="text-sm text-gray-500">{formatDate(update.timestamp)}</p>
                  <p className="mt-1">{update.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {order.status === 'completed' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Leave a Review</h2>
            
            {!showReviewForm ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
              >
                Write a Review
              </button>
            ) : (
              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Rating</label>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            rating <= reviewRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          } hover:text-yellow-400 transition`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="comment" className="block text-gray-700 mb-2">Comment</label>
                  <textarea
                    id="comment"
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Share your experience..."
                  ></textarea>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    disabled={reviewRating === 0}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;