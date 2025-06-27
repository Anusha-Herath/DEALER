// import React, { useEffect, useState } from "react";
// import PageHeader from "../../components/common/PageHeader";
// import ActionTable from "../../components/common/ActionTable";
// import { useModal } from "../../context/ModalContext";
// import PrimaryBtn from "../../components/common/PrimaryBtn";
// import ModalPopup from "../../components/common/ModalPopup";
// import sideImg from "../../assets/images/userSideImg.png";
// import { PlusCircle } from "lucide-react";
// import {
//   fetchData,
//   fetchInactiveData,
//   submitData,
//   updateData,
// } from "../../services/fetchData";
// import Input from "../../components/common/Input";
// import { toast, ToastContainer } from "react-toastify";
// import Dropdown from "../../components/common/Dropdown";
// import Swal from "sweetalert2";
// import ToggleBtn from "../../components/common/ToggleBtn";
// import { validations } from "../../utils/FormValidations";

// function PackageRates() {
//   const { openModal, closeModal } = useModal();
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   const VITE_SIA_PACKAGE_RATES_URL = "http://127.0.0.1:8000/api/package-rates/";
//   const ruleName = "packageRates";

//   const initialPayload = {
//     ID: "",
//     PACKAGE_RATE_ID: "",
//     TARRIF_ID: "",
//     PACKAGE: "",
//     COMPLIANCE: "",
//     STAGE_LEVEL_STATUS_CHECK: "",
//     SLAB_LEVEL_1_RATE: "",
//     BASE_RATE: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async () => {
//     const errors = validations(payload, ruleName, false, response);
//     if (errors.length > 0) return errors.forEach((e) => toast.warning(e));

//     try {
//       await submitData(VITE_SIA_PACKAGE_RATES_URL, payload);
//       toast.success("Data submitted successfully!");
//       getData();
//       closeModal();
//     } catch (error) {
//       toast.error("Error submitting data");
//     }
//   };

//   const handleAddData = () => {
//     setPayload(initialPayload);
//     openModal("addPackage");
//   };

//   useEffect(() => {
//     getData();
//     // eslint-disable-next-line
//   }, [statusFilter]);

//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_PACKAGE_RATES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_PACKAGE_RATES_URL);
//     }
//     setResponse(data);
//   };

//   const columns = [
//     "Package Rate ID",
//     "Tariff ID",
//     "Package",
//     "Compliance",
//     "Stage Level Status Check",
//     "Slab Level 1 Rate",
//     "Base Rate",
//     "Status",
//   ];

//   const data = response
//     .filter(
//       (item) =>
//         item.PACKAGE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.TARRIF_ID?.toString().includes(searchQuery) ||
//         item.PACKAGE_RATE_ID?.toString().includes(searchQuery)
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "Package Rate ID": item.PACKAGE_RATE_ID,
//       "Tariff ID": item.TARRIF_ID,
//       Package: item.PACKAGE,
//       Compliance: item.COMPLIANCE,
//       "Stage Level Status Check": item.STAGE_LEVEL_STATUS_CHECK,
//       "Slab Level 1 Rate": item.SLAB_LEVEL_1_RATE,
//       "Base Rate": item.BASE_RATE,
//       Status: item.STATUS,
//     }));

