import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { handleerror, handleSuccess } from '../util';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Check if fields are empty
    if (!email || !password) {
      return handleerror("All fields are required");
    }

    try {
      // URL for the login API endpoint
      const url = "http://localhost:8000/api/auth/login";
      
      // Make a POST request to the server
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });
      
      // Parse the response
      const result = await response.json();

      const{success,message,token,name,error} = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token',token);
        localStorage.setItem('LoggedinUser', name);
        navigate('/home');
      } else {
        handleerror(message);
      }
    } catch (error) {
      handleerror(error);
      console.error("Error in login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
         Don't have an account 
        <Link to='/signup' className='block text-sm font-medium'> SignUp</Link>
      </div>
    </div>
  );
};

export default Login;
