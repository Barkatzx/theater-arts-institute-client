import React from "react";

const Title = ({ 
  heading, 
  subheading, 
  center = true, 
  underline = true,
  decorative = false 
}) => {
  return (
    <div className={`${center ? 'text-center' : 'text-left'} mb-10 max-w-4xl mx-auto px-4`}>
      {subheading && (
        <p className="text-sm font-semibold tracking-wider text-indigo-600 uppercase mb-2">
          {subheading}
        </p>
      )}
      
      <h2 className={`text-2xl md:text-4xl font-bold text-gray-900 ${decorative ? 'relative inline-block' : ''}`}>
        {heading}
        {decorative && (
          <span className="absolute -bottom-2 left-0 w-full h-2 bg-indigo-100 rounded-full"></span>
        )}
      </h2>
      
      {underline && (
        <div className={`mt-6 ${center ? 'mx-auto' : ''} w-20 h-1 bg-gradient-to-r from-indigo-400 to-indigo-600 rounded-full`}></div>
      )}
    </div>
  );
};

export default Title;