//   const handleUpdate = async (id) => {
//     toast.info(`Fetching data for update...`);
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData) {
//       setPayload({
//         ...selectedData,
//         UPDATED_USER: "",
//         UPDATED_DATE: "",
//       });
//       openModal("updatePackage");
//     } else {
//       toast.error("Data not found for the selected ID.");
//     }
//   };

//   const handleUpdatedData = async () => {
//     const errors = validations(payload, ruleName, true);
//     if (errors.length > 0) return errors.forEach((e) => toast.warning(e));

//     try {
//       if (payload.ID) {
//         await updateData(VITE_SIA_PACKAGE_RATES_URL, payload.ID, payload);
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
//         text: "This cannot be reverted.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#34a853",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, inactivate it!",
//       });

//       if (result.isConfirmed) {
//         try {
//           const updatedPayload = { ...selectedData, STATUS: "Inactive" };
//           await updateData(VITE_SIA_PACKAGE_RATES_URL, id, updatedPayload);
//           toast.success("Package Rate Inactivated");
//           getData();
//         } catch (error) {
//           toast.error("Failed to Inactivate");
//         }
//       } else {
//         toast.info("Inactivation cancelled");
//       }
//     }
//   };

//   return (
//     <div className="block">
//       <ToastContainer position="top-center" theme="colored" />
//       <PageHeader
//         title="Package Rates"
//         placeholder="Search by Package, Tariff ID, or Package Rate ID"
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       <ToggleBtn
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//       />

//       <ActionTable
//         columns={columns}
//         data={data}
//         title="Package Rates List"
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//       />

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Package Rate"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>

//       {/* Add Modal */}
//       <ModalPopup
//         title="Add Package Rate"
//         sideImg={sideImg}
//         modalName="addPackage"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Package Rate ID"
//             value={payload.PACKAGE_RATE_ID}
//             onChange={(e) => setPayload({ ...payload, PACKAGE_RATE_ID: e.target.value })}
//           />
//           <Input
//             name="Tariff ID"
//             value={payload.TARRIF_ID}
//             onChange={(e) => setPayload({ ...payload, TARRIF_ID: e.target.value })}
//           />
//           <Input
//             name="Package"
//             value={payload.PACKAGE}
//             onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
//           />
//           <Dropdown
//             name="Compliance"
//             value={payload.COMPLIANCE}
//             status={["PASS", "FAIL"]}
//             onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
//           />
//           <Dropdown
//             name="Stage Level Status Check"
//             value={payload.STAGE_LEVEL_STATUS_CHECK}
//             status={["YES", "NO"]}
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
//           <button className="w-32 p-2 text-white rounded-md bg-success" onClick={handleSubmit}>
//             Submit
//           </button>
//           <button className="w-32 p-2 text-white rounded-md bg-warning" onClick={closeModal}>
//             Cancel
//           </button>
//         </div>
//       </ModalPopup>

//       {/* Update Modal */}
//       <ModalPopup
//         title="Update Package Rate"
//         sideImg={sideImg}
//         modalName="updatePackage"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Package Rate ID"
//             value={payload.PACKAGE_RATE_ID}
//             disabled
//           />
//           <Input
//             name="Tariff ID"
//             value={payload.TARRIF_ID}
//             disabled
//           />
//           <Input
//             name="Package"
//             value={payload.PACKAGE}
//             onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
//           />
//           <Dropdown
//             name="Compliance"
//             value={payload.COMPLIANCE}
//             status={["PASS", "FAIL"]}
//             onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
//           />
//           <Dropdown
//             name="Stage Level Status Check"
//             value={payload.STAGE_LEVEL_STATUS_CHECK}
//             status={["YES", "NO"]}
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
//             name="Updated User"
//             value={payload.UPDATED_USER}
//             onChange={(e) => setPayload({ ...payload, UPDATED_USER: e.target.value })}
//           />
//           <Input
//             name="Updated Date"
//             type="date"
//             value={payload.UPDATED_DATE}
//             onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })}
//           />
//           <Dropdown
//             name="Status"
//             value={payload.STATUS}
//             status={["Active", "Inactive"]}
//             onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
//           />
//         </div>
//         <div className="flex justify-center w-full gap-10 mt-10">
//           <button className="w-32 p-2 text-white rounded-md bg-primary" onClick={handleUpdatedData}>
//             Update
//           </button>
//           <button className="w-32 p-2 text-white rounded-md bg-warning" onClick={closeModal}>
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
import { useModal } from "../../context/ModalContext";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import ModalPopup from "../../components/common/ModalPopup";
import sideImg from "../../assets/images/userSideImg.png";
import { PlusCircle } from "lucide-react";
import {
  fetchData,
  fetchInactiveData,
  submitData,
  updateData,
} from "../../services/fetchData";
import Input from "../../components/common/Input";
import { toast, ToastContainer } from "react-toastify";
import Dropdown from "../../components/common/Dropdown";
import Swal from "sweetalert2";
import ToggleBtn from "../../components/common/ToggleBtn";

function PackageRates() {
  const { openModal, closeModal } = useModal();
  const [response, setResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const VITE_SIA_PACKAGE_RATES_URL = "http://127.0.0.1:8000/api/package-rates/";

  const initialPayload = {
    ID: "",
    PACKAGE_RATE_ID: "",
    TARRIF_ID: "",
    PACKAGE: "",
    COMPLIANCE: "",
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

  const handleSubmit = async () => {
    try {
      // Prepare the data for submission
      const submissionData = {
        ...payload,
        SLAB_LEVEL_1_RATE: payload.SLAB_LEVEL_1_RATE ? Number(payload.SLAB_LEVEL_1_RATE) : 0,
        BASE_RATE: payload.BASE_RATE ? Number(payload.BASE_RATE) : 0
      };

      const response = await submitData(VITE_SIA_PACKAGE_RATES_URL, submissionData);
      
      if (response.status === 200 || response.status === 201) {
        toast.success("Package Rate added successfully!");
        getData();
        closeModal();
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(`Failed to add Package Rate: ${error.message}`);
    }
  };

  const handleAddData = () => {
    setPayload(initialPayload);
    openModal("addPackage");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [statusFilter]);

  const getData = async () => {
    try {
      let data = [];
      if (statusFilter === "Active") {
        data = await fetchData(VITE_SIA_PACKAGE_RATES_URL);
      } else {
        data = await fetchInactiveData(VITE_SIA_PACKAGE_RATES_URL);
      }
      setResponse(data);
    } catch (error) {
      toast.error("Failed to fetch package rates");
      console.error("Fetch error:", error);
    }
  };

  const columns = [
    "Package Rate ID",
    "Tariff ID",
    "Package",
    "Compliance",
    "Stage Level Status Check",
    "Slab Level 1 Rate",
    "Base Rate",
    "Status",
  ];

  const data = response
    .filter(
      (item) =>
        item.PACKAGE?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.TARRIF_ID?.toString().includes(searchQuery) ||
        item.PACKAGE_RATE_ID?.toString().includes(searchQuery)
    )
    .sort((a, b) => a.ID - b.ID)
    .map((item) => ({
      id: item.ID,
      "Package Rate ID": item.PACKAGE_RATE_ID,
      "Tariff ID": item.TARRIF_ID,
      Package: item.PACKAGE,
      Compliance: item.COMPLIANCE,
      "Stage Level Status Check": item.STAGE_LEVEL_STATUS_CHECK,
      "Slab Level 1 Rate": item.SLAB_LEVEL_1_RATE,
      "Base Rate": item.BASE_RATE,
      Status: item.STATUS,
    }));

  const handleUpdate = async (id) => {
    toast.info("Fetching package rate data...");
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData) {
      setPayload({
        ID: selectedData.ID,
        PACKAGE_RATE_ID: selectedData.PACKAGE_RATE_ID,
        TARRIF_ID: selectedData.TARRIF_ID,
        PACKAGE: selectedData.PACKAGE,
        COMPLIANCE: selectedData.COMPLIANCE,
        STAGE_LEVEL_STATUS_CHECK: selectedData.STAGE_LEVEL_STATUS_CHECK,
        SLAB_LEVEL_1_RATE: selectedData.SLAB_LEVEL_1_RATE,
        BASE_RATE: selectedData.BASE_RATE,
        CREATED_DATE: selectedData.CREATED_DATE,
        CREATED_USER: selectedData.CREATED_USER,
        UPDATED_DATE: selectedData.UPDATED_DATE,
        UPDATED_USER: selectedData.UPDATED_USER,
        STATUS: selectedData.STATUS,
      });
      openModal("updatePackage");
    } else {
      toast.error("Package rate not found");
    }
  };

  const handleUpdatedData = async () => {
    try {
      if (payload.ID) {
        const updatedData = await updateData(VITE_SIA_PACKAGE_RATES_URL, payload.ID, payload);
        toast.success("Package Rate updated successfully!");
        getData();
        closeModal();
      }
    } catch (error) {
      toast.error("Error updating package rate");
      console.error("Update error:", error);
    }
  };

  const handleInactive = async (id) => {
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData && selectedData.STATUS === "Active") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This cannot be reverted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34a853",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, inactivate it!",
      });

      if (result.isConfirmed) {
        try {
          const updatedPayload = { ...selectedData, STATUS: "Inactive" };
          await updateData(VITE_SIA_PACKAGE_RATES_URL, id, updatedPayload);
          toast.success("Package Rate inactivated!");
          getData();
        } catch (error) {
          toast.error("Failed to inactivate package rate");
        }
      }
    }
  };

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader
        title="Package Rates"
        placeholder="Search by Package, Tariff ID, or Package Rate ID"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ToggleBtn
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ActionTable
        columns={columns}
        data={data}
        title="Package Rates List"
        handleUpdate={handleUpdate}
        handleInactive={handleInactive}
      />

      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Package Rate"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>

      {/* Add Modal */}
      <ModalPopup
        title="Add Package Rate"
        sideImg={sideImg}
        modalName="addPackage"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Package Rate ID"
            value={payload.PACKAGE_RATE_ID}
            onChange={(e) => setPayload({ ...payload, PACKAGE_RATE_ID: e.target.value })}
          />
          <Input
            name="Tariff ID"
            value={payload.TARRIF_ID}
            onChange={(e) => setPayload({ ...payload, TARRIF_ID: e.target.value })}
          />
          <Input
            name="Package"
            value={payload.PACKAGE}
            onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
          />
          <Dropdown
            name="Compliance"
            value={payload.COMPLIANCE}
            status={["PASS", "FAIL"]}
            onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
          />
          <Dropdown
            name="Stage Level Status Check"
            value={payload.STAGE_LEVEL_STATUS_CHECK}
            status={["YES", "NO"]}
            onChange={(e) => setPayload({ ...payload, STAGE_LEVEL_STATUS_CHECK: e.target.value })}
          />
          <Input
            name="Slab Level 1 Rate"
            type="number"
            value={payload.SLAB_LEVEL_1_RATE}
            onChange={(e) => setPayload({ ...payload, SLAB_LEVEL_1_RATE: e.target.value })}
          />
          <Input
            name="Base Rate"
            type="number"
            value={payload.BASE_RATE}
            onChange={(e) => setPayload({ ...payload, BASE_RATE: e.target.value })}
          />
          <Input
            name="Created User"
            value={payload.CREATED_USER}
            onChange={(e) => setPayload({ ...payload, CREATED_USER: e.target.value })}
          />
          <Input
            name="Created Date"
            type="date"
            value={payload.CREATED_DATE}
            onChange={(e) => setPayload({ ...payload, CREATED_DATE: e.target.value })}
          />
        </div>
        <div className="flex justify-center w-full gap-10 mt-10">
          <button className="w-32 p-2 text-white rounded-md bg-success" onClick={handleSubmit}>
            Submit
          </button>
          <button className="w-32 p-2 text-white rounded-md bg-warning" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </ModalPopup>

      {/* Update Modal */}
      <ModalPopup
        title="Update Package Rate"
        sideImg={sideImg}
        modalName="updatePackage"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Package Rate ID"
            value={payload.PACKAGE_RATE_ID}
            disabled
          />
          <Input
            name="Tariff ID"
            value={payload.TARRIF_ID}
            disabled
          />
          <Input
            name="Package"
            value={payload.PACKAGE}
            onChange={(e) => setPayload({ ...payload, PACKAGE: e.target.value })}
          />
          <Dropdown
            name="Compliance"
            value={payload.COMPLIANCE}
            status={["PASS", "FAIL"]}
            onChange={(e) => setPayload({ ...payload, COMPLIANCE: e.target.value })}
          />
          <Dropdown
            name="Stage Level Status Check"
            value={payload.STAGE_LEVEL_STATUS_CHECK}
            status={["YES", "NO"]}
            onChange={(e) => setPayload({ ...payload, STAGE_LEVEL_STATUS_CHECK: e.target.value })}
          />
          <Input
            name="Slab Level 1 Rate"
            type="number"
            value={payload.SLAB_LEVEL_1_RATE}
            onChange={(e) => setPayload({ ...payload, SLAB_LEVEL_1_RATE: e.target.value })}
          />
          <Input
            name="Base Rate"
            type="number"
            value={payload.BASE_RATE}
            onChange={(e) => setPayload({ ...payload, BASE_RATE: e.target.value })}
          />
          <Input
            name="Updated User"
            value={payload.UPDATED_USER}
            onChange={(e) => setPayload({ ...payload, UPDATED_USER: e.target.value })}
          />
          <Input
            name="Updated Date"
            type="date"
            value={payload.UPDATED_DATE}
            onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })}
          />
          <Dropdown
            name="Status"
            value={payload.STATUS}
            status={["Active", "Inactive"]}
            onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
          />
        </div>
        <div className="flex justify-center w-full gap-10 mt-10">
          <button className="w-32 p-2 text-white rounded-md bg-primary" onClick={handleUpdatedData}>
            Update
          </button>
          <button className="w-32 p-2 text-white rounded-md bg-warning" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </ModalPopup>
    </div>
  );
}

export default PackageRates;