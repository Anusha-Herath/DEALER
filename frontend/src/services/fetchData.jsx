import axios from "axios";

// creating a function to get data from the API
// export const fetchData = async (url) => {
//   try {
//     const response = await axios.get(url);
//     const data = await response.data;
//     console.log(data);
//     // send only the active data
//     return data.filter((item) => item.STATUS === "Active");
//   } catch (error) {
//     console.error("Error while getting data", error);
//     throw error;
//   }
// };

export const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = response.data;

    console.log("Fetched data:", data); // Debug log

    return data.filter((item) => item.STATUS?.toLowerCase() === "active");
  } catch (error) {
    console.error("Error while fetching active data:", error);
    throw error;
  }
};


// fetching inactive data from the API
export const fetchInactiveData = async (url) => {
  try {
    const response = await axios.get(url);
    const data = await response.data;
    console.log(data);
    // send only the inactive data
    return data.filter((item) => item.STATUS === "Inactive");
  } catch (error) {
    console.error("Error while getting inactive data", error);
    throw error;
  }
};

// to add new data for the API
export const submitData = async (url, payload) => {
  try {
    const response = await axios.post(url, payload);
    console.log("Data added successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while adding data", error);
    throw error;
  }
};


// update the data in the API
export const updateData = async (url, id, payload) => {
  try {
    const response = await axios.put(`${url}${id}/`, payload);
    console.log("Data updated successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Error while updating data", error);
    throw error;
  }
};
