import { API } from "./api";

const getMembersQuestions = async () => {
    return await API.get("/members/questions")
        .then((res) => res.data)
        .catch((e) => console.log(e));
  };

export {
    getMembersQuestions,
}