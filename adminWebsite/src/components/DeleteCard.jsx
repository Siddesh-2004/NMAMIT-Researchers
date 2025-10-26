import React, { useState } from 'react';
const DeleteCard = ({ title, label, placeholder, onDelete }) => {
  const [inputValue, setInputValue] = useState('');

  const handleDelete = () => {
    if (inputValue.trim()) {
      onDelete(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 ">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{title}</h2>
      <div>
        <div className="mb-6">
          <label 
            htmlFor={`input-${title}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
          </label>
          <input
          
            type="text"
            id={`input-${title}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition"
            placeholder={placeholder}
          />
        </div>
        <button
          onClick={handleDelete}
          
          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCard;