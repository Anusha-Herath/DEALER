
// import React, { useEffect, useState } from "react";
// import PageHeader from "../../components/common/PageHeader";
// import ActionTable from "../../components/common/ActionTable";
// import PrimaryBtn from "../../components/common/PrimaryBtn";
// import ModalPopup from "../../components/common/ModalPopup";
// import { useModal } from "../../context/ModalContext";
// import { PlusCircle } from "lucide-react";
// import {
//   fetchData,
//   fetchInactiveData,
//   submitData,
//   updateData,
// } from "../../services/fetchData";
// import sideImg from "../../assets/images/userSideImg.png";
// import Input from "../../components/common/Input";
// import Dropdown from "../../components/common/Dropdown";
// import { ToastContainer, toast } from "react-toastify";
// import Swal from "sweetalert2";
// import ToggleBtn from "../../components/common/ToggleBtn";

// function BearerRates() {
//   const { openModal, closeModal } = useModal();
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   const VITE_SIA_BEARER_RATES_URL = 'http://127.0.0.1:8000/api/bearer-rates/';

//   const initialPayload = {
//     ID: "",
//     SERVICE_TYPE: "",
//     ORDER_TYPE: "",
//     COMPLIANCE: "",
//     RATES_UNDER_SLAB_LEVELS: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async () => {
//     try {
//       await submitData(VITE_SIA_BEARER_RATES_URL, payload);
//       toast.success("Data submitted successfully!");
//       getData();
//       closeModal();
//     } catch (error) {
//       toast.error("Error submitting data");
//     }
//   };

//   const handleAddData = () => {
//     setPayload(initialPayload);
//     openModal("addProduct");
//   };

//   useEffect(() => {
//     getData();
//   }, [statusFilter]);

//   const columns = [
//     "Service Type",
//     "Order Type",
//     "Compliance (P/F)",
//     "Rated Under SLAB levels",
//     "Status",
//   ];

//   const data = response
//     .filter(
//       (item) =>
//         item?.SERVICE_TYPE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item?.ORDER_TYPE?.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "Service Type": item.SERVICE_TYPE,
//       "Order Type": item.ORDER_TYPE,
//       "Compliance (P/F)": item.COMPLIANCE,
//       "Rated Under SLAB levels": item.RATES_UNDER_SLAB_LEVELS,
//       Status: item.STATUS,
//     }));

//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_BEARER_RATES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_BEARER_RATES_URL);
//     }
//     setResponse(data);
//   };

