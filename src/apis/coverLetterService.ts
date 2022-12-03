import { QnAPair } from "types/coverletter/coverletter-type";
import { API, NAVER_API } from "./api";

const createCoverLetter = async (qnas: Array<QnAPair>, category: string, title: string) => {
    return await API.post("/resumes", {
      qnas: qnas,
      category: category,
      title: title
    })
        .then((res) => { console.log(res.data) })
        .catch((e) => { console.log(e) });
};

const getCoverLetterList = async () => {
    return await API.get("/resumes")
        .then((res) => res.data)
        .catch((e) => console.log(e));
};

const getCoverLetter = async (resumeId: number) => {
    return await API.get(`/resumes/${resumeId}`)
        .then((res) => res.data)
        .catch((e) => console.log(e));
}

const deleteCoverLetter = async (resumeId: number) => {
    return await API.delete(`/resumes/${resumeId}`)
        .then((res) => res.data)
        .catch((e) => console.log(e));
}

const changeCoverLetter = async (qnas: Array<QnAPair>, category: string, title: string, resumeId: number) => {
    return await API.put(`/resumes/${resumeId}`, {
      qnas: qnas,
      category: category,
      title: title
    })
        .then((res) => { console.log(res.data) })
        .catch((e) => { console.log(e) });
};

const checkSpell = async (text: String) => {
    return await NAVER_API.get('', {
        params: {
            _callback: 'window.__jindo2_callback._spellingCheck_0',
            q: text,
        }
    })
        .then((res) => res.data )
        .catch((e) => console.log(e))
};

export {
    createCoverLetter,
    getCoverLetterList,
    getCoverLetter,
    deleteCoverLetter,
    changeCoverLetter,
    checkSpell
}