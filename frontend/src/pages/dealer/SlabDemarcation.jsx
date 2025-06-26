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
// import { validations } from "../../utils/FormValidations";

// function SlabDemarcation() {
//   const { openModal, closeModal } = useModal();
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   const VITE_SIA_SLAB_DEMARCATION_URL = 'http://127.0.0.1:8000/api/slab_level/';

//   const initialPayload = {
//     ID: "",
//     SLAB_ID: "",
//     SLAB_LEVEL: "",
//     LOWER_RANGE: "",
//     UPPER_RANGE: "",
//     CREATED_DATE: new Date().toISOString().split('T')[0],
//     CREATED_USER: localStorage.getItem("username") || "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };

//   const [payload, setPayload] = useState(initialPayload);
//   const ruleName = "slabDemarcation";

//   const handleSubmit = async () => {
//     const errors = validations(payload, ruleName, false, response);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return;
//     }

//     try {
//       const result = await submitData(VITE_SIA_SLAB_DEMARCATION_URL, payload);
      
//       if (result && result.ID) {
//         toast.success("Slab Demarcation created successfully!");
//         await getData();
//         closeModal();
//       } else {
//         throw new Error("Invalid response from server");
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error(error.message || "Failed to create Slab Demarcation");
//     }
//   };

//   const handleAddData = () => {
//     setPayload({
//       ...initialPayload,
//       CREATED_USER: localStorage.getItem("username") || ""
//     });
//     openModal("addSlabDemarcation");
//   };

//   useEffect(() => {
//     getData();
//   }, [statusFilter]);

//   const getData = async () => {
//     try {
//       let data;
//       if (statusFilter === "Active") {
//         const result = await fetchData(VITE_SIA_SLAB_DEMARCATION_URL);
//         data = Array.isArray(result) ? result : [];
//       } else {
//         const result = await fetchInactiveData(VITE_SIA_SLAB_DEMARCATION_URL);
//         data = Array.isArray(result) ? result : [];
//       }
//       setResponse(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("Failed to load data");
//       setResponse([]);
//     }
//   };

//   const columns = [
//     "Slab ID",
//     "Slab Level", 
//     "Lower Range",
//     "Upper Range",
//     "Status",
//   ];

//   const data = response
//     .filter((item) =>
//       item.SLAB_LEVEL.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.SLAB_ID.toString().includes(searchQuery)
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "Slab ID": item.SLAB_ID,
//       "Slab Level": item.SLAB_LEVEL,
//       "Lower Range": item.LOWER_RANGE,
//       "Upper Range": item.UPPER_RANGE,
//       "Status": item.STATUS,
//     }));

//   const handleUpdate = async (id) => {
//     toast.info("Fetching data for update...");
//     const selectedData = response.find((item) => item.ID === id);
    
//     if (selectedData) {
//       setPayload({
//         ...selectedData,
//         UPDATED_USER: localStorage.getItem("username") || "",
//       });
//       openModal("updateSlabDemarcation");
//     } else {
//       toast.error("Data not found for the selected ID.");
//     }
//   };

//   const handleUpdatedData = async () => {
//     const errors = validations(payload, ruleName, true);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return;
//     }

//     try {
//       if (payload.ID) {
//         const result = await updateData(
//           VITE_SIA_SLAB_DEMARCATION_URL,
//           payload.ID,
//           {
//             ...payload,
//             UPDATED_DATE: new Date().toISOString().split('T')[0]
//           }
//         );

//         if (result && result.ID) {
//           toast.success("Slab Demarcation updated successfully!");
//           await getData();
//           closeModal();
//         } else {
//           throw new Error("Invalid response from server");
//         }
//       }
//     } catch (error) {
//       console.error("Update error:", error);
//       toast.error(error.message || "Failed to update Slab Demarcation");
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
//           await updateData(VITE_SIA_SLAB_DEMARCATION_URL, id, updatedPayload);
//           toast.success("Slab Demarcation Inactivated");
//           await getData();
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
//         title="Slab Demarcation"
//         placeholder="Search by slab level or ID"
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
//         title="Slab Demarcation List"
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//       />

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Slab Level"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>

//       {/* Add Modal */}
//       <ModalPopup
//         title="Slab Demarcation"
//         sideImg={sideImg}
//         modalName="addSlabDemarcation"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10">
//           <Input
//             name="Slab ID"
//             type="text"
//             value={payload.SLAB_ID}
//             onChange={(e) => setPayload({ ...payload, SLAB_ID: e.target.value })}
//           />
//           <Input
//             name="Slab Level"
//             type="text"
//             value={payload.SLAB_LEVEL}
//             onChange={(e) => setPayload({ ...payload, SLAB_LEVEL: e.target.value })}
//           />
//           <Input
//             name="Lower Range"
//             type="number"
//             value={payload.LOWER_RANGE}
//             onChange={(e) => setPayload({ ...payload, LOWER_RANGE: e.target.value })}
//           />
//           <Input
//             name="Upper Range"
//             type="number"
//             value={payload.UPPER_RANGE}
//             onChange={(e) => setPayload({ ...payload, UPPER_RANGE: e.target.value })}
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
//         title="Update Slab Demarcation"
//         sideImg={sideImg}
//         modalName="updateSlabDemarcation"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10">
//           <Input
//             name="Slab ID"
//             type="text"
//             value={payload.SLAB_ID}
//             disabled
//           />
//           <Input
//             name="Slab Level"
//             type="text"
//             value={payload.SLAB_LEVEL}
//             onChange={(e) => setPayload({ ...payload, SLAB_LEVEL: e.target.value })}
//           />
//           <Input
//             name="Lower Range"
//             type="number"
//             value={payload.LOWER_RANGE}
//             onChange={(e) => setPayload({ ...payload, LOWER_RANGE: e.target.value })}
//           />
//           <Input
//             name="Upper Range"
//             type="number"
//             value={payload.UPPER_RANGE}
//             onChange={(e) => setPayload({ ...payload, UPPER_RANGE: e.target.value })}
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
//           <Dropdown
//             name="Status"
//             value={payload.STATUS}
//             status={["Active", "Inactive"]}
//             onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
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

// export default SlabDemarcation;

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

function SlabDemarcation() {
  const { openModal, closeModal } = useModal();

  // creating a state to setData
  const [response, setResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  //add API URL here for easy access for all the functions in this page
  const VITE_SIA_SLAB_DEMARCATION_URL = 'http://127.0.0.1:8000/api/slab_level/';

  const initialPayload = {
    ID: "",
    SLAB_ID:"",
    SLAB_LEVEL: "",
    LOWER_RANGE: "",
    UPPER_RANGE: "",
    CREATED_DATE: "",
    CREATED_USER: "",
    UPDATED_DATE: "",
    UPDATED_USER: "",
    STATUS: "ACTIVE",
  };

  // create a state object to set the data
  const [payload, setPayload] = useState(initialPayload);

  // handle the form submission to add the data
  const handleSubmit = async () => {
    try {
      const response = await submitData(VITE_SIA_SLAB_DEMARCATION_URL, payload);
      toast.success("Data submitted successfully!", response);
      getData(); // Refresh the table data
      closeModal();
    } catch (error) {
      toast.error("Error submitting data:", error);
    }
  };

  //opening the modal to add data
  const handleAddData = () => {
    setPayload(initialPayload); // Reset the payload to initial state
    openModal("addSlabDemarcation");
  };

  useEffect(() => {
    getData(); // calling the function when loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const columns = [
    "Slab Level",
    "Lower RANGE",
    "Upper RANGE",
    "Status",
  ];

  const data = response
    .filter((item) =>
      item.SLAB_LEVEL.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.ID - b.ID)
    .map((item) => ({
      id: item.ID,
      "Slab Level": item.SLAB_LEVEL,
      "Lower RANGE": item.LOWER_RANGE,
      "Upper RANGE": item.UPPER_RANGE,
      Status: item.STATUS,
    }));

  // writing a function to get the data from database
  const getData = async () => {
    try {
      let data = [];
      if (statusFilter === "Active") {
        data = await fetchData(VITE_SIA_SLAB_DEMARCATION_URL);
      } else {
        data = await fetchInactiveData(VITE_SIA_SLAB_DEMARCATION_URL);
      }
      setResponse(data);
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

  // fetching data for update when clicking on the update button of a row
  const handleUpdate = async (id) => {
    toast.info("Fetching data for update...");
    console.log(id);
    // find the data from the response array using the id
    const selectedData = response.find((item) => item.ID === id);
    // set the payload with the selected data
    if (selectedData) {
      setPayload({
        ID: selectedData.ID,
        SLAB_ID: selectedData.SLAB_ID,
        SLAB_LEVEL: selectedData.SLAB_LEVEL,
        LOWER_RANGE: selectedData.LOWER_RANGE,
        UPPER_RANGE: selectedData.UPPER_RANGE,
        CREATED_DATE: selectedData.CREATED_DATE,
        CREATED_USER: selectedData.CREATED_USER,
        UPDATED_DATE: selectedData.UPDATED_DATE,
        UPDATED_USER: selectedData.UPDATED_USER,
        STATUS: selectedData.STATUS,
      });
      openModal("updateSlabDemarcation");
    } else {
      toast.error("Data not found for the selected ID.");
    }
  };

  // updating the database with the updated data when click on update button in form
  const handleUpdatedData = async () => {
    try {
      if (payload.ID) {
        const updatedData = await updateData(
          VITE_SIA_SLAB_DEMARCATION_URL,
          payload.ID,
          payload
        );
        toast.success("Data updated successfully!", updatedData);
        getData(); // Refresh the table data
        closeModal();
      }
    } catch (error) {
      toast.error("Error updating data:", error);
    }
  };

  // handling the inactivation of data with SWAL alert lib
  const handleInactive = async (id) => {
    const selectedData = response.find((item) => item.ID === id);
    if (selectedData && selectedData.STATUS === "Active") {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This cannot be revert",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34a853",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, inactivate it!",
      });

      if (result.isConfirmed) {
        try {
          const updatedPayload = { ...selectedData, STATUS: "Inactive" };
          await updateData(VITE_SIA_SLAB_DEMARCATION_URL, id, updatedPayload);
          toast.success("Rule Inactivated");
          getData(); // Refresh table
        } catch (error) {
          toast.error("Failed to Inactivate", error);
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
        title="Slab Demarcation"
        placeholder={"Search by Slab Level"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* active inactive toggle button */}
      <ToggleBtn
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ActionTable
        columns={columns}
        data={data}
        handleUpdate={handleUpdate}
        handleInactive={handleInactive}
        title="Slab Demarcation List"
      />
      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Slab Level"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>
      <ModalPopup
        title="Slab Demarcation"
        sideImg={sideImg}
        modalName="addSlabDemarcation"
      >
        
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
      
          <Input
            name="Slab ID"
            type="text"
            value={payload.SLAB_ID}
            onChange={(e) =>
              setPayload({ ...payload, SLAB_ID: e.target.value })
            }
          />
          <Input
            name="Slab Level"
            type="text"
            value={payload.SLAB_LEVEL}
            onChange={(e) =>
              setPayload({ ...payload, SLAB_LEVEL: e.target.value })
            }
          />
          <Input
            name="Lower RANGE"
            type="number"
            value={payload.LOWER_RANGE}
            onChange={(e) =>
              setPayload({ ...payload, LOWER_RANGE: e.target.value })
            }
          />
          <Input
            name="Upper RANGE"
            type="number"
            value={payload.UPPER_RANGE}
            onChange={(e) =>
              setPayload({ ...payload, UPPER_RANGE: e.target.value })
            }
          />
          <Input
            name="Created user"
            type="text"
            value={payload.CREATED_USER}
            onChange={(e) =>
              setPayload({ ...payload, CREATED_USER: e.target.value })
            }
          />
          <Input 
            name="Created date" 
            type="date" 
            value={payload.CREATED_DATE} 
            onChange={(e) => setPayload({ ...payload, CREATED_DATE: e.target.value })} 
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

      {/* update Modal  */}
      <ModalPopup
        title="Update Slab Demarcation"
        sideImg={sideImg}
        modalName="updateSlabDemarcation"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Slab Level"
            type="text"
            value={payload.SLAB_LEVEL}
            onChange={(e) =>
              setPayload({ ...payload, SLAB_LEVEL: e.target.value })
            }
          />
          <Input
            name="Lower RANGE"
            type="number"
            value={payload.LOWER_RANGE}
            onChange={(e) =>
              setPayload({ ...payload, LOWER_RANGE: e.target.value })
            }
          />
          <Input
            name="Upper RANGE"
            type="number"
            value={payload.UPPER_RANGE}
            onChange={(e) =>
              setPayload({ ...payload, UPPER_RANGE: e.target.value })
            }
          />
          <Dropdown
            name="Status"
            value={payload.STATUS}
            status={["Active", "Inactive"]}
            onChange={(e) =>
              setPayload({
                ...payload,
                STATUS: e.target.value,
              })
            }
          />
          <Input
            name="Updated user"
            type="text"
            value={payload.UPDATED_USER}
            onChange={(e) =>
              setPayload({ ...payload, UPDATED_USER: e.target.value })
            }
          />
          <Input 
            name="Updated date" 
            type="date" 
            value={payload.UPDATED_DATE} 
            onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })} 
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

export default SlabDemarcation;