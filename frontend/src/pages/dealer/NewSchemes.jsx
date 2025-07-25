// import React, { useEffect, useState } from "react";
// import PageHeader from "../../components/common/PageHeader";
// import Checkbox from "../../components/common/CheckBox";
// import PrimaryBtn from "../../components/common/PrimaryBtn";
// import { ChevronDown, PlusSquare } from "lucide-react";
// import Input from "../../components/common/Input";
// import Dropdown from "../../components/common/Dropdown";
// import { SchemeTable } from "../../components/common/SchemeTable";
// import { useTable } from "../../context/TableContext";
// import {
//   getServiceOrderTypesData,
//   getSlabDemarcationData,
//   getBlacklistPackageData,
//   getPackageRatesData,
//   getBearerRatesData,
// } from "../../data/dealer/schemeData";
// import UploadUi from "../../components/common/UploadUi";
// import { submitData } from "../../services/fetchData";
// import { toast, ToastContainer } from "react-toastify";

// function NewScheme() {
//   const VITE_SIA_SCHEME_URL = "http://127.0.0.1:8000/api/schemes/";

//   // Safely destructure useTable with defaults
//   const tableContext = useTable() || {};
//   const { openTables = {}, toggleTable = () => {} } = tableContext;

//   const [productChecked, setProductChecked] = useState(false);
//   const [slabChecked, setSlabChecked] = useState(false);
//   const [blacklistpackageChecked, setBlacklistChecked] = useState(false);
//   const [packageratesChecked, setPackageRatesChecked] = useState(false);
//   const [bearerChecked, setBearerChecked] = useState(false);

//   // State for API responses
//   const [serviceordertypesResponse, setServiceOrderTypesResponse] = useState({});
//   const [slabdemarcationResponse, setSlabDemarcationResponse] = useState({});
//   const [blacklistpackageResponse, setBlacklistPackageResponse] = useState({});
//   const [packageratesResponse, setPackageRatesResponse] = useState({});
//   const [bearerratesResponse, setBearerRatesResponse] = useState({});

//   // Calculate active rules counts
//   var productActive = serviceordertypesResponse.data?.length;
//   var slabActive = slabdemarcationResponse.data?.length;
//   var BlacklistActive = blacklistpackageResponse.data?.length;
//   var PackageActive = packageratesResponse.data?.length;
//   var BearerActive = bearerratesResponse.data?.length;


//   // Rules state management
//   const [rules, setRules] = useState({});
//   const RULES_DATA_ARRAY = Object.values(rules).flat();

//   console.log("data type: ", RULES_DATA_ARRAY);

