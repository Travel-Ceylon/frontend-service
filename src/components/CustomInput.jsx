import React from "react";

// Added a new prop: 'isTextArea' and 'rows' for textarea height
const CustomInput = ({
  label,
  type = "text",
  value,
  onChange,
  isTextArea = false,
  rows = 3,
}) => {
  return (
    <div className="relative w-full my-2">
      {/* Conditional Rendering: Render <textarea> or <input> */}
      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows} // Set the default height
          className="w-full rounded-md border border-gray-400 px-3 pt-5 pb-2 text-md text-gray-900 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full rounded-md border border-gray-400 px-3 pt-5 pb-2 text-md text-gray-900"
        />
      )}
      {/* Always-visible Label */}
      <label className="absolute rounded-full left-2.5 -top-2 bg-white px-1 text-sm text-gray-500">
        {label}
      </label>
    </div>
  );
};

export default CustomInput;
