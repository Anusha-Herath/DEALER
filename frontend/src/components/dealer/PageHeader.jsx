import { SearchIcon } from "lucide-react";
import  { useState, useEffect } from "react";

function PageHeader({ title }) {
  const [schemes, setSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Replace this with actual API call if needed
    setSchemes([
      { id: 1, name: "Scheme 1" },
      { id: 2, name: "Scheme 2" },
      { id: 3, name: "Scheme 3" },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between p-2 gap-2">
      <h1 className="text-3xl font-semibold text-white">{title}</h1>

      <div className="flex flex-col md:flex-row gap-2">
        {/* Product Search */}
        <div className="flex items-center p-1 text-white rounded-lg border bg-white/10">
          <input
            type="text"
            placeholder="Product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent mr-2 outline-none text-white placeholder-white px-2 py-1"
          />
          <SearchIcon className="text-white" />
        </div>

        {/* Scheme Selector */}
        <div className="flex items-center p-1 text-white rounded-lg border bg-white/10">
          {loading ? (
            <span>Loading...</span>
          ) : (
            <select
              className="bg-transparent text-gray-900 outline-none px-2 py-1"
              value={selectedScheme}
              onChange={(e) => setSelectedScheme(e.target.value)}
            >
              <option value="" disabled>Select Scheme</option>
              {schemes.map((scheme) => (
                <option key={scheme.id} value={scheme.id} className="text-black">
                  {scheme.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;
