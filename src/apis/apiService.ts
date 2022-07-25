import API from "./api";
function ApiService() {
  const apiService = {
    getContent: async (user_text: string) => {
      return await API.post("/text/new", {
        user_text: user_text,
      })
      .then((res) => res.data)
      .catch((e) => { 
        console.log(e) 
        return e; 
      });
    },
  };

  return apiService;
}

export default ApiService;