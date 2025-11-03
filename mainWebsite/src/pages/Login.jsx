import { useState } from 'react';
import axios from '../api/axios.config.js';
import toast from 'react-hot-toast';
export default function Login({setIsLoggedIn}) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [university, setUniversity] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    let path, requestData={};
    e.preventDefault();
   if(isLogin){
     path='/user/login';
     requestData={email,password};
   }else{
     path='/user/signUp';
     requestData={userName:username,affiliation:university,email,password,phoneNumber:phone,fullName:"siddehshukla"};
   }
   try{
     const response=await axios.post(path,requestData,{withCredentials:true});
     console.log(response);
     if(response.data.success){
       setIsLoggedIn(true);
       toast.success(response.data.message);
     }
   }
   catch(err){
     console.log(err);
     toast.error(err.message);
   }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear form fields when switching
    setEmail('');
    setPassword('');
    setUsername('');
    setUniversity('');
    setPhone('');
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      {/* Login/Sign Up Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
        {/* Title */}
        <h1 
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          style={{ color: '#001F3F' }}
        >
          {isLogin ? 'Login to Nmamit Researchers' : 'Sign Up for Nmamit Researchers'}
        </h1>

        {/* Form */}
        <div className="space-y-5">
          {/* Sign Up Fields */}
          {!isLogin && (
            <>
              {/* Username Field */}
              <div>
                <label 
                  htmlFor="username" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#001F3F' }}
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>

              {/* University Name Field */}
              <div>
                <label 
                  htmlFor="university" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#001F3F' }}
                >
                  University Name
                </label>
                <input
                  type="text"
                  id="university"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all"
                  placeholder="Enter your university name"
                />
              </div>
            </>
          )}

          {/* Email Field */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium mb-2"
              style={{ color: '#001F3F' }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium mb-2"
              style={{ color: '#001F3F' }}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all"
              placeholder="Enter your password"
            />
          </div>

          {/* Phone Number Field (Sign Up only) */}
          {!isLogin && (
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium mb-2"
                style={{ color: '#001F3F' }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none transition-all"
                placeholder="Enter your phone number"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-3 text-white font-semibold rounded-lg transition-all duration-200 hover:opacity-90 shadow-md hover:shadow-lg"
            style={{ backgroundColor: '#001F3F' }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </div>

        {/* Toggle Link */}
        <p className="text-center mt-6 text-sm text-gray-600">
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <button
                className="font-semibold hover:underline"
                style={{ color: '#001F3F' }}
                onClick={toggleForm}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                className="font-semibold hover:underline"
                style={{ color: '#001F3F' }}
                onClick={toggleForm}
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}