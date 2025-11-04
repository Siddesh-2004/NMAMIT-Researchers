import React, { useState } from 'react';
import axios from '../api/axios.config.js'; 
import toast from 'react-hot-toast';

function AddReviewer() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    qualification: '',
    averageScore: '',
    papersReviewed: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/reviewers/add', formData, { withCredentials: true });
      if (response.data.success) {
        toast.success('Reviewer added successfully!');
      } else {
        toast.error('Failed to add reviewer.');
      }
    } catch (error) {
      console.error('Error adding reviewer:', error);
      toast.error('An error occurred while adding the reviewer.');
    }
  };

  return (
    <div className='lg:ml-64 pt-16 lg:pt-0  bg-gray-50 '>
      

      <div className=' mx-auto px-6 pb-8 flex flex-col justify-center items-center min-h-screen'>
        <div className='bg-white border-2 border-gray-300 rounded-xl p-8 shadow-md w-1/2'>
          {/* Name */}
          <div className='mb-6 '>
            <label className='block text-gray-700 font-semibold mb-2'>
              Name <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Dr. Priya Sharma'
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors'
            />
          </div>

          {/* Phone Number */}
          <div className='mb-6'>
            <label className='block text-gray-700 font-semibold mb-2'>
              Phone Number <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder='+91 98765 43210'
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors'
            />
          </div>

          {/* Email */}
          <div className='mb-6'>
            <label className='block text-gray-700 font-semibold mb-2'>
              Email <span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='priya.sharma@nmamit.in'
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors'
            />
          </div>

          {/* Qualification */}
          <div className='mb-6'>
            <label className='block text-gray-700 font-semibold mb-2'>
              Qualification <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              name='qualification'
              value={formData.qualification}
              onChange={handleChange}
              placeholder='Ph.D. in Computer Science'
              className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 transition-colors'
            />
          </div>

          {/* Average Score and Papers Reviewed - Side by Side */}
         
          {/* Buttons */}
          <div className='flex gap-4 mt-8  w-1/2 mx-auto'>
            <button
              onClick={handleSubmit}
              className='flex-1 px-6 py-3 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40 text-white rounded-lg  transition-colors font-semibold '
            >
              Add Reviewer
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReviewer;