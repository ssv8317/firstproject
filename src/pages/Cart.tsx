import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Minus, Plus, Trash2, ArrowLeft, Clock } from 'lucide-react';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, total, clearCart, pickupTime, setPickupTime } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedTime, setSelectedTime] = useState(pickupTime);
  
  // Generate pickup time options (every 15 minutes for the next 2 hours)
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // Round to the next 15 minute interval
    const roundedMinute = Math.ceil(currentMinute / 15) * 15;
    now.setMinutes(roundedMinute);
    now.setSeconds(0);
    
    // Create time options for the next 2 hours
    for (let i = 0; i < 8; i++) {
      const timeOption = new Date(now.getTime() + i * 15 * 60000);
      const hours = timeOption.getHours();
      const minutes = timeOption.getMinutes();
      
      const formattedHours = hours % 12 || 12;
      const amPm = hours >= 12 ? 'PM' : 'AM';
      const formattedMinutes = minutes.toString().padStart(2, '0');
      
      const timeString = `${formattedHours}:${formattedMinutes} ${amPm}`;
      options.push(timeString);
    }
    
    return options;
  };
  
  const timeOptions = generateTimeOptions();
  
  const handlePlaceOrder = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (!selectedTime) {
      alert('Please select a pickup time');
      return;
    }
    
    setPickupTime(selectedTime);
    
    // In a real application, you would send the order to the backend here
    // For this demo, we'll simulate a successful order
    setOrderPlaced(true);
    
    // Clear the cart after a delay to simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/orders');
    }, 2000);
  };
  
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg\" className="h-12 w-12 text-green-500\" fill="none\" viewBox="0 0 24 24\" stroke="currentColor">
              <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600">Your order has been placed and is being processed.</p>
          <p className="text-gray-600">You will be redirected to your orders page...</p>
        </div>
      </div>
    );
  }
  
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto mb-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Link to="/menu" className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/menu" className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        <span>Continue Shopping</span>
      </Link>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Cart Items</h2>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex flex-col sm:flex-row">
                    <div className="sm:w-24 sm:h-24 w-full h-32 rounded-md overflow-hidden mb-4 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="sm:ml-4 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.stall}</p>
                        </div>
                        <div className="text-orange-500 font-bold mt-2 sm:mt-0">₹{item.price}</div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-2 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-600 flex items-center"
                        >
                          <Trash2 size={16} className="mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock size={20} className="mr-2 text-orange-500" />
                Pickup Time
              </h2>
              <p className="text-gray-600 mb-4">
                Select a time when you'd like to pick up your order
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {timeOptions.map((time, index) => (
                  <button
                    key={index}
                    className={`py-2 px-3 rounded-md text-sm font-medium transition ${
                      selectedTime === time
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (5%)</span>
                  <span>₹{(total * 0.05).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹{(total + total * 0.05).toFixed(2)}</span>
                </div>
              </div>
              
              <button
                onClick={handlePlaceOrder}
                disabled={!selectedTime}
                className={`w-full py-3 rounded-md text-white font-medium transition ${
                  selectedTime
                    ? 'bg-orange-500 hover:bg-orange-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {isAuthenticated ? 'Place Order' : 'Login to Place Order'}
              </button>
              
              {!selectedTime && (
                <p className="text-sm text-red-500 mt-2">
                  Please select a pickup time
                </p>
              )}
              
              <div className="mt-4 text-sm text-gray-500">
                <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;