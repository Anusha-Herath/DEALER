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

// function PackageRates() {
//   const { openModal, closeModal } = useModal();

//   // State declarations
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");
//   const [loading, setLoading] = useState(false);

//   // API URL
//   const  VITE_SIA_PACKAGE_RATES_URL = "http://127.0.0.1:8000/api/package-rates/";

//   const initialPayload = {
//     ID: "",
//     TARRIF_ID: "",
//     PACKAGE: "",
//     COMPILANCE: "",
//     STAGE_LEVEL_STATUS_CHECK: "",
//     SLAB_LEVEL_1_RATE: "",
//     BASE_RATE: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "ACTIVE",
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   // Fetch data function
//   const getData = async () => {
//     setLoading(true);
//     try {
//       let data = [];
//       if (statusFilter === "Active") {
//         data = await fetchData( VITE_SIA_PACKAGE_RATES_URL);
//       } else {
//         data = await fetchInactiveData( VITE_SIA_PACKAGE_RATES_URL);
//       }
//       setResponse(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Form submission handler
//   const handleSubmit = async () => {
//     try {
//       const result = await submitData( VITE_SIA_PACKAGE_RATES_URL, payload);
//       toast.success("Package rate added successfully!");
//       getData();
//       closeModal();
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error("Failed to add package rate");
//     }
//   };

//   // Update handler
//   const handleUpdate = async (id) => {
//     try {
//       const selectedData = response.find((item) => item.ID === id);
//       if (selectedData) {
//         setPayload({
//           ID: selectedData.ID,
//           TARRIF_ID: selectedData.TARRIF_ID,
//           PACKAGE: selectedData.PACKAGE,
//           COMPILANCE: selectedData.COMPILANCE,
//           STAGE_LEVEL_STATUS_CHECK: selectedData.STAGE_LEVEL_STATUS_CHECK,
//           SLAB_LEVEL_1_RATE: selectedData.SLAB_LEVEL_1_RATE,
//           BASE_RATE: selectedData.BASE_RATE,
//           CREATED_DATE: selectedData.CREATED_DATE,
//           CREATED_USER: selectedData.CREATED_USER,
//           UPDATED_DATE: selectedData.UPDATED_DATE,
//           UPDATED_USER: selectedData.UPDATED_USER,
//           STATUS: selectedData.STATUS,
//         });
//         openModal("updateProduct");
//       } else {
//         toast.error("Data not found");
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to fetch data for update");
//     }
//   };

//   // Update submission handler
//   const handleUpdatedData = async () => {
//     try {
//       if (payload.ID) {
//         await updateData( VITE_SIA_PACKAGE_RATES_URL, payload.ID, payload);
//         toast.success("Package rate updated successfully!");
//         getData();
//         closeModal();
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error("Failed to update package rate");
//     }
//   };

