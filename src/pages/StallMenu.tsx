import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Plus, Minus, ShoppingCart, X } from 'lucide-react';

// Mock data for stalls
const stalls = [
  {
    id: '1',
    name: 'Frankie Corner',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Delicious frankies with various fillings',
    categories: ['Fast Food', 'Snacks']
  },
  {
    id: '2',
    name: 'Fresh Juice Bar',
    image: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Refreshing juices made from fresh fruits',
    categories: ['Beverages', 'Healthy']
  },
  {
    id: '3',
    name: 'Breakfast Express',
    image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Quick and tasty breakfast options',
    categories: ['Breakfast', 'South Indian']
  },
  {
    id: '4',
    name: 'Biryani Point',
    image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Authentic biryani with aromatic spices',
    categories: ['Main Course', 'Non-Veg']
  }
];

// Mock menu items for each stall
const menuItemsByStall: Record<string, any[]> = {
  '1': [
    {
      id: '101',
      name: 'Paneer Frankie',
      price: 80,
      description: 'Soft roti filled with paneer, veggies, and spices',
      image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.5,
      popular: true
    },
    {
      id: '102',
      name: 'Chicken Frankie',
      price: 100,
      description: 'Soft roti filled with spiced chicken and veggies',
      image: 'https://images.pexels.com/photos/12842967/pexels-photo-12842967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: false,
      rating: 4.7,
      popular: true
    },
    {
      id: '103',
      name: 'Egg Frankie',
      price: 70,
      description: 'Soft roti filled with spiced egg and veggies',
      image: 'https://images.pexels.com/photos/7821252/pexels-photo-7821252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: false,
      rating: 4.2,
      popular: false
    },
    {
      id: '104',
      name: 'Mixed Veg Frankie',
      price: 70,
      description: 'Soft roti filled with mixed vegetables',
      image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.0,
      popular: false
    }
  ],
  '2': [
    {
      id: '201',
      name: 'Mango Juice',
      price: 60,
      description: 'Refreshing mango juice made from fresh mangoes',
      image: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.8,
      popular: true
    },
    {
      id: '202',
      name: 'Orange Juice',
      price: 50,
      description: 'Freshly squeezed orange juice',
      image: 'https://images.pexels.com/photos/1536355/pexels-photo-1536355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.5,
      popular: true
    }
  ],
  '3': [
    {
      id: '301',
      name: 'Idli Sambar',
      price: 50,
      description: 'Soft idlis served with sambar and chutney',
      image: 'https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.6,
      popular: true
    },
    {
      id: '302',
      name: 'Masala Dosa',
      price: 70,
      description: 'Crispy dosa filled with spiced potato masala',
      image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.8,
      popular: true
    }
  ],
  '4': [
    {
      id: '401',
      name: 'Chicken Biryani',
      price: 150,
      description: 'Fragrant rice cooked with tender chicken and spices',
      image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: false,
      rating: 4.9,
      popular: true
    },
    {
      id: '402',
      name: 'Veg Biryani',
      price: 120,
      description: 'Fragrant rice cooked with mixed vegetables and spices',
      image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      isVeg: true,
      rating: 4.5,
      popular: true
    }
  ]
};

const StallMenu: React.FC = () => {
  const { stallId } = useParams<{ stallId: string }>();
  const [stall, setStall] = useState<any | null>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addItem, items, itemCount, total, updateQuantity, removeItem } = useCart();
  
  useEffect(() => {
    if (stallId) {
      // Find stall by ID
      const foundStall = stalls.find(s => s.id === stallId);
      if (foundStall) {
        setStall(foundStall);
        
        // Get menu items for this stall
        const items = menuItemsByStall[stallId] || [];
        setMenuItems(items);
      }
    }
  }, [stallId]);
  
  if (!stall) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 text-lg">Stall not found.</p>
      </div>
    );
  }
  
  // Create categories from menu items
  const categories = Array.from(
    new Set(menuItems.map(item => item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'))
  );
  
  const filteredItems = selectedCategory 
    ? menuItems.filter(item => 
        (selectedCategory === 'Vegetarian' && item.isVeg) || 
        (selectedCategory === 'Non-Vegetarian' && !item.isVeg)
      )
    : menuItems;
  
  const popularItems = menuItems.filter(item => item.popular);
  
  return (
    <div className="relative">
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${stall.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white mb-2">{stall.name}</h1>
            <p className="text-white text-lg max-w-2xl">{stall.description}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {stall.categories.map((category: string) => (
                <span 
                  key={category} 
                  className="px-3 py-1 bg-white bg-opacity-20 text-white text-sm font-medium rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 sticky top-0 bg-white z-10 pt-4 pb-2 shadow-md px-4 -mx-4 flex space-x-4 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
              selectedCategory === null
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Items
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {selectedCategory === null && popularItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Popular Items</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                        <div className="flex items-center mb-2">
                          <span className={`w-4 h-4 rounded-full mr-2 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-sm text-gray-500">{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                          <div className="flex items-center ml-4 text-yellow-400">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-orange-500">₹{item.price}</div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button
                      onClick={() => addItem({...item, stall: stall.name})}
                      className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition flex items-center justify-center"
                    >
                      <Plus size={18} className="mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedCategory ? `${selectedCategory} Items` : 'All Items'}
          </h2>
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                        <div className="flex items-center mb-2">
                          <span className={`w-4 h-4 rounded-full mr-2 ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <span className="text-sm text-gray-500">{item.isVeg ? 'Veg' : 'Non-Veg'}</span>
                          <div className="flex items-center ml-4 text-yellow-400">
                            <Star size={16} fill="currentColor" />
                            <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-orange-500">₹{item.price}</div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                    <button
                      onClick={() => addItem({...item, stall: stall.name})}
                      className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition flex items-center justify-center"
                    >
                      <Plus size={18} className="mr-1" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </div>
      
      {itemCount > 0 && (
        <div className="fixed bottom-4 right-4 z-30">
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-orange-500 text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition flex items-center justify-center"
          >
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-orange-500 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
              {itemCount}
            </span>
          </button>
        </div>
      )}
      
      {isCartOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          ></div>
          
          <div className="relative ml-auto w-full max-w-md bg-white h-full shadow-xl overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              {items.length > 0 ? (
                <div>
                  <div className="space-y-4 mb-6">
                    {items.map(item => (
                      <div key={item.id} className="flex border-b border-gray-100 pb-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.stall}</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="text-orange-500 font-bold">₹{item.price}</div>
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
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold">₹{total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes</span>
                      <span className="font-bold">₹{(total * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mt-4 text-lg">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">₹{(total + total * 0.05).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Link
                    to="/cart"
                    className="block w-full py-3 bg-orange-500 text-white text-center rounded-md hover:bg-orange-600 transition"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingCart size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-orange-500 hover:text-orange-600"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StallMenu;