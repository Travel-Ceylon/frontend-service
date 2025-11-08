import React from 'react';

const LoadingScreen = ({ 
  type = "spinner",
  message = "Loading...!",
  fullScreen = true 
}) => {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex items-center justify-center"
    : "w-full h-full flex items-center justify-center bg-white dark:bg-gray-900 rounded-lg";

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return (
          <div className="relative">
            <div className="w-16 h-16 border-4 border-green-200 rounded-full animate-spin border-t-green-500"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 rounded-full animate-ping border-green-500"></div>
          </div>
        );
      
      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-3 h-3 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        );
      
      case "pulse":
        return (
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        );
      
      case "skeleton":
        return (
          <div className="space-y-4 animate-pulse">
            <div className="w-64 h-4 bg-gray-300 rounded"></div>
            <div className="w-48 h-4 bg-gray-300 rounded"></div>
            <div className="w-56 h-4 bg-gray-300 rounded"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center justify-center space-y-12">
        {renderLoader()}
        <p className="text-green-400 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;