//   // Inactivation handler
//   const handleInactive = async (id) => {
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData && selectedData.STATUS === "ACTIVE") {
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
//           const updatedPayload = { ...selectedData, STATUS: "INACTIVE" };
//           await updateData( VITE_SIA_PACKAGE_RATES_URL, id, updatedPayload);
//           toast.success("Package rate inactivated");
//           getData();
//         } catch (error) {
//           console.error("Inactivation error:", error);
//           toast.error("Failed to inactivate");
//         }
//       }
//     }
//   };

//   // Table configuration
//   const columns = [
//     "Tarrif ID",
//     "Package",
//     "Compilance",
//     "Stage Level Status Check",
//     "Slab Level 1 Rate",
//     "Base Rate",
//     "Status",
//   ];

//   const data = response
//     .filter((item) =>
//       item.PACKAGE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.TARRIF_ID?.toString().includes(searchQuery)
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "Tarrif ID": item.TARRIF_ID,
//       "Package": item.PACKAGE,
//       "Compilance": item.COMPILANCE,
//       "Stage Level Status Check": item.STAGE_LEVEL_STATUS_CHECK,
//       "Slab Level 1 Rate": item.SLAB_LEVEL_1_RATE,
//       "Base Rate": item.BASE_RATE,
//       "Status": item.STATUS,
//     }));

//   // Initial data fetch
//   useEffect(() => {
//     getData();
//   }, [statusFilter]);

//   return (
//     <div className="block">
//       <ToastContainer position="top-center" theme="colored" />
//       <PageHeader
//         title="Package Rates"
//         placeholder="Search by Package or Tarrif ID"
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       <ToggleBtn
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//       />

//       {loading ? (
//         <div className="p-4 text-center">Loading data...</div>
//       ) : (
//         <ActionTable
//           columns={columns}
//           data={data}
//           handleUpdate={handleUpdate}
//           handleInactive={handleInactive}
//           title="Package Rates List"
//         />
//       )}

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Package"
//           icon={<PlusCircle />}
//           onClick={() => {
//             setPayload(initialPayload);
//             openModal("addProduct");
//           }}
//         />
//       </div>

//       {/* Add Modal */}
//       <ModalPopup
//         title="Add New Package Rate"
//         sideImg={sideImg}
//         modalName="addProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Tarrif ID"
//             type="text"
//             value={payload.TARRIF_ID}
//             onChange={(e) => setPayload({ ...payload, TARRIF_ID: e.target.value })}
//           />
//           <Input
//             name="Package"
//             type="text"
//             value={payload.PACKAGE}
//             onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
//           />
//           <Input
//             name="Compilance"
//             type="text"
//             value={payload.COMPILANCE}
//             onChange={(e) => setPayload({ ...payload, COMPILANCE: e.target.value })}
//           />
//           <Input
//             name="Stage Level Status Check"
//             type="text"
//             value={payload.STAGE_LEVEL_STATUS_CHECK}
//             onChange={(e) => setPayload({ ...payload, STAGE_LEVEL_STATUS_CHECK: e.target.value })}
//           />
//           <Input
//             name="Slab Level 1 Rate"
//             type="number"
//             value={payload.SLAB_LEVEL_1_RATE}
//             onChange={(e) => setPayload({ ...payload, SLAB_LEVEL_1_RATE: e.target.value })}
//           />
//           <Input
//             name="Base Rate"
//             type="number"
//             value={payload.BASE_RATE}
//             onChange={(e) => setPayload({ ...payload, BASE_RATE: e.target.value })}
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
//         title="Update Package Rate"
//         sideImg={sideImg}
//         modalName="updateProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Tarrif ID"
//             type="text"
//             value={payload.TARRIF_ID}
//             onChange={(e) => setPayload({ ...payload, TARRIF_ID: e.target.value })}
//           />
//           <Input
//             name="Package"
//             type="text"
//             value={payload.PACKAGE}
//             onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
//           />
//           <Input
//             name="Compilance"
//             type="text"
//             value={payload.COMPILANCE}
//             onChange={(e) => setPayload({ ...payload, COMPILANCE: e.target.value })}
//           />
//           <Input
//             name="Stage Level Status Check"
//             type="text"
//             value={payload.STAGE_LEVEL_STATUS_CHECK}
//             onChange={(e) => setPayload({ ...payload, STAGE_LEVEL_STATUS_CHECK: e.target.value })}
//           />
//           <Input
//             name="Slab Level 1 Rate"
//             type="number"
//             value={payload.SLAB_LEVEL_1_RATE}
//             onChange={(e) => setPayload({ ...payload, SLAB_LEVEL_1_RATE: e.target.value })}
//           />
//           <Input
//             name="Base Rate"
//             type="number"
//             value={payload.BASE_RATE}
//             onChange={(e) => setPayload({ ...payload, BASE_RATE: e.target.value })}
//           />
//           <Dropdown
//             name="Status"
//             value={payload.STATUS}
//             status={["ACTIVE", "INACTIVE"]}
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

// export default PackageRates;

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

function PackageRates() {
  const { openModal, closeModal } = useModal();
  const [response, setResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [loading, setLoading] = useState(false);

  const  VITE_SIA_PACKAGE_RATES_URL = 'http://127.0.0.1:8000/api/package-rates/';

  const initialPayload = {
    ID: "",
    TARRIF_ID: "",
    PACKAGE: "",
    COMPILANCE: "",
    STAGE_LEVEL_STATUS_CHECK: "",
    SLAB_LEVEL_1_RATE: "",
    BASE_RATE: "",
    CREATED_DATE: "",
    CREATED_USER: "",
    UPDATED_DATE: "",
    UPDATED_USER: "",
    STATUS: "Active",
  };

  const [payload, setPayload] = useState(initialPayload);

  const getData = async () => {
    setLoading(true);
    try {
      let data = [];
      if (statusFilter === "Active") {
        data = await fetchData( VITE_SIA_PACKAGE_RATES_URL);
      } else {
        data = await fetchInactiveData( VITE_SIA_PACKAGE_RATES_URL);
      }
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitData( VITE_SIA_PACKAGE_RATES_URL, payload);
      toast.success("Package rate added successfully!");
      getData();
      closeModal();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to add package rate");
    }
  };

  const handleAddData = () => {
    setPayload(initialPayload);
    openModal("addProduct");
  };

  const handleUpdate = async (id) => {
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData) {
      setPayload({
        ...selectedData,
        // Ensure dates are in correct format for input fields
        CREATED_DATE: selectedData.CREATED_DATE?.split('T')[0],
        UPDATED_DATE: selectedData.UPDATED_DATE?.split('T')[0]
      });
      openModal("updateProduct");
    } else {
      toast.error("Data not found for the selected ID.");
    }
  };

  const handleUpdatedData = async () => {
    try {
      if (payload.ID) {
        await updateData( VITE_SIA_PACKAGE_RATES_URL, payload.ID, payload);
        toast.success("Package rate updated successfully!");
        getData();
        closeModal();
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update package rate");
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
          await updateData( VITE_SIA_PACKAGE_RATES_URL, id, updatedPayload);
          toast.success("Package rate inactivated");
          getData();
        } catch (error) {
          console.error("Inactivation error:", error);
          toast.error("Failed to inactivate");
        }
      }
    }
  };

  const columns = [
    "Tarrif ID",
    "Package",
    "Compilance",
    "Stage Level Status Check",
    "Slab Level 1 Rate",
    "Base Rate",
    "Status",
  ];

  const filteredData = response
    .filter(
      (item) =>
        item?.PACKAGE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item?.TARRIF_ID?.toString().includes(searchQuery)
    )
    .sort((a, b) => a.ID - b.ID);

  const data = filteredData.map((item) => ({
    id: item.ID,
    "Tarrif ID": item.TARRIF_ID,
    "Package": item.PACKAGE,
    "Compilance": item.COMPILANCE,
    "Stage Level Status Check": item.STAGE_LEVEL_STATUS_CHECK,
    "Slab Level 1 Rate": item.SLAB_LEVEL_1_RATE,
    "Base Rate": item.BASE_RATE,
    "Status": item.STATUS,
  }));

  useEffect(() => {
    getData();
  }, [statusFilter]);

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader
        title="Package Rates"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search by Package or Tarrif ID"
      />

      <ToggleBtn statusFilter={statusFilter} setStatusFilter={setStatusFilter} />

      {loading ? (
        <div className="p-4 text-center">Loading data...</div>
      ) : (
        <ActionTable
          columns={columns}
          data={data}
          handleUpdate={handleUpdate}
          handleInactive={handleInactive}
          title="Package Rates"
        />
      )}

      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Row"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>

      {/* Add Modal */}
      <ModalPopup title="Package Rates" sideImg={sideImg} modalName="addProduct">
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Tarrif ID"
            type="text"
            value={payload.TARRIF_ID}
            onChange={(e) => setPayload({ ...payload, TARRIF_ID: e.target.value })}
            required
          />
          <Input
            name="Package"
            type="text"
            value={payload.PACKAGE}
            onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
            required
          />
          <Dropdown
            name="Compilance"
            value={payload.COMPILANCE}
            options={["P", "F"]}
            onChange={(e) => setPayload({ ...payload, COMPILANCE: e.target.value })}
            required
          />
          <Input
            name="Stage Level Status Check"
            type="text"
            value={payload.STAGE_LEVEL_STATUS_CHECK}
            onChange={(e) =>
              setPayload({ ...payload, STAGE_LEVEL_STATUS_CHECK: e.target.value })
            }
          />
          <Input
            name="Slab Level 1 Rate"
            type="number"
            value={payload.SLAB_LEVEL_1_RATE}
            onChange={(e) =>
              setPayload({ ...payload, SLAB_LEVEL_1_RATE: e.target.value })
            }
            step="0.01"
          />
          <Input
            name="Base Rate"
            type="number"
            value={payload.BASE_RATE}
            onChange={(e) => setPayload({ ...payload, BASE_RATE: e.target.value })}
            step="0.01"
          />
          <Input
            name="Created User"
            type="text"
            value={payload.CREATED_USER}
            onChange={(e) => setPayload({ ...payload, CREATED_USER: e.target.value })}
            required
          />
          <Input
            name="Created Date"
            type="date"
            value={payload.CREATED_DATE}
            onChange={(e) => setPayload({ ...payload, CREATED_DATE: e.target.value })}
            required
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
        title="Update Package Rates"
        sideImg={sideImg}
        modalName="updateProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Tarrif ID"
            type="text"
            value={payload.TARRIF_ID}
            onChange={(e) => setPayload({ ...payload, TARRIF_ID: e.target.value })}
            disabled
          />
          <Input
            name="Package"
            type="text"
            value={payload.PACKAGE}
            onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
          />
          <Dropdown
            name="Compilance"
            value={payload.COMPILANCE}
            options={["P", "F"]}
            onChange={(e) => setPayload({ ...payload, COMPILANCE: e.target.value })}
          />
          <Input
            name="Stage Level Status Check"
            type="text"
            value={payload.STAGE_LEVEL_STATUS_CHECK}
            onChange={(e) =>
              setPayload({ ...payload, STAGE_LEVEL_STATUS_CHECK: e.target.value })
            }
          />
          <Input
            name="Slab Level 1 Rate"
            type="number"
            value={payload.SLAB_LEVEL_1_RATE}
            onChange={(e) =>
              setPayload({ ...payload, SLAB_LEVEL_1_RATE: e.target.value })
            }
            step="0.01"
          />
          <Input
            name="Base Rate"
            type="number"
            value={payload.BASE_RATE}
            onChange={(e) => setPayload({ ...payload, BASE_RATE: e.target.value })}
            step="0.01"
          />
          <Dropdown
            name="Status"
            value={payload.STATUS}
            options={["Active", "Inactive"]}
            onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
          />
          <Input
            name="Updated User"
            type="text"
            value={payload.UPDATED_USER}
            onChange={(e) => setPayload({ ...payload, UPDATED_USER: e.target.value })}
            required
          />
          <Input
            name="Updated Date"
            type="date"
            value={payload.UPDATED_DATE}
            onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })}
            required
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

export default PackageRates;