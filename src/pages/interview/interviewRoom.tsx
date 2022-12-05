import GlobalStyled from "styles/GlobalStyled";
import React, { useEffect, useState, useRef } from "react";
import TopNavigationBar from "components/common/TopNavigationBar";
import themes from "styles/themes";
import styled from "styled-components";
import iconMike from "../../assets/svgs/iconMike.svg";
import iconNoMike from "../../assets/svgs/iconNoMike.svg";
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";
import { History, HISTORY_TYPE, WordCount } from "types/interview/interview-type";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { useNavigate, useLocation } from 'react-router-dom';
import { showEmotionPrediction } from "apis/interviewService";
import SocketVideo from "components/socket-video"
import { getEmotionAnalysisResult, calcFrequency } from "apis/interviewService";
import { InterviewInfo, HistorySet } from "types/interview/interview-type";
import { QuestionSet } from "types/mypage/mypage-type";
import { writeFile, writeFileSync } from "fs";


const InterviewRoom: React.FC = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const state = location.state as InterviewInfo;
  const [title, setTitle] = useState<string>(state.title);
  const [question,setQuestion] = useState<QuestionSet[]>(state.question);
  const [questions,setQuestions] = useState<string[]>([]);

  const [histories, setHistories] = useState<HistorySet[]>([]);
  
  const answers: Array<string> = [
    "제가 생각하기에 흥미라는 것은 음 꾸준히 하는 것을 목표로 하는게 음 맞지 않을까",
    "음 인상깊은 과목을 생각했을 때 이제 맞습니다.",
    "가장 몰입한 경험이라고 생각해보면 이제 할 수 있을것 같습니다.",
    "목표를 달성하는 방법을 생각해봤을 이제 때 음 협업이란 입니다.",
    "갈등 경험과 해결한 방법을 말해달라면 이제 입니다."
  ]

  const [stage, setStage] = useState<number>(-1); // 현재 질문 단계
  const [logs, setLogs] = useState<History[]>([
    { text: question[0].content, type: HISTORY_TYPE.QUESTION },

  ]); // 질문 + 답변 기록 배열
  const [value, setValue] = useState<string>("");
  const [showingEmotion, setShowingEmotion] = useState<boolean>(false);

  const recordedChunks: string[] = [];
  const [socketImg, setSocketImg] = useState<Blob>();
  let videoBlob: Blob = null;
  let recordedVideoURL: string = null;

  let videoData: Blob[] = [];
  let videoFile: File = null;

  const startInterviewRecording = () => {
    
  };

  useEffect(() => {
    videoData.push(socketImg);
    console.log(socketImg)
  }, [socketImg]);

  const stopInterviewRecording = () => {
    makeVideoFile();
  };
  
  const makeVideoFile = () => {
    videoBlob = new Blob(videoData, { type: "video/webm" });
    recordedVideoURL = window.URL.createObjectURL(videoBlob);
    let filename = title.replaceAll(' ', '_') + ".avi";
    videoFile = new File([recordedVideoURL], filename);
  }

  // 음성 인식
  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      setValue(result);
    },
  });

  const changeShowingEmotion = (e: React.MouseEvent<HTMLButtonElement>) => {
    // api 요청 보내야함
    setShowingEmotion(!showingEmotion);
  };

  const moveToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
      // 다음 질문 출력
      setStage(stage + 1);
      
      const curAnswer: History = { text: value, type: HISTORY_TYPE.ANSWER };

      const nextQuestion: History = {
        text: question[stage + 1].content,
        type: HISTORY_TYPE.QUESTION,
      };

      setLogs([...logs, curAnswer, nextQuestion]);
      stop();
  };

  // 최초 렌더링 시작
  useEffect(() => {
    question.map((text, idx) => {
      questions.push(text.content);
      let history = { question: text.content, answer: ""}
      histories.push(history);
    });
  }, []);

  useEffect(() => {
    showEmotionPrediction(showingEmotion ? "true" : "false");
  }, [showingEmotion]);

  // tts : stage가 변할 때 마다 질문 읽어준다.
  useEffect(() => {
    
    if (stage < 0) setStage(0);
    speak({ text: questions[stage] });
  }, [stage]);

  const handleSpeaking = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!listening) listen();
    alert(stage);
  };

  // SocketVideo 컴포넌트에서 함수를 받아오기 위함
  let finishInterview = () => { }
  const finishConnector = (endSocket: () => void) => {
    finishInterview = endSocket;
  };

  // 실제 면접 종료시 호출되는 함수
  const onFinish = () => {

    // // 마지막 답변 저장
    const curAnswer: History = { text: value, type: HISTORY_TYPE.ANSWER };
    logs.push(curAnswer);
    // setLogs([...logs, curAnswer]);
    stop();
    console.log(logs);

    finishInterview();
    stopInterviewRecording();
    calcInterviewFrequency();
  };

  const calcInterviewFrequency = () => {
    let text = "";
    logs.map((log, idx) => {
      if (log.type == HISTORY_TYPE.ANSWER)
        text += (log.text + " ");
    })

    let tempMap: Map<string, number> = new Map<string, number>();

    calcFrequency(text)
      .then((res) => {

        res.return_object.sentence.map((sen: any, idx: number) => {
          let words = sen.word;
          words.map((word: any, widx: number) => {
            let w = word.text;
            
            if (tempMap.get(w) == null) {
              tempMap.set(w, 1);
            }
            else {
              tempMap.set(w, tempMap.get(w) + 1);
            }
          })
        })
        
        let tempWordCounts: WordCount[] = []
        tempMap.forEach((count, word) => {
          tempWordCounts.push({word: word, count: count});
        })

        tempWordCounts.sort((a, b) => b.count - a.count);
        navigate("/home/interviewResult", { state: { recordeds: videoData, wordCounts: tempWordCounts.slice(0,5), videoFile: videoFile, videoUrl: recordedVideoURL } });
      })
  }

  return (
    <GlobalStyled.ViewCol style={{ backgroundColor: themes.colors.background }}>
      <TopNavigationBar state="모의 면접" />
      <GlobalStyled.ViewRow style={{ display: 'block' }}>
        <GlobalStyled.ViewCol className="webcam-div" style={{ flex: 4, float: 'left', width: '48%' }}>
          <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center' }}>
            <div className="interview-title">{title}</div>
          </BlueBox>
          <SocketVideo finishConnector={finishConnector} webSocketUrl={'ws://localhost:8000/emotion-cam'} showing={showingEmotion} recordedChunks={recordedChunks} onSetSocketImg={setSocketImg}></SocketVideo>

          <BlueBox
            className="media-box"
            style={{ display: 'block', flex: 1, paddingLeft: 30, paddingRight: 30, height: 80 }}>

            <Button
              className="emotion-show-btn"
              disableElevation
              variant="contained"
              onClick={changeShowingEmotion}
              style={{
                backgroundColor: "transparent",
                padding: 0,
                fontSize: "1.8rem",
              }}
            >
              {showingEmotion ? "🙄" : "😃"}
            </Button>

            <Button
              className="next-btn"
              disableElevation
              variant="contained"
              onClick={stage < question.length - 1 ? moveToNext : onFinish}
              style={{
                float: 'right',
                backgroundColor: 'white',
                color: themes.colors.main_blue,
                fontWeight: 800,
                marginTop: 5 
              }}
            >
              {stage === question.length - 1 ? "면접 종료" : "다음으로"}
            </Button>

            <div onClick={handleSpeaking} style={{ cursor: "pointer", float: 'right', marginRight: 20, marginTop: 5 }}>
              <img src={listening ? iconMike : iconNoMike} />
            </div>

            {listening && <div style={{ float: 'right', alignSelf: 'center', marginTop: 10, marginRight: 10 }}>답변중...</div>}
          </BlueBox>
        </GlobalStyled.ViewCol>

        <GlobalStyled.ViewCol className="history-div" style={{ flex: 4, height: '90vh' }}>
          <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center' }}>
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
    </GlobalStyled.ViewCol >
  );
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