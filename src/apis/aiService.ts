import API from "./localApi";

const generateCoverLetter = async (category:string, sentence:string, number:number) => {
    return await API.post("/generate", {
      category: category,
      sentence: sentence,
      number:3
    })
        .then((res) => res.data)
        .catch((e) => { console.log(e) });
};

export {
    generateCoverLetter,
   
}