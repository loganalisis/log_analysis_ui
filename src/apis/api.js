import axios from "axios";

// const GATEWAY_URL = "http://localhost:8080"; // Django Gateway

const log_processor_url = "http://127.0.0.1:8000";
const analytices_service_url = "http://127.0.0.1:8081";

export const uploadLog = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${log_processor_url}/upload/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getDashboard = async (unique_key) => {
  const res = await axios.post(`${analytices_service_url}/dashboard/`, {
    unique_key,
  });
  return res.data;
};

export const insertData = async (unique_key) => {
  const res = await axios.post(`${analytices_service_url}/add/`, {
    unique_key,
  });
  return res.data;
};
