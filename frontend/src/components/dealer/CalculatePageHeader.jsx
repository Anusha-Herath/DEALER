import React, { useState } from "react";

function CalculatePageHeader({ title }) {
  const [dealer, setDealer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedStage, setSelectedStage] = useState("");

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const stages = [
    "Stage 1", "Stage 2", "Stage 3"
  ];

  return (
    <div className="flex flex-col p-2 gap-2">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-white mb-1">{title}</h1>
      
      {/* Compact input group */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Dealer Input */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <label className="text-white font-medium w-16 text-sm">Dealer</label>
          <div className="flex-1 flex items-center px-2 py-1 text-white rounded border border-gray-400 bg-white/10 text-sm">
            <input
              type="text"
              value={dealer}
              onChange={(e) => setDealer(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <label className="text-white font-medium w-16 text-sm">Month</label>
          <div className="flex-1 flex items-center px-2 py-1 text-white rounded border border-gray-400 bg-white/10 text-sm">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent outline-none w-full"
            >
              <option value="">Select</option>
              {months.map((month) => (
                <option key={month} value={month} className="text-black">
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stage Selector */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <label className="text-white font-medium w-16 text-sm">Stage</label>
          <div className="flex-1 flex items-center px-2 py-1 text-white rounded border border-gray-400 bg-white/10 text-sm">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="bg-transparent outline-none w-full"
            >
              <option value="">Select</option>
              {stages.map((stage) => (
                <option key={stage} value={stage} className="text-black">
                  {stage}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalculatePageHeader;