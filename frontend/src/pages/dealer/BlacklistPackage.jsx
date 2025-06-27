

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

// function BlacklistPackage() {
//   const { openModal, closeModal } = useModal();
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   const VITE_SIA_BLACKLIST_PACKAGES_URL = 'http://127.0.0.1:8000/api/blacklist/';

//   const initialPayload = {
//     ID: "",
//     TARIFF_ID: "",
//     PACKAGE_NAME: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async () => {
//     try {
//       await submitData(VITE_SIA_BLACKLIST_PACKAGES_URL, payload);
//       toast.success("Data submitted successfully!");
//       getData();
//       closeModal();
//     } catch (error) {
//       console.error("Submit error:", error);
//       toast.error("Error submitting data");
//     }
//   };

//   const handleAddData = () => {
//     setPayload(initialPayload);
//     openModal("addProduct");
//   };

//   useEffect(() => {
//     getData().catch((err) => console.error("Data fetch error:", err));
//   }, [statusFilter]);

//   const columns = ["Tariff ID", "Package Name", "Status"];

//   const data = Array.isArray(response)
//     ? response
//         .filter((item) =>
//           item.PACKAGE_NAME?.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//         .sort((a, b) => a.ID - b.ID)
//         .map((item) => ({
//           id: item.ID,
//           "Tariff ID": item.TARIFF_ID,
//           "Package Name": item.PACKAGE_NAME,
//           Status: item.STATUS,
//         }))
//     : [];

//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_BLACKLIST_PACKAGES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_BLACKLIST_PACKAGES_URL);
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
//         await updateData(VITE_SIA_BLACKLIST_PACKAGES_URL, payload.ID, payload);
//         toast.success("Data updated successfully!");
//         getData();
//         closeModal();
//       }
//     } catch (error) {
//       console.error("Update error:", error);
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
//           await updateData(VITE_SIA_BLACKLIST_PACKAGES_URL, id, updatedPayload);
//           toast.success("Rule Inactivated");
//           getData();
//         } catch (error) {
//           console.error("Inactivate error:", error);
//           toast.error("Failed to Inactivate");
//         }
//       }
//     }
//   };

//   return (
//     <div className="block">
//       <ToastContainer position="top-center" theme="colored" />

//       <PageHeader
//         title="Blacklist Package"
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
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//         title="Blacklist Package"
//       />

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Package"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>

//       {/* Add Modal */}
//       <ModalPopup
//         title="Blacklist Package"
//         sideImg={sideImg}
//         modalName="addProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Tariff ID"
//             type="text"
//             value={payload.TARIFF_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, TARIFF_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Package Name"
//             type="text"
//             value={payload.PACKAGE_NAME}
//             onChange={(e) =>
//               setPayload({ ...payload, PACKAGE_NAME: e.target.value })
//             }
//           />
//           <Input
//             name="Created user"
//             type="text"
//             value={payload.CREATED_USER}
//             onChange={(e) =>
//               setPayload({ ...payload, CREATED_USER: e.target.value })
//             }
//           />
//           <Input
//             name="Created date"
//             type="date"
//             value={payload.CREATED_DATE}
//             onChange={(e) =>
//               setPayload({ ...payload, CREATED_DATE: e.target.value })
//             }
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
//         title="Update Blacklist Package"
//         sideImg={sideImg}
//         modalName="updateProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="Tariff ID"
//             type="text"
//             value={payload.TARIFF_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, TARIFF_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Package Name"
//             type="text"
//             value={payload.PACKAGE_NAME}
//             onChange={(e) =>
//               setPayload({ ...payload, PACKAGE_NAME: e.target.value })
//             }
//           />
//           <Dropdown
//             name="Status"
//             value={payload.STATUS}
//             status={["Active", "Inactive"]}
//             onChange={(e) =>
//               setPayload({ ...payload, STATUS: e.target.value })
//             }
//           />
//           <Input
//             name="Updated user"
//             type="text"
//             value={payload.UPDATED_USER}
//             onChange={(e) =>
//               setPayload({ ...payload, UPDATED_USER: e.target.value })
//             }
//           />
//           <Input
//             name="Updated date"
//             type="date"
//             value={payload.UPDATED_DATE}
//             onChange={(e) =>
//               setPayload({ ...payload, UPDATED_DATE: e.target.value })
//             }
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

