import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Clock, Award, UtensilsCrossed, Star } from 'lucide-react';

// Mock data for featured stalls
const featuredStalls = [
  {
    id: '1',
    name: 'Frankie Corner',
    image: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Delicious frankies with various fillings',
  },
  {
    id: '2',
    name: 'Fresh Juice Bar',
    image: 'https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Refreshing juices made from fresh fruits',
  },
  {
    id: '3',
    name: 'Breakfast Express',
    image: 'https://images.pexels.com/photos/139746/pexels-photo-139746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Quick and tasty breakfast options',
  },
  {
    id: '4',
    name: 'Biryani Point',
    image: 'https://images.pexels.com/photos/7394819/pexels-photo-7394819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Authentic biryani with aromatic spices',
  },
];

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-10 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Skip the Queue, Enjoy Your Food</h1>
            <p className="text-xl mb-8">
              Order ahead from your favorite stalls at Anurag University canteen and pick up your food when it's ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/menu"
                className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition text-center"
              >
                Browse Menu
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="bg-transparent text-white border-2 border-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-orange-600 transition text-center"
                >
                  Sign Up Now
                </Link>
              )}
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Food ordering"
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UtensilsCrossed size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse & Order</h3>
              <p className="text-gray-600">
                Choose from a variety of stalls and menu items. Add to cart and place your order.
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Status</h3>
              <p className="text-gray-600">
                Monitor your order status in real-time. Get notified when your food is ready.
              </p>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pick Up & Enjoy</h3>
              <p className="text-gray-600">
                Skip the queue. Collect your order directly from the stall when it's ready.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured stalls section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Stalls</h2>
          <p className="text-gray-600 text-center mb-12">Discover popular food stalls in our canteen</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStalls.map((stall) => (
              <Link key={stall.id} to={`/stall/${stall.id}`} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={stall.image}
                      alt={stall.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition">
                      {stall.name}
                    </h3>
                    <p className="text-gray-600 mb-3">{stall.description}</p>
                    <div className="flex items-center text-yellow-400">
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} fill="currentColor" />
                      <Star size={16} className="text-gray-300" />
                      <span className="ml-2 text-gray-600 text-sm">4.0</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="bg-orange-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-orange-600 transition inline-block"
            >
              View All Stalls
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <p className="text-gray-600 mb-4">
                "This app is a game-changer! I used to waste so much time waiting in line, but now I can order in advance and pick up my food when it's ready."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Priya S.</h4>
                  <p className="text-sm text-gray-500">Computer Science</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} className="text-gray-300" />
              </div>
              <p className="text-gray-600 mb-4">
                "The app is really intuitive and easy to use. I love that I can see my order status in real-time and know exactly when to pick it up."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Rahul M.</h4>
                  <p className="text-sm text-gray-500">Mechanical Engineering</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center text-yellow-400 mb-4">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
              </div>
              <p className="text-gray-600 mb-4">
                "As someone who's always rushing between classes, this app has been a lifesaver. I can order my lunch during a lecture and pick it up afterward."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <h4 className="font-semibold">Anisha K.</h4>
                  <p className="text-sm text-gray-500">Electronics & Communication</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;