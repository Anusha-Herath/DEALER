import React from "react";
import { useEffect } from "react";
export function SchemeTable({ column, products, setRuleId, TABLE_NAME }) {
  // console.log("SchemeTable Data", column);
  // console.log("SchemeTable Products", products);

  useEffect(() => {
    const ids = products.map((item) => item.ONE);
    // Create an array of objects for each ID
    const ruleObjects = ids.map((id) => ({
      TABLE_NAME: TABLE_NAME,
      RT_ID: id,
    }));

    // Set the array in the parent state
    setRuleId(ruleObjects);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-white border-b border-gray-700">
            {column.map((col, index) => {
              return (
                <th className="pb-3 pr-3 font-medium " key={index}>
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>

        {/* Table body content */}
        <tbody className="divide-y divide-gray-700">
          {products.map((product, index) => (
            <tr key={index} className="border-b border-gray-800">
              <td className="py-3 font-semibold text-white">{product.ONE}</td>
              <td className="py-3 font-semibold text-gray-200">
                {product.TWO}
              </td>
              <td className="py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.STATUS
                      ? "bg-green-500 text-white"
                      : "bg-gray-500/10 text-red-500"
                  }`}
                >
                  {product.STATUS ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
