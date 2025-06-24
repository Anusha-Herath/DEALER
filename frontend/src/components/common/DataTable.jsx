import React, { useState } from "react";
import { generatePDF } from "../../utils/pdfUtil";
import { FileText } from "lucide-react";

function DataTable({ columns, data, title }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  // Calculate the indices for slicing the data
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // handle generating a PDF for Document
  const handleGeneratePDF = () => {
    generatePDF(columns, data, title);
    console.log(columns);
  };

  return (
    <div className="p-2">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleGeneratePDF}
          className="flex gap-2 px-4 py-2 text-white rounded-md bg-gradient-to-r from-secondary to-success"
        >
          <FileText />
          PDF
        </button>
      </div>
      <table className="w-full bg-white">
        <thead className="text-white rounded-md bg-primary">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="p-2 font-semibold text-center">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*data rows */}
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b-2 border-primary/30 hover:bg-gray-50"
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="py-3 text-center text-gray-500">
                  {col === "Status" ? (
                    <span
                      className={`font-semibold ${
                        row[col] === "Active"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {row[col] || "N/A"}
                    </span>
                  ) : (
                    row[col] || "N/A"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DataTable;
