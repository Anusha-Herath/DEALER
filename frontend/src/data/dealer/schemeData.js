import { fetchData } from "../../services/fetchData";
const VITE_SIA_SERVICE_ORDER_TYPES_URL = 'http://127.0.0.1:8000/api/so_types/';
const VITE_SIA_BLACKLIST_PACKAGES_URL = 'http://127.0.0.1:8000/api/blacklist/';
const VITE_SIA_SLAB_DEMARCATION_URL = 'http://127.0.0.1:8000/api/slab_level/';
const VITE_SIA_PACKAGE_RATES_URL = 'http://127.0.0.1:8000/api/package-rates/';
const VITE_SIA_BEARER_RATES_URL = 'http://127.0.0.1:8000/api/bearer-rates/';

// Service Order Types Data
export const getServiceOrderTypesData = async (
  setServiceOrderTypesResponse
) => {
  try {
    let columns = ["RULE_ID", "PRODUCT", "STATUS"];
    const response = await fetchData(VITE_SIA_SERVICE_ORDER_TYPES_URL);
    let data = {
      columns: columns,
      data: response
        .filter((item) => item.STATUS === "Active")
        .map((item) => ({
          ONE: item.ID,
          TWO: item.PRODUCT,
          STATUS: item.STATUS,
        })),
      IDS: response.map((res) => res.ID),
    };
    setServiceOrderTypesResponse(data);
  } catch (error) {
    console.error("Error fetching Service Order Types data", error);
  }
};

// Slab Demarcation Data
export const getSlabDemarcationData = async (setSlabDemarcationResponse) => {
  try {
    let columns = ["RULE_ID", "SLAB_LEVEL", "STATUS"];
    const response = await fetchData(VITE_SIA_SLAB_DEMARCATION_URL);
    let data = {
      columns: columns,
      data: response
        .filter((item) => item.STATUS === "Active")
        .map((item) => ({
          ONE: item.ID,
          TWO: item.SLAB_LEVEL,
          STATUS: item.STATUS,
        })),
    };
    setSlabDemarcationResponse(data);
  } catch (error) {
    console.error("Error fetching Slab Demarcation data", error);
  }
};

// Blacklist Package data
export const getBlacklistPackageData = async (setBlacklistPackageResponse) => {
  try {
    let columns = ["RULE_ID", "STAGE_LEVEL", "STATUS"];
    const response = await fetchData(VITE_SIA_BLACKLIST_PACKAGES_URL);
    let data = {
      columns: columns,
      data: response
        .filter((item) => item.STATUS === "Active")
        .map((item) => ({
          ONE: item.ID,
          TWO: item.STAGE_LEVEL,
          STATUS: item.STATUS,
        })),
    };
    setBlacklistPackageResponse(data);
  } catch (error) {
    console.error("Error fetching Blacklist Package data", error);
  }
};

// Package Rates data
export const getPackageRatesData = async (setPackageRatesResponse) => {
  try {
    let columns = ["RULE_ID", "STAGE_LEVEL", "STATUS"];
    const response = await fetchData(VITE_SIA_PACKAGE_RATES_URL);
    let data = {
      columns: columns,
      data: response
        .filter((item) => item.STATUS === "Active")
        .map((item) => ({
          ONE: item.ID,
          TWO: item.STAGE_LEVEL,
          STATUS: item.STATUS,
        })),
    };
    setPackageRatesResponse(data);
  } catch (error) {
    console.error("Error fetching Package Rates data", error);
  }
};

// Bearer Rates Data
export const getBearerRatesData = async (setBearerRatesResponse) => {
  try {
    let columns = ["RULE_ID", "TARIFF_ID", "STATUS"];
    const response = await fetchData(VITE_SIA_BEARER_RATES_URL);
    let data = {
      columns: columns,
      data: response
        .filter((item) => item.STATUS === "Active")
        .map((item) => ({
          ONE: item.ID,
          TWO: item.TARIFF_ID,
          STATUS: item.STATUS,
        })),
    };
    setBearerRatesResponse(data);
  } catch (error) {
    console.error("Error fetching Bearer Rates data", error);
  }
};