//   const handleUpdate = async (id) => {
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData) {
//       setPayload({ ...selectedData });
//       openModal("updateProduct");
//     } else {
//       toast.error("Data not found for the selected ID.");
//     }
//   };

//   const handleUpdatedData = async () => {
//     try {
//       if (payload.ID) {
//         await updateData(VITE_SIA_BEARER_RATES_URL, payload.ID, payload);
//         toast.success("Data updated successfully!");
//         getData();
//         closeModal();
//       }
//     } catch (error) {
//       toast.error("Error updating data");
//     }
//   };

//   const handleInactive = async (id) => {
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData && selectedData.STATUS === "Active") {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "This cannot be reverted",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#34a853",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, inactivate it!",
//       });

//       if (result.isConfirmed) {
//         try {
//           const updatedPayload = { ...selectedData, STATUS: "Inactive" };
//           await updateData(VITE_SIA_BEARER_RATES_URL, id, updatedPayload);
//           toast.success("Rule Inactivated");
//           getData();
//         } catch (error) {
//           toast.error("Failed to Inactivate");
//         }
//       }
//     }
//   };

//   return (
//     <div className="block">
//       <ToastContainer position="top-center" theme="colored" />
//       <PageHeader
//         title="Bearer Rates"
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       <ToggleBtn statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

//       <ActionTable
//         columns={columns}
//         data={data}
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//         title="Bearer Rates"
//       />

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Row"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>

//       {/* Add Modal */}
//       <ModalPopup title="Bearer Rates" sideImg={sideImg} modalName="addProduct">
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Service Type"
//             type="text"
//             value={payload.SERVICE_TYPE}
//             onChange={(e) => setPayload({ ...payload, SERVICE_TYPE: e.target.value })}
//           />
//           <Input
//             name="Order Type"
//             type="text"
//             value={payload.ORDER_TYPE}
//             onChange={(e) => setPayload({ ...payload, ORDER_TYPE: e.target.value })}
//           />
//           <Dropdown
//             name="COMPLIANCE"
//             value={payload.COMPLIANCE}
//             status={["P", "F"]}
//             onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
//           />
//           <Input
//             name="Rated Under SLAB levels"
//             type="number"
//             value={payload.RATES_UNDER_SLAB_LEVELS}
//             onChange={(e) =>
//               setPayload({ ...payload, RATES_UNDER_SLAB_LEVELS: e.target.value })
//             }
//           />
//           <Input
//             name="Created User"
//             type="text"
//             value={payload.CREATED_USER}
//             onChange={(e) => setPayload({ ...payload, CREATED_USER: e.target.value })}
//           />
//           <Input
//             name="Created Date"
//             type="date"
//             value={payload.CREATED_DATE}
//             onChange={(e) => setPayload({ ...payload, CREATED_DATE: e.target.value })}
//           />
//         </div>
//         <div className="flex justify-center w-full gap-10 mt-10">
//           <button
//             className="w-32 p-2 text-white rounded-md bg-success"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//           <button
//             className="w-32 p-2 text-white rounded-md bg-warning"
//             onClick={closeModal}
//           >
//             Cancel
//           </button>
//         </div>
//       </ModalPopup>

//       {/* Update Modal */}
//       <ModalPopup
//         title="Update Bearer Rates"
//         sideImg={sideImg}
//         modalName="updateProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Service Type"
//             type="text"
//             value={payload.SERVICE_TYPE}
//             onChange={(e) => setPayload({ ...payload, SERVICE_TYPE: e.target.value })}
//           />
//           <Input
//             name="Order Type"
//             type="text"
//             value={payload.ORDER_TYPE}
//             onChange={(e) => setPayload({ ...payload, ORDER_TYPE: e.target.value })}
//           />
//           <Dropdown
//             name="COMPLIANCE"
//             value={payload.COMPLIANCE}
//             status={["P", "F"]}
//             onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
//           />
//           <Input
//             name="Rated Under SLAB levels"
//             type="number"
//             value={payload.RATES_UNDER_SLAB_LEVELS}
//             onChange={(e) =>
//               setPayload({ ...payload, RATES_UNDER_SLAB_LEVELS: e.target.value })
//             }
//           />
//           <Dropdown
//             name="Status"
//             value={payload.STATUS}
//             status={["Active", "Inactive"]}
//             onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
//           />
//           <Input
//             name="Updated User"
//             type="text"
//             value={payload.UPDATED_USER}
//             onChange={(e) => setPayload({ ...payload, UPDATED_USER: e.target.value })}
//           />
//           <Input
//             name="Updated Date"
//             type="date"
//             value={payload.UPDATED_DATE}
//             onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })}
//           />
//         </div>
//         <div className="flex justify-center w-full gap-10 mt-10">
//           <button
//             className="w-32 p-2 text-white rounded-md bg-primary"
//             onClick={handleUpdatedData}
//           >
//             Update
//           </button>
//           <button
//             className="w-32 p-2 text-white rounded-md bg-warning"
//             onClick={closeModal}
//           >
//             Cancel
//           </button>
//         </div>
//       </ModalPopup>
//     </div>
//   );
// }

// export default BearerRates;

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ActionTable from "../../components/common/ActionTable";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import ModalPopup from "../../components/common/ModalPopup";
import { useModal } from "../../context/ModalContext";
import { PlusCircle } from "lucide-react";
import {
  fetchData,
  fetchInactiveData,
  submitData,
  updateData,
} from "../../services/fetchData";
import sideImg from "../../assets/images/userSideImg.png";
import Input from "../../components/common/Input";
import Dropdown from "../../components/common/Dropdown";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import ToggleBtn from "../../components/common/ToggleBtn";
import { validations } from "../../utils/FormValidations";

function BearerRates() {
  const { openModal, closeModal } = useModal();
  const [response, setResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const VITE_SIA_BEARER_RATES_URL = 'http://127.0.0.1:8000/api/bearer-rates/';
  const ruleName = "bearerRates";

  const initialPayload = {
    ID: "",
    BEARER_RATE_ID: "",
    SERVICE_TYPE: "",
    ORDER_TYPE: "",
    COMPLIANCE: "",
    RATES_UNDER_SLAB_LEVELS: "",
    CREATED_DATE: "",
    CREATED_USER: "",
    UPDATED_DATE: "",
    UPDATED_USER: "",
    STATUS: "Active",
  };

  const [payload, setPayload] = useState(initialPayload);

  const handleSubmit = async () => {
    const errors = validations(payload, ruleName, false, response);

    if (errors.length > 0) {
      errors.forEach((err) => toast.warning(err));
      return;
    }

    try {
      await submitData(VITE_SIA_BEARER_RATES_URL, payload);
      toast.success("Data submitted successfully!");
      getData();
      closeModal();
    } catch (error) {
      toast.error("Error submitting data");
    }
  };

  const handleAddData = () => {
    setPayload(initialPayload);
    openModal("addProduct");
  };

  useEffect(() => {
    getData();
  }, [statusFilter]);

  const columns = [
    "Bearer Rate ID",
    "Service Type",
    "Order Type",
    "Compliance (P/F)",
    "Rated Under SLAB levels",
    "Status",
  ];

  const data = response
    .filter(
      (item) =>
        item?.BEARER_RATE_ID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.SERVICE_TYPE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.ORDER_TYPE?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.ID - b.ID)
    .map((item) => ({
      id: item.ID,
      "Bearer Rate ID": item.BEARER_RATE_ID,
      "Service Type": item.SERVICE_TYPE,
      "Order Type": item.ORDER_TYPE,
      "Compliance (P/F)": item.COMPLIANCE,
      "Rated Under SLAB levels": item.RATES_UNDER_SLAB_LEVELS,
      Status: item.STATUS,
    }));

  const getData = async () => {
    let data = [];
    if (statusFilter === "Active") {
      data = await fetchData(VITE_SIA_BEARER_RATES_URL);
    } else {
      data = await fetchInactiveData(VITE_SIA_BEARER_RATES_URL);
    }
    setResponse(data);
  };

  const handleUpdate = async (id) => {
    toast.info(`Fetching data for update...`);
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData) {
      setPayload({ 
        ...selectedData,
        UPDATED_USER: selectedData.UPDATED_USER || ""
      });
      openModal("updateProduct");
    } else {
      toast.error("Data not found for the selected ID.");
    }
  };

  const handleUpdatedData = async () => {
    const errors = validations(payload, ruleName, true);

    if (errors.length > 0) {
      errors.forEach((err) => toast.warning(err));
      return;
    }

    try {
      if (payload.ID) {
        await updateData(VITE_SIA_BEARER_RATES_URL, payload.ID, payload);
        toast.success("Data updated successfully!");
        getData();
        closeModal();
      }
    } catch (error) {
      toast.error("Error updating data");
    }
  };

  const handleInactive = async (id) => {
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData && selectedData.STATUS === "Active") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This cannot be reverted",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34a853",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, inactivate it!",
      });

      if (result.isConfirmed) {
        try {
          const updatedPayload = { ...selectedData, STATUS: "Inactive" };
          await updateData(VITE_SIA_BEARER_RATES_URL, id, updatedPayload);
          toast.success("Bearer Rate Inactivated");
          getData();
        } catch (error) {
          toast.error("Failed to Inactivate");
        }
      } else {
        toast.info("Inactivation cancelled");
      }
    }
  };

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader
        title="Bearer Rates"
        placeholder="Search by Bearer Rate ID, Service Type or Order Type"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ToggleBtn statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      <ActionTable
        columns={columns}
        data={data}
        handleUpdate={handleUpdate}
        handleInactive={handleInactive}
        title="Bearer Rates"
      />

      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Row"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>

      {/* Add Modal */}
      <ModalPopup title="Bearer Rates" sideImg={sideImg} modalName="addProduct">
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Bearer Rate ID"
            type="text"
            value={payload.BEARER_RATE_ID}
            onChange={(e) => setPayload({ ...payload, BEARER_RATE_ID: e.target.value })}
          />
          <Input
            name="Service Type"
            type="text"
            value={payload.SERVICE_TYPE}
            onChange={(e) => setPayload({ ...payload, SERVICE_TYPE: e.target.value })}
          />
          <Input
            name="Order Type"
            type="text"
            value={payload.ORDER_TYPE}
            onChange={(e) => setPayload({ ...payload, ORDER_TYPE: e.target.value })}
          />
          <Dropdown
            name="COMPLIANCE"
            value={payload.COMPLIANCE}
            status={["P", "F"]}
            onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
          />
          <Input
            name="Rated Under SLAB levels"
            type="number"
            value={payload.RATES_UNDER_SLAB_LEVELS}
            onChange={(e) =>
              setPayload({ ...payload, RATES_UNDER_SLAB_LEVELS: e.target.value })
            }
          />
          <Input
            name="Created User"
            type="text"
            value={payload.CREATED_USER}
            onChange={(e) => setPayload({ ...payload, CREATED_USER: e.target.value })}
          />
        </div>
        <div className="flex justify-center w-full gap-10 mt-10">
          <button
            className="w-32 p-2 text-white rounded-md bg-success"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="w-32 p-2 text-white rounded-md bg-warning"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </ModalPopup>

      {/* Update Modal */}
      <ModalPopup
        title="Update Bearer Rates"
        sideImg={sideImg}
        modalName="updateProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Bearer Rate ID"
            type="text"
            value={payload.BEARER_RATE_ID}
            onChange={(e) => setPayload({ ...payload, BEARER_RATE_ID: e.target.value })}
          />
          <Input
            name="Service Type"
            type="text"
            value={payload.SERVICE_TYPE}
            onChange={(e) => setPayload({ ...payload, SERVICE_TYPE: e.target.value })}
          />
          <Input
            name="Order Type"
            type="text"
            value={payload.ORDER_TYPE}
            onChange={(e) => setPayload({ ...payload, ORDER_TYPE: e.target.value })}
          />
          <Dropdown
            name="COMPLIANCE"
            value={payload.COMPLIANCE}
            status={["P", "F"]}
            onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
          />
          <Input
            name="Rated Under SLAB levels"
            type="number"
            value={payload.RATES_UNDER_SLAB_LEVELS}
            onChange={(e) =>
              setPayload({ ...payload, RATES_UNDER_SLAB_LEVELS: e.target.value })
            }
          />
          <Dropdown
            name="Status"
            value={payload.STATUS}
            status={["Active", "Inactive"]}
            onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
          />
          <Input
            name="Updated User"
            type="text"
            value={payload.UPDATED_USER}
            onChange={(e) => setPayload({ ...payload, UPDATED_USER: e.target.value })}
          />
        </div>
        <div className="flex justify-center w-full gap-10 mt-10">
          <button
            className="w-32 p-2 text-white rounded-md bg-primary"
            onClick={handleUpdatedData}
          >
            Update
          </button>
          <button
            className="w-32 p-2 text-white rounded-md bg-warning"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </ModalPopup>
    </div>
  );
}

export default BearerRates;