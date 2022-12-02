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

const NAVER_API = axios.create({
  baseURL: "https://m.search.naver.com/p/csearch/ocontent/spellchecker.nhn",
  headers: { 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    'referer': 'https://search.naver.com/' 
  },
  withCredentials: false,
});

export {
  API,
  NAVER_API,
  getCustomAPI
}