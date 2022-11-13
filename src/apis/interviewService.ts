import { API,  getCustomAPI } from "./api";

const showEmotionPrediction = async (show: string) => {
    return await getCustomAPI('http://localhost', '8000').get(`/emotion?show=${show}`)
        .catch((e) => console.log(e));
};

const getEmotionAnalysisResult = async () => {
    return await getCustomAPI('http://localhost', '8000').get(`/result`)
        .then((res) => res.data)
        .catch((e) => console.log(e));
};

export {
    showEmotionPrediction,
    getEmotionAnalysisResult
}