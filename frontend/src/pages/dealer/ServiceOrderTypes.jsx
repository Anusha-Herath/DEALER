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

// function ServiceOrderTypes() {
//   const { openModal, closeModal } = useModal();

//   // creating a state to setData
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   //add API URL here for easy access for all the functions in this page
//   const VITE_SIA_SERVICE_ORDER_TYPES_URL = 'http://127.0.0.1:8000/api/so_types/';

//   const initialPayload = {
//     ID: "",
//     SO_TYPE_ID: "",
//     PRODUCT: "",
//     SERVICE_TYPE: "",
//     ORDER_TYPE: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "ACTIVE",
//   };

//   // create a state object to set the data
//   const [payload, setPayload] = useState(initialPayload);

//   // handle the form submission to add the data
//   const handleSubmit = async () => {
//     try {
//       const response = await submitData(VITE_SIA_SERVICE_ORDER_TYPES_URL, payload);
//       toast.success("Data submitted successfully!", response);
//       getData(); // Refresh the table data
//       closeModal();
//     } catch (error) {
//       toast.error("Error submitting data:", error);
//     }
//   };
//   //opening the modal to add data
//   const handleAddData = () => {
//     setPayload(initialPayload); // Reset the payload to initial state
//     openModal("addProduct");
//   };

//   useEffect(() => {
//     getData(); // calling the function when loading
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [statusFilter]);

//   const columns = [
    
//     "Product",
//     "Service type",
//     "Order type",
//     "Status",
//   ];
//   const data = response
//     .filter((item) =>
//       item.PRODUCT.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "Product": item.PRODUCT,
//       "Service type": item.SERVICE_TYPE,
//       "Order type": item.ORDER_TYPE,
//       Status: item.STATUS,
//     }));

//   // writing a function to get the data from database
//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
//     }
//     setResponse(data);
//   };

//   // fetching data for update when clicking on the update button of a row
//   const handleUpdate = async (id) => {
//     toast.info(`Fetching data for update...`);
//     console.log(id);
//     // find the data from the response array using the id
//     const selectedData = response.find((item) => item.ID === id);
//     // set the payload with the selected data
//     if (selectedData) {
//       setPayload({
//         ID: selectedData.ID,
//         PRODUCT: selectedData.PRODUCT,
//         SERVICE_TYPE: selectedData.SERVICE_TYPE,
//         ORDER_TYPE: selectedData.ORDER_TYPE,
//         CREATED_DATE: selectedData.CREATED_DATE,
//         CREATED_USER: selectedData.CREATED_USER,
//         UPDATED_DATE: selectedData.UPDATED_DATE,
//         UPDATED_USER: selectedData.UPDATED_USER,
//         STATUS: selectedData.STATUS,
//       });
//       openModal("updateProduct");
//     } else {
//       toast.error("Data not found for the selected ID.");
//     }
//   };
//   // updating the database with the updated data when click on update button in form
//   const handleUpdatedData = async () => {
//     try {
//       if (payload.ID) {
//         const updatedData = await updateData(
//           VITE_SIA_SERVICE_ORDER_TYPES_URL,
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
  
// const handleInactive = async (id) => {
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
//           await updateData(VITE_SIA_SERVICE_ORDER_TYPES_URL, id, updatedPayload);
//           toast.success("Rule Inactivated");
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
//       <ToastContainer position="top-center" theme="colored" />
//       <PageHeader
//         title="Service Order Types"
//         placeholder={"Search by Product"}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       {/* acive inactive toggle button */}
//       <ToggleBtn
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//       />

//       {/* <ActionTable
//         columns={columns}
//         data={data}
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//         title="Service Order Type List"
//       /> */}
//       <ActionTable
//         columns={columns}
//         data={data}
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//         title="Service Order List"
//       />
//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Product"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>
//       <ModalPopup
//         title="Service Order Type"
//         sideImg={sideImg}
//         modalName="addProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">

//           <Input
//             name="Product"
//             type="text"
//             value={payload.PRODUCT}
//             onChange={(e) =>
//               setPayload({ ...payload, PRODUCT: e.target.value })
//             }
//           />


