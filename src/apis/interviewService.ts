import axios, { Axios, AxiosResponse } from "axios";
import { API,  getCustomAPI, AI_OPEN_API } from "./api";

const showEmotionPrediction = async (show: string) => {
    return await getCustomAPI('http://localhost', '8000').get(`/emotion?show=${show}`)
        .catch((e) => console.log(e));
};

const getEmotionAnalysisResult = async () => {
    return await getCustomAPI('http://localhost', '8000').get(`/stop-interview`)
        // .then((res) => console.log("apiRes" + res.headers["happy"]))
        .then((res) => console.log('getEmotionAnalysisResult', res))
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


export {
    showEmotionPrediction,
    getEmotionAnalysisResult,
    startEmotionAnalysis,
    calcFrequency,
}