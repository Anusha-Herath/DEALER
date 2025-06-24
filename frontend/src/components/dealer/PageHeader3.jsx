import React, { useState, useEffect } from "react";

function PageHeader3({ title }) {
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    // You can replace this with your actual API request if needed
    setSchemes([
      { id: 1, name: "Scheme 1" },
      { id: 2, name: "Scheme 2" },
      { id: 3, name: "Scheme 3" },
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
          value={selectedScheme}
          onChange={(e) => setSelectedScheme(e.target.value)} // Updated to setSelectedScheme
        >
          <option value="" disabled>Select Scheme</option>
          {schemes.map((scheme) => (
            <option key={scheme.id} value={scheme.id}>
              {scheme.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PageHeader3;
