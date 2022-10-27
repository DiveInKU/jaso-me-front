import GlobalStyled from "styles/GlobalStyled";
import React, {  useEffect, useState, useRef } from "react";
import TopNavigationBar from "components/TopNavigationBar";
import themes from "styles/themes";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import LeftBubble from "components/LeftBubble";
import RightBubble from "components/RightBubble";
import { History, HISTORY_TYPE } from "types/interview/interview-type";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

const InterviewRoom: React.FC = () => {

    const questions: Array<string> = [
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
        "가장 인상깊은 과목이 있다면 한가지를 말해주세요.",
        "최근 가장 몰입한 경험이 무엇인가요?",
        "목표를 달성하는 방법을 말해주세요.",
        "협업을 하며 갈등 경험과 해결한 방법을 말해주세요.",
    ];

    const [stage, setStage] = useState<number>(-1); // 현재 질문 단계
    const [logs, setLogs] = useState<History[]>([{text: questions[0], type: HISTORY_TYPE.QUESTION}]); // 질문 + 답변 기록 배열
    const [value, setValue] = useState<string>("");
    const [isRecording, setIsRecording] = useState<boolean>(true);

    // react webcam
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder>(null);
    const [capturing, setCapturing] = useState<boolean>(false);
    const [recordedChunks, setRecordedChunks] = useState([]);

    const { speak } = useSpeechSynthesis();
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: string) => {
          setValue(result);
        },
    });

    const handleSpeaking = (e: React.MouseEvent<HTMLButtonElement>) => {
        listen();
    }

    const moveToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (stage == questions.length - 1) {

            // 마지막 답변 저장
            const curAnswer: History = {text: value, type: HISTORY_TYPE.ANSWER}
            setLogs([...logs, curAnswer]);

            // 녹화 중지
            stopInterviewRecording();
            stop();
        }
        else { // 다음 질문 출력
            setStage(stage + 1);

            const curAnswer: History = {text: value, type: HISTORY_TYPE.ANSWER}
            const nextQuestion: History = {text: questions[stage + 1], type: HISTORY_TYPE.QUESTION}

            setLogs([...logs, curAnswer, nextQuestion]);
            stop();
        }
    }

    // const handleStartCaptureClick = React.useCallback(() => {
    //     setCapturing(true);
    //     mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
    //       mimeType: "video/webm"
    //     });
    //     mediaRecorderRef.current.addEventListener(
    //       "dataavailable",
    //       handleDataAvailable
    //     );
    //     mediaRecorderRef.current.start();
    //   }, [webcamRef, setCapturing, mediaRecorderRef]);
    
    // const handleDataAvailable = React.useCallback(
    //     ({ data }) => {
    //       if (data.size > 0) {
    //         setRecordedChunks((prev) => prev.concat(data));
    //       }
    //     },
    //     [setRecordedChunks]
    // );
    
    // const handleStopCaptureClick = React.useCallback(() => {
    //     mediaRecorderRef.current.stop();
    //     setCapturing(false);
    // }, [mediaRecorderRef, webcamRef, setCapturing]);
    
    // const handleDownload = React.useCallback(() => {
    //     if (recordedChunks.length) {
    //       const blob = new Blob(recordedChunks, {
    //         type: "video/webm"
    //       });
    //       const url = URL.createObjectURL(blob);
    //       const a = document.createElement("a");
    //       document.body.appendChild(a);
    //       a.style = "display: none";
    //       a.href = url;
    //       a.download = "react-webcam-stream-capture.webm";
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //       setRecordedChunks([]);
    //     }
    // }, [recordedChunks]);

    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, video: true });
    
    const startInterviewRecording = () => {
        startRecording();
    }

    const stopInterviewRecording = () => {
        stopRecording();
        setIsRecording(false);
    }

    // 최초 렌더링 시 녹화 시작
    useEffect(() => {
        startInterviewRecording();
    }, []);

    // stage가 변할 때 마다 질문 읽어준다.
    useEffect(() => {
        if (stage < 0)
            setStage(0);
        speak({ text: questions[stage] });
    }, [stage]);

    return(
        <GlobalStyled.ViewCol style ={{ backgroundColor: themes.colors.background }}>
            <TopNavigationBar state="모의 면접"/>
            <GlobalStyled.ViewRow>
                <GlobalStyled.ViewCol className="webcam-div" style={{flex: 5}}>
                    <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div className="interview-title">2022 상반기 네이버 공채 모의 면접</div>
                    </BlueBox>
                    <Webcam src={mediaBlobUrl} audio={true} mirrored={true} style={{ flex: 8 }} />
                    {/* {isRecording ? 
                        <Webcam src={mediaBlobUrl} mirrored={true} style={{ flex: 8 }} />
                        : 
                        <div style={{ flex: 8 }}>
                            <video src={mediaBlobUrl} controls autoPlay loop />
                        </div>
                    } */}
                    <BlueBox 
                        className="media-box"
                        style={{ flex: 1, justifyContent: 'space-between', paddingLeft: 30, paddingRight: 30, height: 80}}>
                        <Button 
                            className="speak-btn"
                            disableElevation
                            variant="contained"
                            onClick={handleSpeaking}
                            style={{
                                backgroundColor: 'white',
                                color: themes.colors.main_blue, 
                                fontWeight: 800}}
                        >
                            {listening ? "답변 중" : "답변 시작"}
                        </Button>
                        <Button
                            className="next-btn"
                            disableElevation
                            variant="contained"
                            onClick={moveToNext}
                            style={{
                                backgroundColor: 'white',
                                color: themes.colors.main_blue, 
                                fontWeight: 800}}
                            >
                                {stage == questions.length-1 ? "면접 종료" : "다음으로"}
                        </Button>
                    </BlueBox>
                </GlobalStyled.ViewCol>

                <GlobalStyled.ViewCol className="history-div" style={{flex: 4}}>
                    <BlueBox style={{ flex:1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div>대화 기록</div>
                    </BlueBox>

                    <GlobalStyled.ViewCol style={{ flex: 30, backgroundColor: 'white' }}>
                        {
                            logs.map((log, idx) => {
                                return (
                                    log.type == HISTORY_TYPE.QUESTION ?
                                    <LeftBubble text={log.text} /> :
                                    <RightBubble text={log.text} />
                                )
                            })
                        }
                    </GlobalStyled.ViewCol>

                </GlobalStyled.ViewCol>
            </GlobalStyled.ViewRow>

        </GlobalStyled.ViewCol>
    )
}

const BlueBox = styled(GlobalStyled.ViewRow)`
    background-color: ${themes.colors.main_blue};
    color: ${themes.colors.white};
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 'auto';
    height: '10%';
`;


export default InterviewRoom;