import React from "react";

function Input({ name, type, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor="Service Number"
        className="my-1 font-semibold text-gray-500"
      >
        {name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-[80%] border-2 border-gray-200 rounded-lg p-2"
      />
    </div>
  );
}

export default Input;
