import React from "react";

function DCard({ children }) {
  return (
    <div className="h-auto p-5 text-white bg-transparent shadow-2xl backdrop-blur-2xl rounded-2xl">
      {children}
    </div>
  );
}

export default DCard;