// export default BlacklistPackage;

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

// function BlacklistPackage() {
//   const { openModal, closeModal } = useModal();
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   // API URL
//   const VITE_SIA_BLACKLIST_PACKAGES_URL = 'http://127.0.0.1:8000/api/blacklist/';

//   // Initial payload with BLP_ID added
//   const initialPayload = {
//     ID: "",
//     BLP_ID: "",
//     TARIFF_ID: "",
//     PACKAGE_NAME: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };
//   const [payload, setPayload] = useState(initialPayload);
//   const ruleName = "blacklistPackages";

//   // Handle form submission with validation
//   const handleSubmit = async () => {
//     const errors = validations(payload, ruleName, false, response);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return; // Prevent submission
//     }
//     try {
//       const response = await submitData(VITE_SIA_BLACKLIST_PACKAGES_URL, payload);
//       toast.success("Data submitted successfully!", response);
//       getData(); // Refresh the table data
//       closeModal();
//     } catch (error) {
//       toast.error("Error submitting data:", error);
//     }
//   };

//   const handleAddData = () => {
//     setPayload(initialPayload);
//     openModal("addProduct");
//   };

//   useEffect(() => {
//     getData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [statusFilter]);

//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_BLACKLIST_PACKAGES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_BLACKLIST_PACKAGES_URL);
//     }
//     setResponse(data);
//   };

//   // Updated columns with BLP_ID
//   const columns = [
//     "BLP ID",
//     "Tariff ID",
//     "Package Name",
//     "Status",
//   ];
  
//   const data = response
//     .filter((item) =>
//       item.TARIFF_ID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.PACKAGE_NAME?.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "BLP ID": item.BLP_ID,
//       "Tariff ID": item.TARIFF_ID,
//       "Package Name": item.PACKAGE_NAME,
//       Status: item.STATUS,
//     }));

