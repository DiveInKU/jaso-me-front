import { CoverLetterPair } from "types/coverletter/coverletter-type";
import API from "./api";

const createCoverLetter = async (qnas: Array<CoverLetterPair>, title: string) => {
    return await API.post("/resumes", {
      qnas: qnas,
      title: title
    })
    .then((res) => { console.log(res.data) })
    .catch((e) => { 
      console.log(e) 
      return e; 
    });
};

export {
    createCoverLetter
}