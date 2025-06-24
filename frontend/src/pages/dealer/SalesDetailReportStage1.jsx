import React, { useEffect, useState } from "react";
import PageHeader from "../../components/dealer/PageHeader3";
import ActionTable from "../../components/common/ActionTable";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import { fetchData } from "../../services/fetchData";
import { ToastContainer, toast } from "react-toastify";

function SalesDetailReportStage1() {
  const [response, setResponse] = useState([]);

  const VITE_SIA_SO_TYPES_URL = import.meta.env.VITE_SIA_SO_TYPES_URL;

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    "Region",
    "Provice",
    "RTOM",
    "Customer_Ref",
    "Account_No",
    "Status Stage 1",
    "Commision Stage 1",
  ];

  const data = Array.isArray(response)
    ? response
        .sort((a, b) => (a.id || 0) - (b.id || 0))
        .map((item) => ({
          id: item.id,
          "Region": item.region || "",
          "Provice": item.provice || "",
          "RTOM": item.rtom || "",
          "Customer_Ref": item.customer_ref || "",
          "Account_No": item.account_no || "",
          "Status Stage 1": item.status_stages_1 || "",
          "Commision Stage 1": item.commision_stage_1 || "",
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

  // Dummy functions for Confirm & Reject actions
  const handleConfirm = () => {
    toast.success("Confirmed successfully!");
  };

  const handleReject = () => {
    toast.info("Rejected.");
  };

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader title="Sales Detail Report Stage 1" />
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

export default SalesDetailReportStage1;
