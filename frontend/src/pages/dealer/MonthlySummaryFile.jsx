import { useEffect, useState } from "react";
import PageHeader from "../../components/dealer/MonthlySummaryFileHeader";
import ActionTable from "../../components/common/ActionTable";
import PrimaryBtn from "../../components/common/PrimaryBtn";
import ModalPopup from "../../components/common/ModalPopup";
import { useModal } from "../../context/ModalContext";
import { PlusCircle } from "lucide-react";
import { fetchData, submitData, updateData } from "../../services/fetchData";
import sideImg from "../../assets/images/userSideImg.png";
import Input from "../../components/common/Input";
import { ToastContainer, toast } from "react-toastify";

function MonthlySummaryFile() {
  const { openModal, closeModal } = useModal();

  // creating a state to setData
  const [response, setResponse] = useState([]);

  //add API URL here for easy access for all the functions in this page
  const VITE_SIA_SO_TYPES_URL = import.meta.env.VITE_SIA_SO_TYPES_URL;

  const initialPayload = {
    id: "",
    tariff_id: "",
    package_name: "",
    created_date: "",
    created_user: "",
    updated_date: "",
    updated_user: "",
    status: "ACTIVE",
  };

  // create a state object to set the data
  const [payload, setPayload] = useState(initialPayload);

  // handle the form submission to add the data
  const handleSubmit = async () => {
    try {
      const response = await submitData(VITE_SIA_SO_TYPES_URL, payload);
      toast.success("Data submitted successfully!");
      getData(); // Refresh the table data
      closeModal();
    } catch (error) {
      toast.error(`Error submitting data: ${error.message}`);
    }
  };

  //opening the modal to add data
  const handleAddData = () => {
    setPayload(initialPayload); // Reset the payload to initial state
    openModal("addBlacklistPackage");
  };

  useEffect(() => {
    getData(); // calling the function when loading
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    "Tariff ID",
    "Package Name",
    "Status",
  ];

  // Safely process response data
  const data = Array.isArray(response)
    ? response
      .sort((a, b) => (a.id || 0) - (b.id || 0))
      .map((item) => ({
        id: item.id,
        "Tariff ID": item.tariff_id || "",
        "Package Name": item.package_name || "",
        "Status": item.status || "",
      }))
    : [];

  // writing a function to get the data from database
  const getData = async () => {
    try {
      const data = await fetchData(VITE_SIA_SO_TYPES_URL);
      // Ensure we always set an array, even if the response is null/undefined
      setResponse(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse([]); // Set to empty array on error
      toast.error("Error fetching data");
    }
  };

  // fetching data for update when clicking on the update button of a row
  const handleUpdate = async (id) => {
    try {
      toast.info("Fetching data for update...");
      // find the data from the response array using the id
      const selectedData = Array.isArray(response)
        ? response.find((item) => item.id === id)
        : null;

      // set the payload with the selected data
      if (selectedData) {
        setPayload({
          id: selectedData.id,
          tariff_id: selectedData.tariff_id || "",
          package_name: selectedData.package_name || "",
          updated_date: selectedData.updated_date || "",
          updated_user: selectedData.updated_user || "",
          scheme: selectedData.scheme || "",
          status: selectedData.status || "ACTIVE",
        });
        openModal("updateBlacklistPackage");
      } else {
        toast.error("Data not found for the selected ID.");
      }
    } catch (error) {
      toast.error(`Error fetching data for update: ${error.message}`);
    }
  };

  // updating the database with the updated data when click on update button in form
  const handleUpdatedData = async () => {
    try {
      if (payload.id) {
        await updateData(
          VITE_SIA_SO_TYPES_URL,
          payload.id,
          payload
        );
        toast.success("Data updated successfully!");
        getData(); // Refresh the table data
        closeModal();
      }
    } catch (error) {
      toast.error(`Error updating data: ${error.message}`);
    }
  };

  return (
    <div className="block">
      <ToastContainer position="top-center" theme="colored" />
      <PageHeader title="Blacklist Package" />
      <ActionTable columns={columns} data={data} handleUpdate={handleUpdate} />
      <div className="flex justify-end pr-2">
        <PrimaryBtn
          name="Add New Blacklist Package"
          icon={<PlusCircle />}
          onClick={handleAddData}
        />
      </div>
      <ModalPopup
        title="Blacklist Package"
        sideImg={sideImg}
        modalName="addBlacklistPackage"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Tariff ID"
            type="text"
            value={payload.tariff_id}
            onChange={(e) =>
              setPayload({ ...payload, tariff_id: e.target.value })
            }
          />

          <Input
            name="Package Name"
            type="text"
            value={payload.package_name}
            onChange={(e) =>
              setPayload({ ...payload, package_name: e.target.value })
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

          <div>
            <label className="block mb-1 text-sm font-medium">Scheme</label>
            <select
              className="w-full p-2 border rounded"
              value={payload.scheme}
              onChange={(e) => setPayload({ ...payload, scheme: e.target.value })}
            >
              <option value="">Select</option>
              <option value="scheme1">scheme 1</option>
              <option value="scheme2">scheme 2</option>
              <option value="scheme3">scheme 3</option>

            </select>
          </div>

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
        title="Update Blacklist Package"
        sideImg={sideImg}
        modalName="updateBlacklistPackage"
      >
        <div className="grid w-full grid-cols-2 gap-5 px-10 ml-5">
          <Input
            name="Tariff ID"
            type="text"
            value={payload.tariff_id}
            onChange={(e) =>
              setPayload({ ...payload, tariff_id: e.target.value })
            }
          />

          <Input
            name="Package Name"
            type="text"
            value={payload.package_name}
            onChange={(e) =>
              setPayload({ ...payload, package_name: e.target.value })
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

export default MonthlySummaryFile;