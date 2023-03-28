import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v0`;

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "X-Requested-With": "XMLHttpRequest", Accept: "application/json" },
});

export { http, API_URL };
