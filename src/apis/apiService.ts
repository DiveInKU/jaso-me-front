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

    getMembers: async (email: string) => {
      return await API.get("/members/availability",{
        params: { email: email},
      });
    },

    getTestMembers: async () => {
      return await API.get("/members",{
          headers: {Authorization: `${localStorage.getItem('jwt')}`}
      });
    },

    postMembersNew: async (email: string, name:string, password:string) => {
      return await API.post("/members/new",{
        email: email, 
        name:name, 
        password:password
      });
    },

    postMembersLogin: async (email: string, password: string) => {
      return await API.post("/members/login",{
        email: email,
        password:password
      });
    }
  };
  return apiService;
}

export default ApiService;