//   // Form payload
//   const initialPayload = {
//     SCHEME_NUM: "",
//     SCHEME_NAME: "",
//     STATUS: "Active",
//     START_DATE: "",
//     ATTACHMENT: null,
//     RULES_DATA: [],
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalPayload = {
//       ...payload,
//       RULES_DATA: RULES_DATA_ARRAY,
//     };
//     try {
//       const response = await submitData(VITE_SIA_SCHEME_URL, finalPayload);
//       toast.success("Scheme Submitted successfully", response);
//     } catch (error) {
//       toast.error("Scheme Data submission failed", error);
//     }
//   };

//   // Fetch data based on checkbox states
//   useEffect(() => {
//     if (productChecked) {
//       getServiceOrderTypesData(setServiceOrderTypesResponse);
//     }
//     if (slabChecked) {
//       getSlabDemarcationData(setSlabDemarcationResponse);
//     }
//     if (blacklistpackageChecked) {
//       getBlacklistPackageData(setBlacklistPackageResponse);
//     }
//     if (packageratesChecked) {
//       getPackageRatesData(setPackageRatesResponse);
//     }
//     if (bearerChecked) {
//       getBearerRatesData(setBearerRatesResponse);
//     }
    
   
//   }, [

//     productChecked,
//     slabChecked,
//     blacklistpackageChecked,
//     packageratesChecked,
//     bearerChecked,

//   ]);

//   return (
//     <>
//       <PageHeader title={"Create New Scheme"} />
//       <ToastContainer position="top-center" theme="colored" />

//       <div className="flex gap-3 mt-5">
//         {/* Form section */}
//         <div className="w-[30%] h-fit block bg-white p-5 rounded-md">
//           <form onSubmit={handleSubmit}>
//             <Input
//               name={"Scheme Number"}
//               type={"text"}
//               value={payload.SCHEME_NUM}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NUM: e.target.value })}
//             />
//             <Input
//               name={"Scheme Name"}
//               type={"text"}
//               value={payload.SCHEME_NAME}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NAME: e.target.value })}
//             />
//             <Dropdown
//               name={"Status"}
//               status={["Active", "Inactive"]}
//               value={payload.STATUS}
//               onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
//             />
//             <Input
//               name={"Start Date"}
//               type={"date"}
//               value={payload.START_DATE}
//               onChange={(e) => setPayload({ ...payload, START_DATE: e.target.value })}
//             />
//             <div className="flex flex-col">
//               <label className="my-1 font-semibold text-gray-500">Upload File</label>
//               <UploadUi />
//             </div>
            
//             {/* Rules checkboxes */}
//             <div className="flex flex-col gap-2 mt-2">
//               <label>Rules (Active Only)</label>
//               <Checkbox
//                 name={`Service Order Types (${productActive} Available)`}
//                 checked={productChecked}
//                 onChange={(e) => setProductChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Slab Demarcation (${slabActive} Available)`}
//                 checked={slabChecked}
//                 onChange={(e) => setSlabChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Blacklist Package (${BlacklistActive} Available)`}
//                 checked={blacklistpackageChecked}
//                 onChange={(e) => setBlacklistChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Package Rates (${PackageActive} Available)`}
//                 checked={packageratesChecked}
//                 onChange={(e) => setPackageRatesChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Bearer Rates (${BearerActive} Available)`}
//                 checked={bearerChecked}
//                 onChange={(e) => setBearerChecked(e.target.checked)}
//               />
//             </div>
//             <div className="mt-5">
//               <PrimaryBtn name={"create scheme"} icon={<PlusSquare />} />
//             </div>
//           </form>
//         </div>

//         {/* Tables display section */}
//         <div className="grid w-full grid-cols-3 gap-2 p-5 rounded-md h-fit bg-black/20">
//           {/* Product Eligibility Table */}
//           {productChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("product")}
//               >
//                 Service Order Types
//                 <ChevronDown />
//               </button>
//               {openTables.product && (
//                 <SchemeTable
//                   column={serviceordertypesResponse.columns || []}
//                   products={serviceordertypesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, prod: ruleObjects }))
//                   }
//                   TABLE_NAME={"Service Order Types"}
//                 />
//               )}
//             </div>
//           )}

//           {slabChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("slab")}
//               >
//                 Slab Demarcation
//                 <ChevronDown />
//               </button>
//               {openTables.slab && (
//                 <SchemeTable
//                   column={slabdemarcationResponse.columns || []}
//                   products={slabdemarcationResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, slab: ruleObjects }))
//                   }
//                   TABLE_NAME={"Slab Demarcation"}
//                 />
//               )}
//             </div>
//           )}

//            {blacklistpackageChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("blacklist")}
//               >
//                 Blacklist Package
//                 <ChevronDown />
//               </button>
//               {openTables.blacklist && (
//                 <SchemeTable
//                   column={blacklistpackageResponse.columns || []}
//                   products={blacklistpackageResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, blacklist: ruleObjects }))
//                   }
//                   TABLE_NAME={"Blacklist Package"}
//                 />
//               )}
//             </div>
//           )}

//            {packageratesChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("package")}
//               >
//                 Package Rates
//                 <ChevronDown />
//               </button>
//               {openTables.package && (
//                 <SchemeTable
//                   column={packageratesResponse.columns || []}
//                   products={packageratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, package: ruleObjects }))
//                   }
//                   TABLE_NAME={"Package Rates"}
//                 />
//               )}
//             </div>
//           )}

//            {bearerChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("bearer")}
//               >
//               Bearer Rates
//                 <ChevronDown />
//               </button>
//               {openTables.bearer && (
//                 <SchemeTable
//                   column={bearerratesResponse.columns || []}
//                   products={bearerratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, bearer: ruleObjects }))
//                   }
//                   TABLE_NAME={"Bearer Rates"}
//                 />
//               )}
//             </div>
//           )}

         

//         </div>
//       </div>
//     </>
//   );
// }

// export default NewScheme;
// import React, { useEffect, useState } from "react";
// import PageHeader from "../../components/common/PageHeader";
// import Checkbox from "../../components/common/CheckBox";
// import PrimaryBtn from "../../components/common/PrimaryBtn";
// import { ChevronDown, PlusSquare } from "lucide-react";
// import Input from "../../components/common/Input";
// import Dropdown from "../../components/common/Dropdown";
// import { SchemeTable } from "../../components/common/SchemeTable";
// import { useTable } from "../../context/TableContext";
// import {
//   getServiceOrderTypesData,
//   getSlabDemarcationData,
//   getBlacklistPackageData,
//   getPackageRatesData,
//   getBearerRatesData,
// } from "../../data/dealer/schemeData";
// import UploadUi from "../../components/common/UploadUi";
// import { submitData } from "../../services/fetchData";
// import { toast, ToastContainer } from "react-toastify";

// function NewScheme() {
//   const VITE_SIA_SCHEME_URL = "http://127.0.0.1:8000/api/schemes/";

//   const tableContext = useTable() || {};
//   const { openTables = {}, toggleTable = () => {} } = tableContext;

//   const [productChecked, setProductChecked] = useState(false);
//   const [slabChecked, setSlabChecked] = useState(false);
//   const [blacklistpackageChecked, setBlacklistChecked] = useState(false);
//   const [packageratesChecked, setPackageRatesChecked] = useState(false);
//   const [bearerChecked, setBearerChecked] = useState(false);

//   const [serviceordertypesResponse, setServiceOrderTypesResponse] = useState({});
//   const [slabdemarcationResponse, setSlabDemarcationResponse] = useState({});
//   const [blacklistpackageResponse, setBlacklistPackageResponse] = useState({});
//   const [packageratesResponse, setPackageRatesResponse] = useState({});
//   const [bearerratesResponse, setBearerRatesResponse] = useState({});

//   // ✅ Safe defaulting for rule counts
//   const productActive = (serviceordertypesResponse.data || []).length;
//   const slabActive = (slabdemarcationResponse.data || []).length;
//   const BlacklistActive = (blacklistpackageResponse.data || []).length;
//   const PackageActive = (packageratesResponse.data || []).length;
//   const BearerActive = (bearerratesResponse.data || []).length;

//   const [rules, setRules] = useState({});
//   const RULES_DATA_ARRAY = Object.values(rules).flat();

//   const initialPayload = {
//     SCHEME_NUM: "",
//     SCHEME_NAME: "",
//     STATUS: "Active",
//     START_DATE: "",
//     ATTACHMENT: null,
//     RULES_DATA: [],
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalPayload = {
//       ...payload,
//       RULES_DATA: RULES_DATA_ARRAY,
//     };
//     try {
//       const response = await submitData(VITE_SIA_SCHEME_URL, finalPayload);
//       toast.success("Scheme Submitted successfully", response);
//     } catch (error) {
//       toast.error("Scheme Data submission failed", error);
//     }
//   };

//   useEffect(() => {
//     if (productChecked) {
//       getServiceOrderTypesData(setServiceOrderTypesResponse);
//     }
//     if (slabChecked) {
//       getSlabDemarcationData(setSlabDemarcationResponse);
//     }
//     if (blacklistpackageChecked) {
//       getBlacklistPackageData(setBlacklistPackageResponse);
//     }
//     if (packageratesChecked) {
//       getPackageRatesData(setPackageRatesResponse);
//     }
//     if (bearerChecked) {
//       getBearerRatesData(setBearerRatesResponse);
//     }
//   }, [
//     productChecked,
//     slabChecked,
//     blacklistpackageChecked,
//     packageratesChecked,
//     bearerChecked,
//   ]);

//   return (
//     <>
//       <PageHeader title={"Create New Scheme"} />
//       <ToastContainer position="top-center" theme="colored" />

//       <div className="flex gap-3 mt-5">
//         {/* Form Section */}
//         <div className="w-[30%] h-fit block bg-white p-5 rounded-md">
//           <form onSubmit={handleSubmit}>
//             <Input
//               name={"Scheme Number"}
//               type={"text"}
//               value={payload.SCHEME_NUM}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NUM: e.target.value })}
//             />
//             <Input
//               name={"Scheme Name"}
//               type={"text"}
//               value={payload.SCHEME_NAME}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NAME: e.target.value })}
//             />
//             <Dropdown
//               name={"Status"}
//               status={["Active", "Inactive"]}
//               value={payload.STATUS}
//               onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
//             />
//             <Input
//               name={"Start Date"}
//               type={"date"}
//               value={payload.START_DATE}
//               onChange={(e) => setPayload({ ...payload, START_DATE: e.target.value })}
//             />
//             <div className="flex flex-col">
//               <label className="my-1 font-semibold text-gray-500">Upload File</label>
//               <UploadUi />
//             </div>

//             {/* Rules Checkboxes */}
//             <div className="flex flex-col gap-2 mt-2">
//               <label>Rules (Active Only)</label>
//               <Checkbox
//                 name={`Service Order Types (${productActive} Available)`}
//                 checked={productChecked}
//                 onChange={(e) => setProductChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Slab Demarcation (${slabActive} Available)`}
//                 checked={slabChecked}
//                 onChange={(e) => setSlabChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Blacklist Package (${BlacklistActive} Available)`}
//                 checked={blacklistpackageChecked}
//                 onChange={(e) => setBlacklistChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Package Rates (${PackageActive} Available)`}
//                 checked={packageratesChecked}
//                 onChange={(e) => setPackageRatesChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Bearer Rates (${BearerActive} Available)`}
//                 checked={bearerChecked}
//                 onChange={(e) => setBearerChecked(e.target.checked)}
//               />
//             </div>
//             <div className="mt-5">
//               <PrimaryBtn name={"create scheme"} icon={<PlusSquare />} />
//             </div>
//           </form>
//         </div>

//         {/* Rules Table Display */}
//         <div className="grid w-full grid-cols-3 gap-2 p-5 rounded-md h-fit bg-black/20">
//           {productChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("product")}
//               >
//                 Service Order Types <ChevronDown />
//               </button>
//               {openTables.product && (
//                 <SchemeTable
//                   column={serviceordertypesResponse.columns || []}
//                   products={serviceordertypesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, prod: ruleObjects }))
//                   }
//                   TABLE_NAME={"Service Order Types"}
//                 />
//               )}
//             </div>
//           )}

//           {slabChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("slab")}
//               >
//                 Slab Demarcation <ChevronDown />
//               </button>
//               {openTables.slab && (
//                 <SchemeTable
//                   column={slabdemarcationResponse.columns || []}
//                   products={slabdemarcationResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, slab: ruleObjects }))
//                   }
//                   TABLE_NAME={"Slab Demarcation"}
//                 />
//               )}
//             </div>
//           )}

//           {blacklistpackageChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("blacklist")}
//               >
//                 Blacklist Package <ChevronDown />
//               </button>
//               {openTables.blacklist && (
//                 <SchemeTable
//                   column={blacklistpackageResponse.columns || []}
//                   products={blacklistpackageResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, blacklist: ruleObjects }))
//                   }
//                   TABLE_NAME={"Blacklist Package"}
//                 />
//               )}
//             </div>
//           )}

//           {packageratesChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("package")}
//               >
//                 Package Rates <ChevronDown />
//               </button>
//               {openTables.package && (
//                 <SchemeTable
//                   column={packageratesResponse.columns || []}
//                   products={packageratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, package: ruleObjects }))
//                   }
//                   TABLE_NAME={"Package Rates"}
//                 />
//               )}
//             </div>
//           )}

//           {bearerChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("bearer")}
//               >
//                 Bearer Rates <ChevronDown />
//               </button>
//               {openTables.bearer && (
//                 <SchemeTable
//                   column={bearerratesResponse.columns || []}
//                   products={bearerratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, bearer: ruleObjects }))
//                   }
//                   TABLE_NAME={"Bearer Rates"}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewScheme;

// import React, { useEffect, useState } from "react";
// import PageHeader from "../../components/common/PageHeader";
// import Checkbox from "../../components/common/CheckBox";
// import PrimaryBtn from "../../components/common/PrimaryBtn";
// import { ChevronDown, PlusSquare } from "lucide-react";
// import Input from "../../components/common/Input";
// import Dropdown from "../../components/common/Dropdown";
// import { SchemeTable } from "../../components/common/SchemeTable";
// import { useTable } from "../../context/TableContext";
// import {
//   getServiceOrderTypesData,
//   getSlabDemarcationData,
//   getBlacklistPackageData,
//   getPackageRatesData,
//   getBearerRatesData,
// } from "../../data/dealer/schemeData";
// import UploadUi from "../../components/common/UploadUi";
// import { submitData } from "../../services/fetchData";
// import { toast, ToastContainer } from "react-toastify";

// function NewScheme() {
//   const VITE_SIA_SCHEME_URL = "http://127.0.0.1:8000/api/schemes/";
//   const { openTables = {}, toggleTable = () => {} } = useTable() || {};

//   const [productChecked, setProductChecked] = useState(false);
//   const [slabChecked, setSlabChecked] = useState(false);
//   const [blacklistpackageChecked, setBlacklistChecked] = useState(false);
//   const [packageratesChecked, setPackageRatesChecked] = useState(false);
//   const [bearerChecked, setBearerChecked] = useState(false);

//   const [serviceordertypesResponse, setServiceOrderTypesResponse] = useState({});
//   const [slabdemarcationResponse, setSlabDemarcationResponse] = useState({});
//   const [blacklistpackageResponse, setBlacklistPackageResponse] = useState({});
//   const [packageratesResponse, setPackageRatesResponse] = useState({});
//   const [bearerratesResponse, setBearerRatesResponse] = useState({});

//   const productActive = serviceordertypesResponse?.data?.length || 0;
//   const slabActive = slabdemarcationResponse?.data?.length || 0;
//   const BlacklistActive = blacklistpackageResponse?.data?.length || 0;
//   const PackageActive = packageratesResponse?.data?.length || 0;
//   const BearerActive = bearerratesResponse?.data?.length || 0;

//   const [rules, setRules] = useState({});
//   const RULES_DATA_ARRAY = Object.values(rules).flat();

//   const initialPayload = {
//     SCHEME_NUM: "",
//     SCHEME_NAME: "",
//     STATUS: "Active",
//     START_DATE: "",
//     ATTACHMENT: null,
//     RULES_DATA: [],
//   };
//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const finalPayload = { ...payload, RULES_DATA: RULES_DATA_ARRAY };
//     try {
//       const response = await submitData(VITE_SIA_SCHEME_URL, finalPayload);
//       toast.success("Scheme Submitted successfully", response);
//     } catch (error) {
//       toast.error("Scheme Data submission failed", error);
//     }
//   };

//   useEffect(() => {
//     if (productChecked) {
//       getServiceOrderTypesData((res) => {
//         console.log("✅ Service Order Types fetched:", res);
//         if ((!res.data || res.data.length === 0) && res.IDS?.length > 0) {
//           res.data = res.IDS.map((id) => ({
//             ONE: id,
//             TWO: `Product ${id}`,
//             STATUS: "Active",
//           }));
//         }
//         setServiceOrderTypesResponse(res);
//       });
//     }
//     if (slabChecked) getSlabDemarcationData(setSlabDemarcationResponse);
//     if (blacklistpackageChecked) getBlacklistPackageData(setBlacklistPackageResponse);
//     if (packageratesChecked) getPackageRatesData(setPackageRatesResponse);
//     if (bearerChecked) getBearerRatesData(setBearerRatesResponse);
//   }, [productChecked, slabChecked, blacklistpackageChecked, packageratesChecked, bearerChecked]);

//   return (
//     <>
//       <PageHeader title={"Create New Scheme"} />
//       <ToastContainer position="top-center" theme="colored" />

//       <div className="flex gap-3 mt-5">
//         <div className="w-[30%] h-fit block bg-white p-5 rounded-md">
//           <form onSubmit={handleSubmit}>
//             <Input
//               name="Scheme Number"
//               type="text"
//               value={payload.SCHEME_NUM}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NUM: e.target.value })}
//             />
//             <Input
//               name="Scheme Name"
//               type="text"
//               value={payload.SCHEME_NAME}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NAME: e.target.value })}
//             />
//             <Dropdown
//               name="Status"
//               status={["Active", "Inactive"]}
//               value={payload.STATUS}
//               onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
//             />
//             <Input
//               name="Start Date"
//               type="date"
//               value={payload.START_DATE}
//               onChange={(e) => setPayload({ ...payload, START_DATE: e.target.value })}
//             />
//             <div className="flex flex-col">
//               <label className="my-1 font-semibold text-gray-500">Upload File</label>
//               <UploadUi />
//             </div>

//             <div className="flex flex-col gap-2 mt-2">
//               <label>Rules (Active Only)</label>
//               <Checkbox
//                 name={`Service Order Types (${productActive} Available)`}
//                 checked={productChecked}
//                 onChange={(e) => setProductChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Slab Demarcation (${slabActive} Available)`}
//                 checked={slabChecked}
//                 onChange={(e) => setSlabChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Blacklist Package (${BlacklistActive} Available)`}
//                 checked={blacklistpackageChecked}
//                 onChange={(e) => setBlacklistChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Package Rates (${PackageActive} Available)`}
//                 checked={packageratesChecked}
//                 onChange={(e) => setPackageRatesChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Bearer Rates (${BearerActive} Available)`}
//                 checked={bearerChecked}
//                 onChange={(e) => setBearerChecked(e.target.checked)}
//               />
//             </div>
//             <div className="mt-5">
//               <PrimaryBtn name={"create scheme"} icon={<PlusSquare />} />
//             </div>
//           </form>
//         </div>

//         <div className="grid w-full grid-cols-3 gap-2 p-5 rounded-md h-fit bg-black/20">
//           {productChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("product")}
//               >
//                 Service Order Types
//                 <ChevronDown />
//               </button>
//               {openTables.product && (
//                 <SchemeTable
//                   column={serviceordertypesResponse.columns || []}
//                   products={serviceordertypesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, prod: ruleObjects }))
//                   }
//                   TABLE_NAME={"Service Order Types"}
//                 />
//               )}
//             </div>
//           )}

//           {slabChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("slab")}
//               >
//                 Slab Demarcation
//                 <ChevronDown />
//               </button>
//               {openTables.slab && (
//                 <SchemeTable
//                   column={slabdemarcationResponse.columns || []}
//                   products={slabdemarcationResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, slab: ruleObjects }))
//                   }
//                   TABLE_NAME={"Slab Demarcation"}
//                 />
//               )}
//             </div>
//           )}

//           {blacklistpackageChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("blacklist")}
//               >
//                 Blacklist Package
//                 <ChevronDown />
//               </button>
//               {openTables.blacklist && (
//                 <SchemeTable
//                   column={blacklistpackageResponse.columns || []}
//                   products={blacklistpackageResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, blacklist: ruleObjects }))
//                   }
//                   TABLE_NAME={"Blacklist Package"}
//                 />
//               )}
//             </div>
//           )}

//           {packageratesChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("package")}
//               >
//                 Package Rates
//                 <ChevronDown />
//               </button>
//               {openTables.package && (
//                 <SchemeTable
//                   column={packageratesResponse.columns || []}
//                   products={packageratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, package: ruleObjects }))
//                   }
//                   TABLE_NAME={"Package Rates"}
//                 />
//               )}
//             </div>
//           )}

//           {bearerChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("bearer")}
//               >
//                 Bearer Rates
//                 <ChevronDown />
//               </button>
//               {openTables.bearer && (
//                 <SchemeTable
//                   column={bearerratesResponse.columns || []}
//                   products={bearerratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, bearer: ruleObjects }))
//                   }
//                   TABLE_NAME={"Bearer Rates"}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewScheme;


// import React, { useEffect, useState } from "react";
// import PageHeader from "../../components/common/PageHeader";
// import Checkbox from "../../components/common/CheckBox";
// import PrimaryBtn from "../../components/common/PrimaryBtn";
// import { ChevronDown, PlusSquare } from "lucide-react";
// import Input from "../../components/common/Input";
// import Dropdown from "../../components/common/Dropdown";
// import { SchemeTable } from "../../components/common/SchemeTable";
// import { useTable } from "../../context/TableContext";
// import {
//   getServiceOrderTypesData,
//   getSlabDemarcationData,
//   getBlacklistPackageData,
//   getPackageRatesData,
//   getBearerRatesData,
// } from "../../data/dealer/schemeData";
// import UploadUi from "../../components/common/UploadUi";
// import { submitData } from "../../services/fetchData";
// import { toast, ToastContainer } from "react-toastify";

// function NewScheme() {
//   const VITE_SIA_SCHEME_URL = "http://127.0.0.1:8000/api/schemes/";

//   const tableContext = useTable() || {};
//   const { openTables = {}, toggleTable = () => {} } = tableContext;

//   const [productChecked, setProductChecked] = useState(false);
//   const [slabChecked, setSlabChecked] = useState(false);
//   const [blacklistpackageChecked, setBlacklistChecked] = useState(false);
//   const [packageratesChecked, setPackageRatesChecked] = useState(false);
//   const [bearerChecked, setBearerChecked] = useState(false);

//   const [serviceordertypesResponse, setServiceOrderTypesResponse] = useState({});
//   const [slabdemarcationResponse, setSlabDemarcationResponse] = useState({});
//   const [blacklistpackageResponse, setBlacklistPackageResponse] = useState({});
//   const [packageratesResponse, setPackageRatesResponse] = useState({});
//   const [bearerratesResponse, setBearerRatesResponse] = useState({});

//   // Safe defaulting for rule counts
//   const productActive = (serviceordertypesResponse.data || []).length;
//   const slabActive = (slabdemarcationResponse.data || []).length;
//   const BlacklistActive = (blacklistpackageResponse.data || []).length;
//   const PackageActive = (packageratesResponse.data || []).length;
//   const BearerActive = (bearerratesResponse.data || []).length;

//   const [rules, setRules] = useState({});
//   const RULES_DATA_ARRAY = Object.values(rules).flat();

//   const initialPayload = {
//     SCHEME_NUM: "",
//     SCHEME_NAME: "",
//     STATUS: "Active",
//     START_DATE: "",
//     ATTACHMENT: null,
//     RULES_DATA: [],
//   };

//   const [payload, setPayload] = useState(initialPayload);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Submitting payload:", payload);
//     console.log("Rules data:", rules);
//     const finalPayload = {
//       ...payload,
//       RULES_DATA: RULES_DATA_ARRAY,
//     };
//     try {
//       const response = await submitData(VITE_SIA_SCHEME_URL, finalPayload);
//       toast.success("Scheme Submitted successfully");
//     } catch (error) {
//       toast.error("Scheme Data submission failed");
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (productChecked) {
//       getServiceOrderTypesData(setServiceOrderTypesResponse);
//     }
//     if (slabChecked) {
//       getSlabDemarcationData(setSlabDemarcationResponse);
//     }
//     if (blacklistpackageChecked) {
//       getBlacklistPackageData(setBlacklistPackageResponse);
//     }
//     if (packageratesChecked) {
//       getPackageRatesData(setPackageRatesResponse);
//     }
//     if (bearerChecked) {
//       getBearerRatesData(setBearerRatesResponse);
//     }
//   }, [
//     productChecked,
//     slabChecked,
//     blacklistpackageChecked,
//     packageratesChecked,
//     bearerChecked,
//   ]);

//   return (
//     <>
//       <PageHeader title={"Create New Scheme"} />
//       <ToastContainer position="top-center" theme="colored" />

//       <div className="flex gap-3 mt-5">
//         {/* Form Section */}
//         <div className="w-[30%] h-fit block bg-white p-5 rounded-md">
//           <form onSubmit={handleSubmit}>
//             <Input
//               name={"Scheme Number"}
//               type={"text"}
//               value={payload.SCHEME_NUM}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NUM: e.target.value })}
//             />
//             <Input
//               name={"Scheme Name"}
//               type={"text"}
//               value={payload.SCHEME_NAME}
//               onChange={(e) => setPayload({ ...payload, SCHEME_NAME: e.target.value })}
//             />
//             <Dropdown
//               name={"Status"}
//               status={["Active", "Inactive"]}
//               value={payload.STATUS}
//               onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
//             />
//             <Input
//               name={"Start Date"}
//               type={"date"}
//               value={payload.START_DATE}
//               onChange={(e) => setPayload({ ...payload, START_DATE: e.target.value })}
//             />
//             <div className="flex flex-col">
//               <label className="my-1 font-semibold text-gray-500">Upload File</label>
//               <UploadUi />
//             </div>

//             {/* Rules Checkboxes */}
//             <div className="flex flex-col gap-2 mt-2">
//               <label>Rules (Active Only)</label>
//               <Checkbox
//                 name={`Service Order Types (${productActive} Available)`}
//                 checked={productChecked}
//                 onChange={(e) => setProductChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Slab Demarcation (${slabActive} Available)`}
//                 checked={slabChecked}
//                 onChange={(e) => setSlabChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Blacklist Package (${BlacklistActive} Available)`}
//                 checked={blacklistpackageChecked}
//                 onChange={(e) => setBlacklistChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Package Rates (${PackageActive} Available)`}
//                 checked={packageratesChecked}
//                 onChange={(e) => setPackageRatesChecked(e.target.checked)}
//               />
//               <Checkbox
//                 name={`Bearer Rates (${BearerActive} Available)`}
//                 checked={bearerChecked}
//                 onChange={(e) => setBearerChecked(e.target.checked)}
//               />
//             </div>
//             <div className="mt-5">
//               <PrimaryBtn name={"create scheme"} icon={<PlusSquare />} />
//             </div>
//           </form>
//         </div>

//         {/* Rules Table Display */}
//         <div className="grid w-full grid-cols-3 gap-2 p-5 rounded-md h-fit bg-black/20">
//           {productChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("product")}
//               >
//                 Service Order Types <ChevronDown />
//               </button>
//               {openTables.product && (
//                 <SchemeTable
//                   column={serviceordertypesResponse.columns || []}
//                   products={serviceordertypesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, product: ruleObjects })) // consistent key 'product'
//                   }
//                   TABLE_NAME={"Service Order Types"}
//                 />
//               )}
//             </div>
//           )}

//           {slabChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("slab")}
//               >
//                 Slab Demarcation <ChevronDown />
//               </button>
//               {openTables.slab && (
//                 <SchemeTable
//                   column={slabdemarcationResponse.columns || []}
//                   products={slabdemarcationResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, slab: ruleObjects }))
//                   }
//                   TABLE_NAME={"Slab Demarcation"}
//                 />
//               )}
//             </div>
//           )}

//           {blacklistpackageChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("blacklist")}
//               >
//                 Blacklist Package <ChevronDown />
//               </button>
//               {openTables.blacklist && (
//                 <SchemeTable
//                   column={blacklistpackageResponse.columns || []}
//                   products={blacklistpackageResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, blacklist: ruleObjects }))
//                   }
//                   TABLE_NAME={"Blacklist Package"}
//                 />
//               )}
//             </div>
//           )}

//           {packageratesChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("package")}
//               >
//                 Package Rates <ChevronDown />
//               </button>
//               {openTables.package && (
//                 <SchemeTable
//                   column={packageratesResponse.columns || []}
//                   products={packageratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, package: ruleObjects }))
//                   }
//                   TABLE_NAME={"Package Rates"}
//                 />
//               )}
//             </div>
//           )}

//           {bearerChecked && (
//             <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
//               <button
//                 className="flex items-center gap-2 my-2 text-2xl font-black text-white"
//                 onClick={() => toggleTable("bearer")}
//               >
//                 Bearer Rates <ChevronDown />
//               </button>
//               {openTables.bearer && (
//                 <SchemeTable
//                   column={bearerratesResponse.columns || []}
//                   products={bearerratesResponse.data || []}
//                   setRuleId={(ruleObjects) =>
//                     setRules((prev) => ({ ...prev, bearer: ruleObjects }))
//                   }
//                   TABLE_NAME={"Bearer Rates"}
//                 />
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default NewScheme;

import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Checkbox from "../../components/common/CheckBox";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import { ChevronDown, PlusSquare } from "lucide-react";
import Input from "../../components/common/Input";
import Dropdown from "../../components/common/Dropdown";
import { SchemeTable } from "../../components/common/SchemeTable";
import { useTable } from "../../context/TableContext";
import {
  getServiceOrderTypesData,
  getSlabDemarcationData,
  getBlacklistPackageData,
  getPackageRatesData,
  getBearerRatesData,
} from "../../data/dealer/schemeData";
import UploadUi from "../../components/common/UploadUi";
import { submitData } from "../../services/fetchData";
import { toast, ToastContainer } from "react-toastify";

function NewScheme() {
  const VITE_SIA_SCHEME_URL = "http://127.0.0.1:8000/api/schemes/";

  const { openTables = {}, toggleTable = () => {} } = useTable() || {};

  const [productChecked, setProductChecked] = useState(false);
  const [slabChecked, setSlabChecked] = useState(false);
  const [blacklistpackageChecked, setBlacklistChecked] = useState(false);
  const [packageratesChecked, setPackageRatesChecked] = useState(false);
  const [bearerChecked, setBearerChecked] = useState(false);

  const [serviceordertypesResponse, setServiceOrderTypesResponse] = useState({});
  const [slabdemarcationResponse, setSlabDemarcationResponse] = useState({});
  const [blacklistpackageResponse, setBlacklistPackageResponse] = useState({});
  const [packageratesResponse, setPackageRatesResponse] = useState({});
  const [bearerratesResponse, setBearerRatesResponse] = useState({});

  // 🔁 Dynamic rule counts (updates after fetch)
  const [productActive, setProductActive] = useState(0);
  const [slabActive, setSlabActive] = useState(0);
  const [blacklistActive, setBlacklistActive] = useState(0);
  const [packageActive, setPackageActive] = useState(0);
  const [bearerActive, setBearerActive] = useState(0);

  const [rules, setRules] = useState({});
  const RULES_DATA_ARRAY = Object.values(rules).flat();

  const initialPayload = {
    SCHEME_NUM: "",
    SCHEME_NAME: "",
    STATUS: "Active",
    START_DATE: "",
    ATTACHMENT: null,
    RULES_DATA: [],
  };

  const [payload, setPayload] = useState(initialPayload);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalPayload = {
      ...payload,
      RULES_DATA: RULES_DATA_ARRAY,
    };
    try {
      await submitData(VITE_SIA_SCHEME_URL, finalPayload);
      toast.success("Scheme Submitted successfully");
    } catch (error) {
      toast.error("Scheme Data submission failed");
    }
  };

  useEffect(() => {
    if (productChecked) {
      getServiceOrderTypesData((res) => {
        setServiceOrderTypesResponse(res);
        const count = Array.isArray(res.data) ? res.data.length : 0;
        setProductActive(count);
      });
    }

    if (slabChecked) {
      getSlabDemarcationData((res) => {
        setSlabDemarcationResponse(res);
        const count = Array.isArray(res.data) ? res.data.length : 0;
        setSlabActive(count);
      });
    }

    if (blacklistpackageChecked) {
      getBlacklistPackageData((res) => {
        setBlacklistPackageResponse(res);
        const count = Array.isArray(res.data) ? res.data.length : 0;
        setBlacklistActive(count);
      });
    }

    if (packageratesChecked) {
      getPackageRatesData((res) => {
        setPackageRatesResponse(res);
        const count = Array.isArray(res.data) ? res.data.length : 0;
        setPackageActive(count);
      });
    }

    if (bearerChecked) {
      getBearerRatesData((res) => {
        setBearerRatesResponse(res);
        const count = Array.isArray(res.data) ? res.data.length : 0;
        setBearerActive(count);
      });
    }
  }, [
    productChecked,
    slabChecked,
    blacklistpackageChecked,
    packageratesChecked,
    bearerChecked,
  ]);

  return (
    <>
      <PageHeader title={"Create New Scheme"} />
      <ToastContainer position="top-center" theme="colored" />

      <div className="flex gap-3 mt-5">
        {/* Form Section */}
        <div className="w-[30%] h-fit block bg-white p-5 rounded-md">
          <form onSubmit={handleSubmit}>
            <Input
              name={"Scheme Number"}
              type={"text"}
              value={payload.SCHEME_NUM}
              onChange={(e) => setPayload({ ...payload, SCHEME_NUM: e.target.value })}
            />
            <Input
              name={"Scheme Name"}
              type={"text"}
              value={payload.SCHEME_NAME}
              onChange={(e) => setPayload({ ...payload, SCHEME_NAME: e.target.value })}
            />
            <Dropdown
              name={"Status"}
              status={["Active", "Inactive"]}
              value={payload.STATUS}
              onChange={(e) => setPayload({ ...payload, STATUS: e.target.value })}
            />
            <Input
              name={"Start Date"}
              type={"date"}
              value={payload.START_DATE}
              onChange={(e) => setPayload({ ...payload, START_DATE: e.target.value })}
            />
            <div className="flex flex-col">
              <label className="my-1 font-semibold text-gray-500">Upload File</label>
              <UploadUi />
            </div>

            {/* Rules Checkboxes */}
            <div className="flex flex-col gap-2 mt-2">
              <label>Rules (Active Only)</label>
              <Checkbox
                name={`Service Order Types (${productActive} Available)`}
                checked={productChecked}
                onChange={(e) => setProductChecked(e.target.checked)}
              />
              <Checkbox
                name={`Slab Demarcation (${slabActive} Available)`}
                checked={slabChecked}
                onChange={(e) => setSlabChecked(e.target.checked)}
              />
              <Checkbox
                name={`Blacklist Package (${blacklistActive} Available)`}
                checked={blacklistpackageChecked}
                onChange={(e) => setBlacklistChecked(e.target.checked)}
              />
              <Checkbox
                name={`Package Rates (${packageActive} Available)`}
                checked={packageratesChecked}
                onChange={(e) => setPackageRatesChecked(e.target.checked)}
              />
              <Checkbox
                name={`Bearer Rates (${bearerActive} Available)`}
                checked={bearerChecked}
                onChange={(e) => setBearerChecked(e.target.checked)}
              />
            </div>
            <div className="mt-5">
              <PrimaryBtn name={"create scheme"} icon={<PlusSquare />} />
            </div>
          </form>
        </div>

        {/* Tables Display Section */}
        <div className="grid w-full grid-cols-3 gap-2 p-5 rounded-md h-fit bg-black/20">
          {productChecked && (
            <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
              <button
                className="flex items-center gap-2 my-2 text-2xl font-black text-white"
                onClick={() => toggleTable("product")}
              >
                Service Order Types <ChevronDown />
              </button>
              {openTables.product && (
                <SchemeTable
                  column={serviceordertypesResponse.columns || []}
                  products={serviceordertypesResponse.data || []}
                  setRuleId={(ruleObjects) =>
                    setRules((prev) => ({ ...prev, product: ruleObjects }))
                  }
                  TABLE_NAME={"Service Order Types"}
                />
              )}
            </div>
          )}

          {slabChecked && (
            <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
              <button
                className="flex items-center gap-2 my-2 text-2xl font-black text-white"
                onClick={() => toggleTable("slab")}
              >
                Slab Demarcation <ChevronDown />
              </button>
              {openTables.slab && (
                <SchemeTable
                  column={slabdemarcationResponse.columns || []}
                  products={slabdemarcationResponse.data || []}
                  setRuleId={(ruleObjects) =>
                    setRules((prev) => ({ ...prev, slab: ruleObjects }))
                  }
                  TABLE_NAME={"Slab Demarcation"}
                />
              )}
            </div>
          )}

          {blacklistpackageChecked && (
            <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
              <button
                className="flex items-center gap-2 my-2 text-2xl font-black text-white"
                onClick={() => toggleTable("blacklist")}
              >
                Blacklist Package <ChevronDown />
              </button>
              {openTables.blacklist && (
                <SchemeTable
                  column={blacklistpackageResponse.columns || []}
                  products={blacklistpackageResponse.data || []}
                  setRuleId={(ruleObjects) =>
                    setRules((prev) => ({ ...prev, blacklist: ruleObjects }))
                  }
                  TABLE_NAME={"Blacklist Package"}
                />
              )}
            </div>
          )}

          {packageratesChecked && (
            <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
              <button
                className="flex items-center gap-2 my-2 text-2xl font-black text-white"
                onClick={() => toggleTable("package")}
              >
                Package Rates <ChevronDown />
              </button>
              {openTables.package && (
                <SchemeTable
                  column={packageratesResponse.columns || []}
                  products={packageratesResponse.data || []}
                  setRuleId={(ruleObjects) =>
                    setRules((prev) => ({ ...prev, package: ruleObjects }))
                  }
                  TABLE_NAME={"Package Rates"}
                />
              )}
            </div>
          )}

          {bearerChecked && (
            <div className="w-full p-5 overflow-y-auto rounded-md h-fit bg-black/20">
              <button
                className="flex items-center gap-2 my-2 text-2xl font-black text-white"
                onClick={() => toggleTable("bearer")}
              >
                Bearer Rates <ChevronDown />
              </button>
              {openTables.bearer && (
                <SchemeTable
                  column={bearerratesResponse.columns || []}
                  products={bearerratesResponse.data || []}
                  setRuleId={(ruleObjects) =>
                    setRules((prev) => ({ ...prev, bearer: ruleObjects }))
                  }
                  TABLE_NAME={"Bearer Rates"}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NewScheme;
