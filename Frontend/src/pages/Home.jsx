import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [LoggedinUser, setLoggedinUsser] = useState('');
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedinUsser(localStorage.getItem('LoggedinUser'));
  }, []);

  const handlelogout = () => {
    localStorage.removeItem('LoggedinUser');
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const fatchProducts = async () => {
    try {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      };
      const response = await fetch(url, headers);
      const data = await response.json();
      console.log(data);
      setproduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fatchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Logged-in User Info */}
        <div className="text-lg font-semibold text-gray-800 mb-6">
          Welcome, <span className="text-indigo-600">{LoggedinUser}</span>
        </div>

        {/* Logout Button */}
        <button 
          onClick={handlelogout}
          className="mb-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>

        {/* Product List */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Products</h3>
          <ul className="space-y-4">
            {product.map((pro) => (
              <li key={pro._id} className="p-4 border border-gray-300 rounded-md">
                <div className="font-medium text-gray-700">Name: {pro.name}</div>
                <div className="text-gray-600">Price: ₹{pro.price}</div>
                <div className="text-gray-600">Quantity: {pro.quantity}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
