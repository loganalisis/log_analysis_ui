import axios from "axios";

const GATEWAY_URL = "http://127.0.0.1:8080/gateway";

// const log_processor_url = "http://127.0.0.1:8000";
// const analytices_service_url = "http://127.0.0.1:8081";

export const uploadLog = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${GATEWAY_URL}/upload-log/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getDashboard = async (unique_key) => {
  const res = await axios.post(`${GATEWAY_URL}/process-analytics/`, {
    unique_key,
  });
  return res.data;
};

export const insertData = async (unique_key) => {
  const res = await axios.post(`${GATEWAY_URL}/run-kafka/`, {
    unique_key,
  });
  return res.data;
};
