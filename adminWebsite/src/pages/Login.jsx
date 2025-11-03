import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import axios from '../api/axios.config.js';
import toast from 'react-hot-toast';

export default function ResearcherLogin({setIsLoggedIn}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response=await axios.post('/admin/login',{userName : username,password},{withCredentials:true});
      console.log(response);
      if(response.data.success){
        setIsLoggedIn(true);
        toast.success("Logged in successfully");
      }
    }catch(err){
      console.log(err);
      toast.error("Invalid username or password");
    }
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-slate-800 tracking-wide">
            Welcome Research Admin
          </h1>
          <div className="w-1/2  h-1 bg-slate-300 mx-auto mt-4"></div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border border-slate-200">
          <div className="mb-6">
           
            
          </div>

          <div className="space-y-6">
            {/* Username Field */}
            <div>
              <label 
                htmlFor="admin-username" 
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  autoFocus
                  id="admin-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-slate-700"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all text-slate-700"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-b from-slate-900 to-slate-800 hover:bg-gradient-to-b hover:from-slate-800 hover:to-slate-700  text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-center">
          
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © 2025 Research Portal. All rights reserved.
        </p>
      </div>
    </div>
  );
}