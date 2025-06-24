import React from "react";

function DropDownTwo({ name, value, onChange, status }) {
  return (
    <div className="flex flex-col">
      <label htmlFor="Service Number" className="font-semibold text-white">
        {name}
      </label>
      <select
        className="px-3 py-2 w-[80%] bg-white/20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={onChange}
      >
        {status.map((option, index) => (
          <option key={index} value={option}>
            {option.toString()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDownTwo;
