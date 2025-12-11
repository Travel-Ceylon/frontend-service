import React from 'react';

const StaticLabelInput = ({ label,type = "text", value, onChange }) => {
  return (
    <div className="relative w-full my-2">
      {/* Input Field */}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-400 px-3 pt-5 pb-2 text-md text-gray-900"
      />

      {/* Always-visible Label */}
      <label
        className="absolute rounded-full left-2.5 -top-2 bg-white px-1 text-sm text-gray-500"
      >
        {label}
      </label>
    </div>
  );
};

export default StaticLabelInput;
