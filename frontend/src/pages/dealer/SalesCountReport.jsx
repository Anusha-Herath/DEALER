import React, { useEffect, useState } from "react";
import PageHeader from "../../components/dealer/PageHeader3";
import ActionTable from "../../components/common/ActionTable";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import { fetchData } from "../../services/fetchData";
import { ToastContainer, toast } from "react-toastify";

function SalesCountReport() {
  const [response, setResponse] = useState([]);
  const [paymentStage, setPaymentStage] = useState(""); // new state for dropdown

  const VITE_SIA_SO_TYPES_URL = import.meta.env.VITE_SIA_SO_TYPES_URL;

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    "Dealer Name",
    "Sub Dealer",
    "Sales Count",
    "Total",
    "Payment Stage",
  ];

  const data = Array.isArray(response)
    ? response
        .sort((a, b) => (a.id || 0) - (b.id || 0))
        .map((item) => ({
          id: item.id,
          Deale_Name: item.dealer_name || "",
          Sub_Dealer: item.sub_dealer || "",
          Sales_Count: item.sales_count || "",
          "Total ": item.total || "",
          "Payment Stage": item.paymet_stage || "",
        }))
    : [];

  const getData = async () => {
    try {
      const data = await fetchData(VITE_SIA_SO_TYPES_URL);
      setResponse(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse([]);
      toast.error("Error fetching data");
    }
  };

  const handleConfirm = () => {
    toast.success("Confirmed successfully!");
  };

  const handleReject = () => {
    toast.info("Rejected.");
  };

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader title="Sales Count Report" />

      {/* Payment Stage Dropdown */}
      <div className="flex justify-end px-4 py-2">
        <label className="mr-2 font-medium text-gray-700">Payment Stage:</label>
        <select
          value={paymentStage}
          onChange={(e) => setPaymentStage(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="">Select</option>
          <option value="stage1">Payment Stage 1</option>
          <option value="stage2">Payment Stage 2</option>
          <option value="stage3">Payment Stage 3</option>
        </select>
      </div>

      <ActionTable columns={columns} data={data} />

      <div className="flex justify-end gap-4 px-4 py-4">
        <button
          onClick={handleConfirm}
          className="w-32 p-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Confirm
        </button>
        <button
          onClick={handleReject}
          className="w-32 p-2 text-white bg-gray-400 rounded hover:bg-gray-500"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default SalesCountReport;