//           <Input
//             name="Service Type"
//             type="text"
//             value={payload.SERVICE_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, SERVICE_TYPE: e.target.value })
//             }
//           />
//           <Input
//             name="Order Type"
//             type="text"
//             value={payload.ORDER_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, ORDER_TYPE: e.target.value })
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
           
//           <Input name="Created date" type="date" value={payload.CREATED_DATE} onChange={(e) => setPayload({ ...payload, CREATED_DATE: e.target.value })} />
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

//       {/* update Modal  */}
//       <ModalPopup
//         title="Update Service Order Types"
//         sideImg={sideImg}
//         modalName="updateProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">

//           <Input
//             name="Product"
//             type="text"
//             value={payload.PRODUCT}
//             onChange={(e) =>
//               setPayload({ ...payload, PRODUCT: e.target.value })
//             }
//           />

//           <Input
//             name="Service Type"
//             type="text"
//             value={payload.SERVICE_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, SERVICE_TYPE: e.target.value })
//             }
//           />
//           <Input
//             name="Order Type"
//             type="text"
//             value={payload.ORDER_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, ORDER_TYPE: e.target.value })
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
//             name="Updated user"
//             type="text"
//             value={payload.UPDATED_USER}
//             onChange={(e) =>
//               setPayload({ ...payload, UPDATED_USER: e.target.value })
//             }
//           />
           
//           <Input name="Updated date" type="date" value={payload.UPDATED_DATE} onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })} />
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

// export default ServiceOrderTypes;

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

// function ServiceOrderTypes() {
//   const { openModal, closeModal } = useModal();

//   // creating a state to setData
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   //add API URL here for easy access for all the functions in this page
//   const VITE_SIA_SERVICE_ORDER_TYPES_URL = 'http://127.0.0.1:8000/api/so_types/';

//   const initialPayload = {
//     ID: "",
//     SO_TYPE_ID: "",
//     PRODUCT: "",
//     SERVICE_TYPE: "",
//     ORDER_TYPE: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };

//   // create a state object to set the data
//   const [payload, setPayload] = useState(initialPayload);
//   const ruleName = "serviceOrderTypes";

//   // handle the form submission to add the data
//   const handleSubmit = async () => {
//     const errors = validations(payload, ruleName, false, response);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return; // Prevent submission
//     }
    
//     try {
//       const response = await submitData(VITE_SIA_SERVICE_ORDER_TYPES_URL, payload);
//       toast.success("Data submitted successfully!", response);
//       getData(); // Refresh the table data
//       closeModal();
//     } catch (error) {
//       toast.error("Error submitting data:", error);
//     }
//   };

//   //opening the modal to add data
//   const handleAddData = () => {
//     setPayload(initialPayload); // Reset the payload to initial state
//     openModal("addProduct");
//   };

//   useEffect(() => {
//     getData(); // calling the function when loading
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [statusFilter]);

//   const columns = [
//     "Product",
//     "Service type",
//     "Order type",
//     "Status",
//   ];

//   const data = response
//     .filter((item) =>
//       item.PRODUCT.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "Product": item.PRODUCT,
//       "Service type": item.SERVICE_TYPE,
//       "Order type": item.ORDER_TYPE,
//       Status: item.STATUS,
//     }));

//   // writing a function to get the data from database
//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
//     }
//     setResponse(data);
//   };

//   // fetching data for update when clicking on the update button of a row
//   const handleUpdate = async (id) => {
//     toast.info(`Fetching data for update...`);
//     // find the data from the response array using the id
//     const selectedData = response.find((item) => item.ID === id);
//     // set the payload with the selected data
//     if (selectedData) {
//       setPayload({
//         ID: selectedData.ID,
//         SO_TYPE_ID: selectedData.SO_TYPE_ID,
//         PRODUCT: selectedData.PRODUCT,
//         SERVICE_TYPE: selectedData.SERVICE_TYPE,
//         ORDER_TYPE: selectedData.ORDER_TYPE,
//         CREATED_DATE: selectedData.CREATED_DATE,
//         CREATED_USER: selectedData.CREATED_USER,
//         UPDATED_DATE: selectedData.UPDATED_DATE,
//         UPDATED_USER: selectedData.UPDATED_USER,
//         STATUS: selectedData.STATUS,
//       });
//       openModal("updateProduct");
//     } else {
//       toast.error("Data not found for the selected ID.");
//     }
//   };

