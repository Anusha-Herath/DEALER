import React, { useEffect, useState } from "react";
import PageHeader from "../../components/dealer/PageHeader";
import ActionTable from "../../components/common/ActionTable";
import { fetchData } from "../../services/fetchData";
import { ToastContainer, toast } from "react-toastify";

function SalesSummary() {
  const [response, setResponse] = useState([]);

  const VITE_SIA_SO_TYPES_URL = import.meta.env.VITE_SIA_SO_TYPES_URL;

  const initialPayload = {
    id: "",
    service_type: "",
    order_type: "",
    count: "",
    created_date: "",
    created_user: "",
    updated_date: "",
    updated_user: "",
    status: "ACTIVE",
  };

  const [payload, setPayload] = useState(initialPayload);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = ["Service type", "Order type", "Count"];

  const data = Array.isArray(response)
    ? response
        .sort((a, b) => (a.id || 0) - (b.id || 0))
        .map((item) => ({
          id: item.id,
          "Service type": item.service_type || "",
          "Order type": item.order_type || "",
          Count: item.count || "",
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

  const handleUpdate = async (id) => {
    try {
      toast.info(`Fetching data for update...`);
      const selectedData = Array.isArray(response)
        ? response.find((item) => item.id === id)
        : null;

      if (selectedData) {
        setPayload({
          id: selectedData.id,
          service_type: selectedData.service_type || "",
          order_type: selectedData.order_type || "",
          count: selectedData.count || "",
          updated_date: selectedData.updated_date || "",
          updated_user: selectedData.updated_user || "",
          status: selectedData.status || "ACTIVE",
        });
        // Modal logic removed
      } else {
        toast.error("Data not found for the selected ID.");
      }
    } catch (error) {
      toast.error("Error fetching data for update:", error);
    }
  };

  return (
    <div className="block relative min-h-screen pb-20">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader title="Sales Summary" />
      <ActionTable columns={columns} data={data} handleUpdate={handleUpdate} />

      {/* Buttons at bottom right corner */}
      <div className="fixed bottom-4 right-4 flex space-x-4">
        <button
          onClick={() => toast.success("Confirmed")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.warn("Rejected")}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Reject
        </button>4
      </div>
    </div>
  );
}

export default SalesSummary;
