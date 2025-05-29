import React, { useState } from 'react';
import { Star } from 'lucide-react';

// Mock data for reviews
const mockReviews = [
  {
    id: '1',
    itemName: 'Chicken Biryani',
    stall: 'Biryani Point',
    customerName: 'Rahul Sharma',
    rating: 4,
    comment: 'Delicious biryani with perfect spice balance.',
    date: '2024-03-15T10:30:00',
    status: 'published'
  },
  {
    id: '2',
    itemName: 'Masala Dosa',
    stall: 'Breakfast Express',
    customerName: 'Priya Patel',
    rating: 5,
    comment: 'Best dosa in the campus! Crispy and tasty.',
    date: '2024-03-14T09:15:00',
    status: 'published'
  },
  {
    id: '3',
    itemName: 'Mango Juice',
    stall: 'Fresh Juice Bar',
    customerName: 'Amit Kumar',
    rating: 3,
    comment: 'Could be more sweet.',
    date: '2024-03-13T14:20:00',
    status: 'published'
  }
];

const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'positive' | 'negative'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filterReviews = () => {
    return reviews
      .filter(review => {
        const matchesSearch = 
          review.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          review.comment.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedFilter === 'positive') {
          return matchesSearch && review.rating >= 4;
        } else if (selectedFilter === 'negative') {
          return matchesSearch && review.rating < 4;
        }
        return matchesSearch;
      });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(review => review.id !== reviewId));
    }
  };

  const filteredReviews = filterReviews();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Review Management</h1>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search reviews..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'positive'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedFilter('positive')}
          >
            Positive
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'negative'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setSelectedFilter('negative')}
          >
            Negative
          </button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item & Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.map((review) => (
                <tr key={review.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{review.itemName}</div>
                    <div className="text-sm text-gray-500">{review.stall}</div>
                    <div className="text-sm text-gray-500">{review.customerName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={index < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{review.comment}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredReviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow mt-6">
          <p className="text-gray-500 text-lg">No reviews found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;