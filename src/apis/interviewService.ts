import axios, { Axios, AxiosResponse } from "axios";
import { API,  getCustomAPI } from "./api";

const showEmotionPrediction = async (show: string) => {
    return await getCustomAPI('http://localhost', '8000').get(`/emotion?show=${show}`)
        .catch((e) => console.log(e));
};

// interface result {
//     url: string
//     happyPer: string
// }

const getEmotionAnalysisResult = async () => {
    return await getCustomAPI('http://localhost', '8000').get(`/stop-interview`)
        // .then((res) => console.log("apiRes" + res.headers["happy"]))
        .then((res) => console.log('getEmotionAnalysisResult', res))
        // .then((res) => {
        //     const url = URL.createObjectURL(new Blob([new ArrayBuffer(res.data)], { type: "image/png" }))
        //     const happyPer = res.headers["happy_per"];
        //     console.log(res);
        //     setSrc("url" + url);
        //     setHappyFer("happy" + happyPer);
        //     // const url = URL.createObjectURL(new Blob([new ArrayBuffer(res.data)], { type: "image/png" }))
        //     // const happyPer = res.headers["happy_per"];
        //     // // const data: result = {url: url, happyPer: happyPer};
        //     // const result:string[] = [url, happyPer]
        //     // return result
        // })
        .catch((e) => console.log(e));
};

const startEmotionAnalysis = async () => {
    return await getCustomAPI('http://localhost', '8000').get(`/start-interview`)
        .catch((e) => console.log(e));
};

export {
    showEmotionPrediction,
    getEmotionAnalysisResult,
    startEmotionAnalysis
}