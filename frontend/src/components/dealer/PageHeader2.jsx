import React, { useState, useEffect } from "react";

function PageHeader2({ title }) {
  const [slabLevels, setSlabLevels] = useState([]);
  const [selectedSlab, setSelectedSlab] = useState("");
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // You can replace this with your actual API request if needed
    setSlabLevels([
      { id: 1, name: "Slab 1" },
      { id: 2, name: "Slab 2" },
      { id: 3, name: "Slab 3" },
    ]);
    setLoading(false); // Stop loading once data is available
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-between p-2">
        <h1 className="text-3xl font-semibold text-white">{title}</h1>
        <div className="flex items-center p-1 text-white rounded-lg border bg-white/10">
          <span>Loading...</span>
        </div>
      </div>
    ); // Show loading text until data is fetched
  }

  return (
    <div className="flex items-center justify-between p-2">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>

      <div className="flex items-center w-auto p-1 text-white rounded-lg border bg-white/10">
        <select
          className="bg-transparent text-white outline-none px-2 py-1"
          value={selectedSlab}
          onChange={(e) => setSelectedSlab(e.target.value)}
        >
          <option value="" disabled>Select Slab Level</option>
          {slabLevels.map((slab) => (
            <option key={slab.id} value={slab.id}>
              {slab.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PageHeader2;
