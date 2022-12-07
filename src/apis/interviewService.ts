import { getCustomAPI, AI_OPEN_API, API } from "./api";
import { MockInterview } from "types/interview/interview-type";

const showEmotionPrediction = async (show: string) => {
    return await getCustomAPI('http://localhost', '8000').get(`/emotion?show=${show}`)
        .catch((e) => console.log(e));
};

const getEmotionAnalysisResult = async () => {
    return await getCustomAPI('http://localhost', '8000').get(`/stop-interview`)
        // .then((res) => console.log("apiRes" + res.headers["happy"]))
        .then((res) => (res.data))
        .catch((e) => console.log(e));
};

const startEmotionAnalysis = async () => {
    return await getCustomAPI('http://localhost', '8000').get(`/start-interview`)
        .catch((e) => console.log(e));
};

const calcFrequency = async (text: string) => {
    return await AI_OPEN_API.post("", {
        request_id: "reserved field",
        argument: {
            analysis_code: "ner",
            text: text
        }
    })
        .then((res) => res.data)
        .catch((e) => { console.log(e) });
}

const saveVideo = async (formData: FormData) => {
    return await API.post("interviews/result/video",
    formData,
    {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    )
        .then((res) => res.data)
        .catch((e) => { console.log(e) })
}

const createInterview = async (body: object) => {
    return await API.post("interviews/result", body)
        .then((res) => res.data)
        .catch((e) => { console.log(e) })
}


const getInterviewList = async () => {
    return await API.get("interviews/result")
        .then((res) => res.data)
        .catch((e) => console.log(e));
};

const getInterview = async (resumeId: number) => {
    return await API.get(`interviews/result/${resumeId}`)
        .then((res) => res.data)
        .catch((e) => console.log(e));
}

export {
    showEmotionPrediction,
    getEmotionAnalysisResult,
    startEmotionAnalysis,
    calcFrequency,
    saveVideo,
    createInterview,
    getInterviewList,
    getInterview
}