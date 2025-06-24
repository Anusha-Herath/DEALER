import React, { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import ActionTable from "../../components/common/ActionTable";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import ModalPopup from "../../components/common/ModalPopup";
import { useModal } from "../../context/ModalContext";
import { PlusCircle } from "lucide-react";
import { fetchData, submitData, updateData } from "../../services/fetchData";
import sideImg from "../../assets/images/userSideImg.png";
import Input from "../../components/common/Input";
import Dropdown from "../../components/common/Dropdown";
import { ToastContainer, toast } from "react-toastify";

function ProdEligibility() {
  const { openModal, closeModal } = useModal();

  // creating a state to setData
  const [response, setResponse] = useState([]);

  //add API URL here for easy access for all the functions in this page
  const VITE_SIA_SO_TYPES_URL = import.meta.env.VITE_SIA_SO_TYPES_URL;

  const initialPayload = {
    id: "",
    product: "",
    sales_type: "",
    service_type: "",
    order_type: "",
    slab_eligibility: false,
    pcr_eligibility: true,
    created_date: "",
    created_user: "",
    updated_date: "",
    updated_user: "",
    status: "Active",
  };

  // create a state object to set the data
  const [payload, setPayload] = useState(initialPayload);

  // handle the form submission to add the data
  const handleSubmit = async () => {
    try {
      const response = await submitData(VITE_SIA_SO_TYPES_URL, payload);
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
  }, []);

  const columns = [
    "Product",
    "Sales type",
    "Service type",
    "Order type",
    "Considered for PCR",
    "Considered for slab",
    "Status",
  ];
  const data = response
    .sort((a, b) => a.id - b.id)
    .map((item) => ({
      id: item.id,
      Product: item.product,
      "Sales type": item.sales_type,
      "Service type": item.service_type,
      "Order type": item.order_type,
      "Considered for PCR": item.pcr_eligibility ? "True" : "false",
      "Considered for slab": item.slab_eligibility ? "True" : "false",
      Status: item.status,
    }));

  // writing a function to get the data from database
  const getData = async () => {
    let data = [];
    data = await fetchData(VITE_SIA_SO_TYPES_URL);
    setResponse(data);
  };

  // fetching data for update when clicking on the update button of a row
  const handleUpdate = async (id) => {
    toast.info(`Fetching data for update...`);
    console.log(id);
    // find the data from the response array using the id
    const selectedData = response.find((item) => item.id === id);
    // set the payload with the selected data
    if (selectedData) {
      setPayload({
        id: selectedData.id,
        product: selectedData.product,
        sales_type: selectedData.sales_type,
        service_type: selectedData.service_type,
        order_type: selectedData.order_type,
        slab_eligibility: selectedData.slab_eligibility,
        pcr_eligibility: selectedData.pcr_eligibility,
        updated_date: selectedData.updated_date,
        updated_user: selectedData.updated_user,
        status: selectedData.status,
      });
      openModal("updateProduct");
    } else {
      toast.error("Data not found for the selected ID.");
    }
  };
  // updating the database with the updated data when click on update button in form
  const handleUpdatedData = async () => {
    try {
      if (payload.id) {
        const updatedData = await updateData(
          VITE_SIA_SO_TYPES_URL,
          payload.id,
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

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader title="Product Eligibility" />
      <ActionTable columns={columns} data={data} handleUpdate={handleUpdate} />
      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Product"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>
      <ModalPopup
        title="Product Eligibility"
        sideImg={sideImg}
        modalName="addProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Product"
            type="text"
            value={payload.product}
            onChange={(e) =>
              setPayload({ ...payload, product: e.target.value })
            }
          />
          <Input
            name="Sales Type"
            type="text"
            value={payload.sales_type}
            onChange={(e) =>
              setPayload({ ...payload, sales_type: e.target.value })
            }
          />
          <Input
            name="Service Type"
            type="text"
            value={payload.service_type}
            onChange={(e) =>
              setPayload({ ...payload, service_type: e.target.value })
            }
          />
          <Input
            name="Order Type"
            type="text"
            value={payload.order_type}
            onChange={(e) =>
              setPayload({ ...payload, order_type: e.target.value })
            }
          />
          <Dropdown
            name="Considered for PCR"
            value={payload.pcr_eligibility}
            onChange={(e) =>
              setPayload({
                ...payload,
                pcr_eligibility: JSON.parse(e.target.value),
              })
            }
          />
          <Dropdown
            name="Considered for slab"
            value={payload.slab_eligibility}
            onChange={(e) =>
              setPayload({
                ...payload,
                slab_eligibility: JSON.parse(e.target.value),
              })
            }
          />
          <Input
            name="Created Date"
            type="Date"
            value={payload.created_date}
            onChange={(e) =>
              setPayload({ ...payload, created_date: e.target.value })
            }
          />
          <Input
            name="Created user"
            type="text"
            value={payload.created_user}
            onChange={(e) =>
              setPayload({ ...payload, created_user: e.target.value })
            }
          />
          <Input
            name="Updated Date"
            type="Date"
            value={payload.updated_date}
            onChange={(e) =>
              setPayload({ ...payload, updated_date: e.target.value })
            }
          />
          <Input
            name="Updated user"
            type="text"
            value={payload.updated_user}
            onChange={(e) =>
              setPayload({ ...payload, updated_user: e.target.value })
            }
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
        title="Update Product Eligibility"
        sideImg={sideImg}
        modalName="updateProduct"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Product"
            type="text"
            value={payload.product}
            onChange={(e) =>
              setPayload({ ...payload, product: e.target.value })
            }
          />
          <Input
            name="Sales Type"
            type="text"
            value={payload.sales_type}
            onChange={(e) =>
              setPayload({ ...payload, sales_type: e.target.value })
            }
          />
          <Input
            name="Service Type"
            type="text"
            value={payload.service_type}
            onChange={(e) =>
              setPayload({ ...payload, service_type: e.target.value })
            }
          />
          <Input
            name="Order Type"
            type="text"
            value={payload.order_type}
            onChange={(e) =>
              setPayload({ ...payload, order_type: e.target.value })
            }
          />
          <Dropdown
            name="Considered for PCR"
            value={payload.pcr_eligibility}
            onChange={(e) =>
              setPayload({
                ...payload,
                pcr_eligibility: JSON.parse(e.target.value),
              })
            }
          />
          <Dropdown
            name="Considered for slab"
            value={payload.slab_eligibility}
            onChange={(e) =>
              setPayload({
                ...payload,
                slab_eligibility: JSON.parse(e.target.value),
              })
            }
          />
          <Input
            name="Updated Date"
            type="Date"
            value={payload.updated_date}
            onChange={(e) =>
              setPayload({ ...payload, updated_date: e.target.value })
            }
          />
          <Input
            name="Updated user"
            type="text"
            value={payload.updated_user}
            onChange={(e) =>
              setPayload({ ...payload, updated_user: e.target.value })
            }
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

export default ProdEligibility;