//   // updating the database with the updated data when click on update button in form
//   const handleUpdatedData = async () => {
//     const errors = validations(payload, ruleName, true);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return; // Prevent update
//     }
    
//     try {
//       if (payload.ID) {
//         const updatedData = await updateData(
//           VITE_SIA_SERVICE_ORDER_TYPES_URL,
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
//           await updateData(VITE_SIA_SERVICE_ORDER_TYPES_URL, id, updatedPayload);
//           toast.success("Service Order Type Inactivated");
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
//         title="Service Order Types"
//         placeholder={"Search by Product"}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />

//       {/* active inactive toggle button */}
//       <ToggleBtn
//         statusFilter={statusFilter}
//         setStatusFilter={setStatusFilter}
//       />

//       <ActionTable
//         columns={columns}
//         data={data}
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//         title="Service Order Types List"
//       />
      
//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Service Order Type"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>
      
//       {/* Add Modal */}
//       <ModalPopup
//         title="Service Order Type"
//         sideImg={sideImg}
//         modalName="addProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="SO Type ID"
//             type="text"
//             value={payload.SO_TYPE_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, SO_TYPE_ID: e.target.value })
//             }
//           />
//           <Input
//             name="Product"
//             type="text"
//             value={payload.PRODUCT}
//             onChange={(e) =>
//               setPayload({ ...payload, PRODUCT: e.target.value })
//             }
//           />
//           <Input
//             name="Service Type"
//             type="text"
//             value={payload.SERVICE_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, SERVICE_TYPE: e.target.value })
//             }
//           />
//           <Input
//             name="Order Type"
//             type="text"
//             value={payload.ORDER_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, ORDER_TYPE: e.target.value })
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
//         title="Update Service Order Type"
//         sideImg={sideImg}
//         modalName="updateProduct"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
//           <Input
//             name="SO Type ID"
//             type="text"
//             value={payload.SO_TYPE_ID}
//             onChange={(e) =>
//               setPayload({ ...payload, SO_TYPE_ID: e.target.value })
//             }
//             disabled
//           />
//           <Input
//             name="Product"
//             type="text"
//             value={payload.PRODUCT}
//             onChange={(e) =>
//               setPayload({ ...payload, PRODUCT: e.target.value })
//             }
//           />
//           <Input
//             name="Service Type"
//             type="text"
//             value={payload.SERVICE_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, SERVICE_TYPE: e.target.value })
//             }
//           />
//           <Input
//             name="Order Type"
//             type="text"
//             value={payload.ORDER_TYPE}
//             onChange={(e) =>
//               setPayload({ ...payload, ORDER_TYPE: e.target.value })
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

// export default ServiceOrderTypes;

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

// function ServiceOrderTypes() {
//   const { openModal, closeModal } = useModal();
//   const [response, setResponse] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("Active");

//   const VITE_SIA_SERVICE_ORDER_TYPES_URL = 'http://127.0.0.1:8000/api/so_types/';

//   const initialPayload = {
//     ID: "",
//     SO_TYPE_ID: "",
//     PRODUCT: "",
//     SERVICE_TYPE: "",
//     ORDER_TYPE: "",
//     CREATED_DATE: "",
//     CREATED_USER: "",
//     UPDATED_DATE: "",
//     UPDATED_USER: "",
//     STATUS: "Active",
//   };

//   const [payload, setPayload] = useState(initialPayload);
//   const ruleName = "serviceOrderTypes";

//   const handleSubmit = async () => {
//     const errors = validations(payload, ruleName, false, response);

//     if (errors.length > 0) {
//       errors.forEach((err) => toast.warning(err));
//       return;
//     }
//     try {
//       const response = await submitData(VITE_SIA_SERVICE_ORDER_TYPES_URL, payload);
//       toast.success("Data submitted successfully!");
//       getData();
//       closeModal();
//     } catch (error) {
//       toast.error("Error submitting data:", error);
//     }
//   };

//   const handleAddData = () => {
//     setPayload(initialPayload);
//     openModal("addServiceOrder");
//   };

//   useEffect(() => {
//     getData();
//   }, [statusFilter]);

