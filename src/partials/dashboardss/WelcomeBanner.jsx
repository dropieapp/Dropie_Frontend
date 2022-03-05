import React from 'react';

function WelcomeBanner() {
  return (
    <div className="relative bg-orange-200 p-4 sm:p-6 rounded-sm overflow-hidden mb-8">

      {/* Content */}
      <div className="relative">
        <h1 className="text-2xl md:text-3xl text-gray-800 font-bold mb-1">Good afternoon, Stanley Jonn. 👋</h1>
        <p>Here is what’s happening with your projects today:</p>
      </div>

    </div>
  );
}

export default WelcomeBanner;
