import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  ClipboardList, 
  UtensilsCrossed, 
  MessageSquare, 
  LogOut,
  Menu as MenuIcon,
  X
} from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/admin/orders', label: 'Orders', icon: <ClipboardList size={20} /> },
    { path: '/admin/menu', label: 'Menu Items', icon: <UtensilsCrossed size={20} /> },
    { path: '/admin/reviews', label: 'Reviews', icon: <MessageSquare size={20} /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile header */}
      <div className="md:hidden bg-white shadow-md px-4 py-3 flex justify-between items-center">
        <div className="font-bold text-xl text-orange-500">Admin Panel</div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none"
        >
          {sidebarOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
      
      {/* Sidebar - Desktop always visible, mobile conditional */}
      <aside 
        className={`
          ${sidebarOpen ? 'block' : 'hidden'} 
          md:block bg-white shadow-md w-full md:w-64 md:min-h-screen md:flex-shrink-0
        `}
      >
        <div className="p-6 md:border-b">
          <h2 className="text-2xl font-bold text-orange-500 hidden md:block">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center p-3 rounded-md transition-colors
                ${isActive(item.path) 
                  ? 'bg-orange-100 text-orange-500' 
                  : 'text-gray-600 hover:bg-gray-100'}
              `}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-4 md:p-8">
        <div className="mb-6 hidden md:flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            {navItems.find(item => isActive(item.path))?.label || 'Dashboard'}
          </h1>
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">Hello, {user?.name}</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;