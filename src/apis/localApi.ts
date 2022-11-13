import axios from "axios";
const LocalAPI = axios.create({
  baseURL: "http://localhost:5000/",
  // headers: { "Content-Type": `application/json` },
  withCredentials: false,
});

const jwt = localStorage.getItem('jwt')

LocalAPI.defaults.headers.common['Authorization'] = jwt
  ? jwt
  : '';

export default LocalAPI;