//   // Fetch data for update
//   const handleUpdate = async (id) => {
//     toast.info(`Fetching data for update...`);
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData) {
//       setPayload({
//         ID: selectedData.ID,
//         BLP_ID: selectedData.BLP_ID,
//         TARIFF_ID: selectedData.TARIFF_ID,
//         PACKAGE_NAME: selectedData.PACKAGE_NAME,
//         UPDATED_USER: selectedData.UPDATED_USER,
//         STATUS: selectedData.STATUS,
//       });
//       openModal("updateProduct");
//     } else {
//       toast.error("Data not found for the selected ID.");
//     }
//   };

//   // Update data with validation
//   const handleUpdatedData = async () => {
//     const errors = validations(payload, ruleName, true);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return; // Prevent update
//     }
//     try {
//       if (payload.ID) {
//         const updatedData = await updateData(
//           VITE_SIA_BLACKLIST_PACKAGES_URL,
//           payload.ID,
//           payload
//         );
//         toast.success("Data updated successfully!", updatedData);
//         getData(); // Refresh the table data
//         closeModal();
//       }
//     } catch (error) {
//       toast.error("Error updating data:", error);
//     }
//   };

//   // Handle inactivation
//   const handleInactive = async (id) => {
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData && selectedData.STATUS === "Active") {
//       const result = await Swal.fire({
//         title: "Are you sure?",
//         text: "This cannot be revert",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#34a853",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, inactivate it!",
//       });

//       if (result.isConfirmed) {
//         try {
//           const updatedPayload = { ...selectedData, STATUS: "Inactive" };
//           await updateData(VITE_SIA_BLACKLIST_PACKAGES_URL, id, updatedPayload);
//           toast.success("Package Inactivated");
//           getData(); // Refresh table
//         } catch (error) {
//           toast.error("Failed to Inactivate", error);
//         }
//       } else {
//         toast.info("Inactivation cancelled");
//       }
//     }
//   };

//   return (
//     <div className="block">
//       <ToastContainer position="top-right" theme="colored" />
//       <PageHeader
//         title="Blacklist Package"
//         placeholder="Search by tariff ID or package name"
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       {/* Active inactive toggle button */}
//       <ToggleBtn
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//       />
      
//       <ActionTable
//         columns={columns}
//         data={data}
//         title={"Blacklist Packages Report"}
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//       />

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Package"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>
      
//       {/* Add new Data modal */}
//       <ModalPopup
//         title="Blacklist Package"
//         sideImg={sideImg}
//         modalName="addProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10">
//           <Input
//             name="BLP ID"
//             type="text"
//             value={payload.BLP_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, BLP_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Tariff ID"
//             type="text"
//             value={payload.TARIFF_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, TARIFF_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Package Name"
//             type="text"
//             value={payload.PACKAGE_NAME}
//             onChange={(e) =>
//               setPayload({ ...payload, PACKAGE_NAME: e.target.value })
//             }
//           />
//           <Input
//             name="Created User"
//             type="text"
//             value={payload.CREATED_USER}
//             onChange={(e) =>
//               setPayload({ ...payload, CREATED_USER: e.target.value })
//             }
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

//       {/* Update modal */}
//       <ModalPopup
//         title="Update Blacklist Package"
//         sideImg={sideImg}
//         modalName="updateProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10">
//           <Input
//             name="BLP ID"
//             type="text"
//             value={payload.BLP_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, BLP_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Tariff ID"
//             type="text"
//             value={payload.TARIFF_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, TARIFF_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Package Name"
//             type="text"
//             value={payload.PACKAGE_NAME}
//             onChange={(e) =>
//               setPayload({ ...payload, PACKAGE_NAME: e.target.value })
//             }
//           />
//           <Dropdown
//             name="Status"
//             value={payload.STATUS}
//             status={["Active", "Inactive"]}
//             onChange={(e) =>
//               setPayload({
//                 ...payload,
//                 STATUS: e.target.value,
//               })
//             }
//           />
//           <Input
//             name="Updated User"
//             type="text"
//             value={payload.UPDATED_USER}
//             onChange={(e) =>
//               setPayload({ ...payload, UPDATED_USER: e.target.value })
//             }
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

// export default BlacklistPackage;

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

function BlacklistPackage() {
  const { openModal, closeModal } = useModal();
  const [response, setResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const VITE_SIA_BLACKLIST_PACKAGES_URL = 'http://127.0.0.1:8000/api/blacklist/';

  const initialPayload = {
    ID: "",
    BLP_ID: "",
    TARIFF_ID: "",
    PACKAGE_NAME: "",
    CREATED_DATE: "",
    CREATED_USER: "",
    UPDATED_DATE: "",
    UPDATED_USER: "",
    STATUS: "ACTIVE",
  };

  const [payload, setPayload] = useState(initialPayload);

  const handleSubmit = async () => {
    try {
      const response = await submitData(VITE_SIA_BLACKLIST_PACKAGES_URL, payload);
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
    // eslint-disable-next-line
  }, [statusFilter]);

  const getData = async () => {
    let data = [];
    if (statusFilter === "Active") {
      data = await fetchData(VITE_SIA_BLACKLIST_PACKAGES_URL);
    } else {
      data = await fetchInactiveData(VITE_SIA_BLACKLIST_PACKAGES_URL);
    }
    setResponse(data);
  };

  const columns = [
    "BLP ID",
    "Tariff ID",
    "Package Name",
    "Status",
  ];

  const data = response
    .filter(
      (item) =>
        item.TARIFF_ID?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.PACKAGE_NAME?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.ID - b.ID)
    .map((item) => ({
      id: item.ID,
      "BLP ID": item.BLP_ID,
      "Tariff ID": item.TARIFF_ID,
      "Package Name": item.PACKAGE_NAME,
      Status: item.STATUS,
    }));

  const handleUpdate = async (id) => {
    toast.info(`Fetching data for update...`);
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData) {
      setPayload({
        ID: selectedData.ID,
        BLP_ID: selectedData.BLP_ID,
        TARIFF_ID: selectedData.TARIFF_ID,
        PACKAGE_NAME: selectedData.PACKAGE_NAME,
        CREATED_DATE: selectedData.CREATED_DATE,
        CREATED_USER: selectedData.CREATED_USER,
        UPDATED_DATE: selectedData.UPDATED_DATE,
        UPDATED_USER: selectedData.UPDATED_USER,
        STATUS: selectedData.STATUS,
      });
      openModal("updateProduct");
    } else {
      toast.error("Data not found for the selected ID.");
    }
  };

  const handleUpdatedData = async () => {
    try {
      if (payload.ID) {
        const updatedData = await updateData(VITE_SIA_BLACKLIST_PACKAGES_URL, payload.ID, payload);
        toast.success("Data updated successfully!", updatedData);
        getData();
        closeModal();
      }
    } catch (error) {
      toast.error("Error updating data");
    }
  };

  const handleInactive = async (id) => {
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData && selectedData.STATUS === "ACTIVE") {
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
          const updatedPayload = { ...selectedData, STATUS: "INACTIVE" };
          await updateData(VITE_SIA_BLACKLIST_PACKAGES_URL, id, updatedPayload);
          toast.success("Package Inactivated");
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
        title="Blacklist Packages"
        placeholder="Search by Tariff ID or Package Name"
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
        title="Blacklist Package List"
        handleUpdate={handleUpdate}
        handleInactive={handleInactive}
      />

      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Package"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>

      {/* Add Modal */}
      <ModalPopup
        title="Blacklist Package"
        sideImg={sideImg}
        modalName="addProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="BLP ID"
            type="text"
            value={payload.BLP_ID}
            onChange={(e) => setPayload({ ...payload, BLP_ID: e.target.value })}
          />
          <Input
            name="Tariff ID"
            type="text"
            value={payload.TARIFF_ID}
            onChange={(e) => setPayload({ ...payload, TARIFF_ID: e.target.value })}
          />
          <Input
            name="Package Name"
            type="text"
            value={payload.PACKAGE_NAME}
            onChange={(e) =>
              setPayload({ ...payload, PACKAGE_NAME: e.target.value })
            }
          />
          <Input
            name="Created User"
            type="text"
            value={payload.CREATED_USER}
            onChange={(e) =>
              setPayload({ ...payload, CREATED_USER: e.target.value })
            }
          />
          <Input
            name="Created Date"
            type="date"
            value={payload.CREATED_DATE}
            onChange={(e) =>
              setPayload({ ...payload, CREATED_DATE: e.target.value })
            }
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
        title="Update Blacklist Package"
        sideImg={sideImg}
        modalName="updateProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="BLP ID"
            type="text"
            value={payload.BLP_ID}
            onChange={(e) => setPayload({ ...payload, BLP_ID: e.target.value })}
          />
          <Input
            name="Tariff ID"
            type="text"
            value={payload.TARIFF_ID}
            onChange={(e) => setPayload({ ...payload, TARIFF_ID: e.target.value })}
          />
          <Input
            name="Package Name"
            type="text"
            value={payload.PACKAGE_NAME}
            onChange={(e) =>
              setPayload({ ...payload, PACKAGE_NAME: e.target.value })
            }
          />
          <Dropdown
            name="Status"
            value={payload.STATUS}
            status={["ACTIVE", "INACTIVE"]}
            onChange={(e) =>
              setPayload({ ...payload, STATUS: e.target.value })
            }
          />
          <Input
            name="Updated User"
            type="text"
            value={payload.UPDATED_USER}
            onChange={(e) =>
              setPayload({ ...payload, UPDATED_USER: e.target.value })
            }
          />
          <Input
            name="Updated Date"
            type="date"
            value={payload.UPDATED_DATE}
            onChange={(e) =>
              setPayload({ ...payload, UPDATED_DATE: e.target.value })
            }
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

export default BlacklistPackage;
