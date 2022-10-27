import axios from "axios";
const API = axios.create({
  baseURL: "http://3.37.211.240:9000/",
  headers: { "Content-Type": `application/json` },
  withCredentials: false,
});

export default API;