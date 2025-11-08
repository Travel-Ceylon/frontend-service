import React from "react";

const CustomSelectbox = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="relative w-full my-2">
      {/* Select Field */}
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-md border border-gray-400 px-3 pt-5 pb-2 text-md text-gray-900 appearance-none"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Always-visible Label */}
      <label className="absolute left-2.5 -top-2 bg-white px-1 text-sm text-gray-500">
        {label}
      </label>

      {/* Dropdown arrow */}
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
        ▼
      </span>
    </div>
  );
};

export default CustomSelectbox;
