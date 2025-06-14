import React from 'react';
import { Sprout } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-white rounded-full p-6 shadow-lg mb-6 animate-pulse">
          <Sprout className="w-12 h-12 text-green-600 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">कृषि सहायक</h2>
        <p className="text-green-600 mb-4">Agricultural Assistant</p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
        <p className="text-gray-600 mt-4">Loading your farming dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;