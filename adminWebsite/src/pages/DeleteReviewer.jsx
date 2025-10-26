import React from 'react';
import DeleteCard from '../components/DeleteCard';
const DeleteContent = () => {
  const handleDeleteReviewer = (reviewerNumber) => {
    console.log('Deleting reviewer:', reviewerNumber);
    // Add your delete logic here
  };

  const handleDeleteAuthor = (authorNumber) => {
    console.log('Deleting author:', authorNumber);
    // Add your delete logic here
  };

  const handleDeletePaper = (paperNumber) => {
    console.log('Deleting paper:', paperNumber);
    // Add your delete logic here
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:ml-64 pt-16 lg:pt-0 bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="h-full  space-x-8 flex justify-center items-center">
        
        <DeleteCard
          title="Delete Reviewer"
          label="Enter Reviewer Number"
          placeholder="e.g., REV001"
          onDelete={handleDeleteReviewer}
        />

        <DeleteCard
          title="Delete Author"
          label="Enter Author Number"
          placeholder="e.g., AUT001"
          onDelete={handleDeleteAuthor}
        />

        <DeleteCard
          title="Delete Paper"
          label="Enter Paper Number"
          placeholder="e.g., PAP001"
          onDelete={handleDeletePaper}
        />

      </div>
    </div>
  );
};

export default DeleteContent;