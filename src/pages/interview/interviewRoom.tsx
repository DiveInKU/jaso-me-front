import GlobalStyled from "styles/GlobalStyled";
import React, {  useEffect, useState, useRef } from "react";
import TopNavigationBar from "components/common/TopNavigationBar";
import themes from "styles/themes";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";
import { History, HISTORY_TYPE } from "types/interview/interview-type";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import { useNavigate } from 'react-router';

const InterviewRoom: React.FC = () => {
    let navigate = useNavigate();
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
    const [recordedChunks, setRecordedChunks] = useState<string[]>([]);

    // media recorder
    const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, video: true });
    
    const startInterviewRecording = () => {
        startRecording();
    }
 
    const stopInterviewRecording = () => {
        stopRecording();
        setIsRecording(false);
    }

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
            listen();
            // 마지막 답변 저장
            const curAnswer: History = {text: value, type: HISTORY_TYPE.ANSWER}
            setLogs([...logs, curAnswer]);

            // 녹화 중지
            // stopInterviewRecording();
            // handleStopCapture();
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

    const finishInterview = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/home/interviewList");
    }

    // const handleStartCapture = React.useCallback(() => {
    //     setCapturing(true);
    //     mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
    //       mimeType: "video/mp4"
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
    
    // const handleStopCapture = React.useCallback(() => {
    //     mediaRecorderRef.current.stop();
    //     setCapturing(false);
    // }, [mediaRecorderRef, webcamRef, setCapturing]);

    // 최초 렌더링 시 녹화 시작
    useEffect(() => {
        // startInterviewRecording();
        // handleStartCapture();
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
            <GlobalStyled.ViewRow style = {{display:'block'}}>
                <GlobalStyled.ViewCol className="webcam-div" style={{ flex: 4, float:'left', width:'48%' }}>
                    <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div className="interview-title">2022 상반기 네이버 공채 모의 면접</div>
                    </BlueBox>
                    <Webcam ref={webcamRef} audio={true} mirrored={true} style={{ flex: 8 }} />
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
                            onClick={stage < questions.length-1 ? moveToNext : finishInterview}
                            style={{
                                backgroundColor: 'white',
                                color: themes.colors.main_blue, 
                                fontWeight: 800}}
                            >
                                {stage == questions.length-1 ? "면접 종료" : "다음으로"}
                        </Button>
                    </BlueBox>
                </GlobalStyled.ViewCol>

                <GlobalStyled.ViewCol className="history-div" style={{flex: 4, height: '90vh'}}>
                    <BlueBox style={{ flex:1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div>대화 기록</div>
                    </BlueBox>

                    <GlobalStyled.ViewCol style={{ flex: 30, backgroundColor: 'white', overflow: 'auto' }}>
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