import { API } from "./api";
import {QuestionSet} from "types/mypage/mypage-type";

const getMembersQuestions = async () => {
    return await API.get("/interviews/questions")
        .then((res) => res.data)
        .catch((e) => console.log(e));
};

const saveMembersQuestions = async (content: Array<QuestionSet>) => {
    return await API.post("/interviews/questions", content)
        .then((res) => { console.log(res.data) })
        .catch((e) => { console.log(e) });
};

const getRandomQuestions = async (isCommonRandom: boolean, isMemberRandom: boolean, questionCount:number) => {
    return await API.get("/interviews/questions/random",{
        params:{
            isCommonRandom,
            isMemberRandom,
            questionCount,}
    })
        .then((res) => res.data)
        .catch((e) => console.log(e));
};


export {
    getMembersQuestions,
    saveMembersQuestions,
    getRandomQuestions,
}