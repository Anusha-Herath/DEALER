import React from "react";

function PrimaryBtn({ name, icon, onClick }) {
  return (
    <div>
      <button
        className="flex gap-2 p-2 text-white rounded-md bg-primary"
        onClick={onClick}
      >
        {icon}
        {name}
      </button>
    </div>
  );
}

export default PrimaryBtn;