//   const getData = async () => {
//     let data = [];
//     if (statusFilter === "Active") {
//       data = await fetchData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
//     } else {
//       data = await fetchInactiveData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
//     }
//     setResponse(data);
//   };

//   const columns = [
//     "SO Type ID",
//     "Product",
//     "Service Type",
//     "Order Type",
//     "Status",
//   ];

//   const data = response
//     .filter((item) =>
//       item.PRODUCT.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) => a.ID - b.ID)
//     .map((item) => ({
//       id: item.ID,
//       "SO Type ID": item.SO_TYPE_ID,
//       "Product": item.PRODUCT,
//       "Service Type": item.SERVICE_TYPE,
//       "Order Type": item.ORDER_TYPE,
//       "Status": item.STATUS,
//     }));

//   const handleUpdate = async (id) => {
//     toast.info(`Fetching data for update...`);
//     const selectedData = response.find((item) => item.ID === id);
//     if (selectedData) {
//       setPayload({
//         ID: selectedData.ID,
//         SO_TYPE_ID: selectedData.SO_TYPE_ID,
//         PRODUCT: selectedData.PRODUCT,
//         SERVICE_TYPE: selectedData.SERVICE_TYPE,
//         ORDER_TYPE: selectedData.ORDER_TYPE,
//         CREATED_DATE: selectedData.CREATED_DATE,
//         CREATED_USER: selectedData.CREATED_USER,
//         UPDATED_DATE: selectedData.UPDATED_DATE,
//         UPDATED_USER: selectedData.UPDATED_USER,
//         STATUS: selectedData.STATUS,
//       });
//       openModal("updateServiceOrder");
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
//         const updatedData = await updateData(
//           VITE_SIA_SERVICE_ORDER_TYPES_URL,
//           payload.ID,
//           payload
//         );
//         toast.success("Data updated successfully!");
//         getData();
//         closeModal();
//       }
//     } catch (error) {
//       toast.error("Error updating data:", error);
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
//           await updateData(VITE_SIA_SERVICE_ORDER_TYPES_URL, id, updatedPayload);
//           toast.success("Service Order Type Inactivated");
//           getData();
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
//         title="Service Order Types"
//         placeholder="Search by product"
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
//         title="Service Order Types"
//         handleUpdate={handleUpdate}
//         handleInactive={handleInactive}
//       />

//       <div className="flex justify-end pr-2">
//         <PrimaryBtn
//           name="Add New Service Order"
//           icon={<PlusCircle />}
//           onClick={handleAddData}
//         />
//       </div>

//       {/* Add Modal */}
//       <ModalPopup
//         title="Service Order Type"
//         sideImg={sideImg}
//         modalName="addServiceOrder"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10">
//           <Input
//             name="SO Type ID"
//             type="text"
//             value={payload.SO_TYPE_ID}
//             onChange={(e) => setPayload({ ...payload, SO_TYPE_ID: e.target.value })}
//           />
//           <Input
//             name="Product"
//             type="text"
//             value={payload.PRODUCT}
//             onChange={(e) => setPayload({ ...payload, PRODUCT: e.target.value })}
//           />
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
//         title="Update Service Order Type"
//         sideImg={sideImg}
//         modalName="updateServiceOrder"
//       >
//         <div className="grid w-full grid-cols-2 gap-5 px-10">
//           <Input
//             name="SO Type ID"
//             type="text"
//             value={payload.SO_TYPE_ID}
//             onChange={(e) => setPayload({ ...payload, SO_TYPE_ID: e.target.value })}
//             disabled
//           />
//           <Input
//             name="Product"
//             type="text"
//             value={payload.PRODUCT}
//             onChange={(e) => setPayload({ ...payload, PRODUCT: e.target.value })}
//           />
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

// export default ServiceOrderTypes;

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

