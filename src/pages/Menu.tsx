import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

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
  },
  {
    id: '5',
    name: 'Café Coffee Day',
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium coffee and snacks',
    categories: ['Beverages', 'Snacks']
  },
  {
    id: '6',
    name: 'Main Course Mess',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Full meals with rice, curry, and sides',
    categories: ['Main Course', 'Veg', 'Non-Veg']
  }
];

// Unique categories for filtering
const allCategories = Array.from(
  new Set(stalls.flatMap(stall => stall.categories))
);

const Menu: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredStalls = stalls.filter(stall => {
    const matchesSearch = stall.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? stall.categories.includes(selectedCategory) : true;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Campus Food Stalls</h1>
        <p className="text-gray-600 max-w-3xl">
          Browse all food stalls in the Anurag University canteen. Order ahead and skip the queue!
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              placeholder="Search stalls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === null
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {allCategories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
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
        </div>
      </div>
      
      {/* Stalls grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStalls.length > 0 ? (
          filteredStalls.map(stall => (
            <Link key={stall.id} to={`/stall/${stall.id}`} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={stall.image}
                    alt={stall.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-orange-500 transition">
                    {stall.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{stall.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {stall.categories.map(category => (
                      <span 
                        key={category} 
                        className="px-2 py-1 bg-orange-100 text-orange-600 text-xs font-medium rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <span className="inline-block w-full text-center py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
                    View Menu
                  </span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No stalls found matching your criteria.</p>
            <button
              className="mt-4 text-orange-500 hover:text-orange-600"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;