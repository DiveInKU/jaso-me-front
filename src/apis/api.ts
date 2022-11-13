import axios from "axios";

const API = axios.create({
  baseURL: "http://3.37.211.240:9000/",
  // headers: { "Content-Type": `application/json` },
  withCredentials: false,
});

const getCustomAPI = (base: string, port:string) => {
  return axios.create({
    baseURL: base + ":" + port + "/",
    // headers: { "Content-Type": `application/json` },
    withCredentials: false,
  });
};

const jwt = localStorage.getItem('jwt')

API.defaults.headers.common['Authorization'] = jwt
  ? jwt
  : '';

export {
  API,
  getCustomAPI
}