function ServiceOrderTypes() {
  const { openModal, closeModal } = useModal();

  // creating a state to setData
  const [response, setResponse] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  //add API URL here for easy access for all the functions in this page
  const VITE_SIA_SERVICE_ORDER_TYPES_URL = 'http://127.0.0.1:8000/api/so_types/';

  const initialPayload = {
    ID: "",
    SO_TYPE_ID: "",
    PRODUCT: "",
    SERVICE_TYPE: "",
    ORDER_TYPE: "",
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
      const response = await submitData(VITE_SIA_SERVICE_ORDER_TYPES_URL, payload);
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
    openModal("addProduct");
  };

  useEffect(() => {
    getData(); // calling the function when loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const columns = [

    "Product",
    "Service type",
    "Order type",
    "Status",
  ];
  const data = response
    .filter((item) =>
      item.PRODUCT.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.ID - b.ID)
    .map((item) => ({
      id: item.ID,
      "Product": item.PRODUCT,
      "Service type": item.SERVICE_TYPE,
      "Order type": item.ORDER_TYPE,
      Status: item.STATUS,
    }));

  // writing a function to get the data from database
  const getData = async () => {
    let data = [];
    if (statusFilter === "Active") {
      data = await fetchData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
    } else {
      data = await fetchInactiveData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
    }
    setResponse(data);
  };

  // fetching data for update when clicking on the update button of a row
  const handleUpdate = async (id) => {
    toast.info(`Fetching data for update...`);
    console.log(id);
    // find the data from the response array using the id
    const selectedData = response.find((item) => item.ID === id);
    // set the payload with the selected data
    if (selectedData) {
      setPayload({
        ID: selectedData.ID,
        SO_TYPE_ID: selectedData.SO_TYPE_ID,
        PRODUCT: selectedData.PRODUCT,
        SERVICE_TYPE: selectedData.SERVICE_TYPE,
        ORDER_TYPE: selectedData.ORDER_TYPE,
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
  // updating the database with the updated data when click on update button in form
  const handleUpdatedData = async () => {
    try {
      if (payload.ID) {
        const updatedData = await updateData(
          VITE_SIA_SERVICE_ORDER_TYPES_URL,
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
          await updateData(VITE_SIA_SERVICE_ORDER_TYPES_URL, id, updatedPayload);
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
        title="Service Order Types"
        placeholder={"Search by Product"}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* acive inactive toggle button */}
      <ToggleBtn
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />


      <ActionTable
        columns={columns}
        data={data}
        handleUpdate={handleUpdate}
        handleInactive={handleInactive}
        title="Service Order List"
      />
      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Product"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>
      <ModalPopup
        title="Service Order Type"
        sideImg={sideImg}
        modalName="addProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="SO Type ID"
            type="text"
            value={payload.SO_TYPE_ID}
            onChange={(e) =>
              setPayload({ ...payload, SO_TYPE_ID: e.target.value })
            }
          />


          <Input
            name="Product"
            type="text"
            value={payload.PRODUCT}
            onChange={(e) =>
              setPayload({ ...payload, PRODUCT: e.target.value })
            }
          />


          <Input
            name="Service Type"
            type="text"
            value={payload.SERVICE_TYPE}
            onChange={(e) =>
              setPayload({ ...payload, SERVICE_TYPE: e.target.value })
            }
          />
          <Input
            name="Order Type"
            type="text"
            value={payload.ORDER_TYPE}
            onChange={(e) =>
              setPayload({ ...payload, ORDER_TYPE: e.target.value })
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

          <Input name="Created date" type="date" value={payload.CREATED_DATE} onChange={(e) => setPayload({ ...payload, CREATED_DATE: e.target.value })} />
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
        title="Update Service Order Types"
        sideImg={sideImg}
        modalName="updateProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">

          <Input
            name="Product"
            type="text"
            value={payload.PRODUCT}
            onChange={(e) =>
              setPayload({ ...payload, PRODUCT: e.target.value })
            }
          />

          <Input
            name="Service Type"
            type="text"
            value={payload.SERVICE_TYPE}
            onChange={(e) =>
              setPayload({ ...payload, SERVICE_TYPE: e.target.value })
            }
          />
          <Input
            name="Order Type"
            type="text"
            value={payload.ORDER_TYPE}
            onChange={(e) =>
              setPayload({ ...payload, ORDER_TYPE: e.target.value })
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

          <Input name="Updated date" type="date" value={payload.UPDATED_DATE} onChange={(e) => setPayload({ ...payload, UPDATED_DATE: e.target.value })} />
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

export default ServiceOrderTypes;