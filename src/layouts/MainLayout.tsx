import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu as MenuIcon, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-orange-500 font-bold text-2xl">Campus Bites</span>
          </Link>
          
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-500 transition">Home</Link>
            <Link to="/menu" className="text-gray-700 hover:text-orange-500 transition">Menu</Link>
            {isAuthenticated && (
              <Link to="/orders" className="text-gray-700 hover:text-orange-500 transition">My Orders</Link>
            )}
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 transition">
                  <ShoppingCart size={20} />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <div className="relative">
                  <button 
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition focus:outline-none"
                  >
                    <User size={20} />
                    <span>{user?.name}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-gray-700 hover:bg-orange-50"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <button 
                        onClick={() => {
                          setIsDropdownOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-orange-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-orange-500 transition">Login</Link>
                <Link to="/register" className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-orange-500 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/menu" 
                className="text-gray-700 hover:text-orange-500 transition py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/orders" 
                  className="text-gray-700 hover:text-orange-500 transition py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Orders
                </Link>
              )}
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/cart" 
                    className="flex items-center text-gray-700 hover:text-orange-500 transition py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={20} className="mr-2" />
                    <span>Cart</span>
                    {itemCount > 0 && (
                      <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                        {itemCount}
                      </span>
                    )}
                  </Link>
                  <Link 
                    to="/profile" 
                    className="flex items-center text-gray-700 hover:text-orange-500 transition py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={20} className="mr-2" />
                    <span>Profile</span>
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center text-gray-700 hover:text-orange-500 transition py-2"
                  >
                    <LogOut size={20} className="mr-2" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-2">
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-orange-500 transition py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Campus Bites</h3>
              <p className="text-gray-300">
                Order delicious food from various stalls in Anurag University canteen and skip the queue.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white transition">Home</Link></li>
                <li><Link to="/menu" className="text-gray-300 hover:text-white transition">Menu</Link></li>
                <li><Link to="/orders" className="text-gray-300 hover:text-white transition">My Orders</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">Anurag University, Hyderabad</p>
              <p className="text-gray-300">Email: support@campusbites.com</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Campus Bites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;