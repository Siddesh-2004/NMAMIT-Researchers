import React from 'react';

const Analytics = ({ title = "Total Researchers", number = "100" }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white  rounded-lg shadow-lg aspect-square flex flex-col items-center justify-center space-y-4 max-w-6/9 lg:bg-gradient-to-b lg:from-slate-900 lg:to-slate-800 lg:shadow-2xl lg:z-40">
      <h2 className="text-xl font-semibold text-center">
        {title}
      </h2>
      <p className="text-5xl font-bold">
        {number}
      </p>
    </div>
  );
};

export default Analytics;