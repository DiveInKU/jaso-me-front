import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import GlobalStyled from 'styles/GlobalStyled';
import ReactPlayer from 'react-player'
import ReplayIcon from 'components/interview/ReplayIcon';
import { History, HISTORY_TYPE, Interview, InterviewMeta, WordCount } from 'types/interview/interview-type';
import exitIcon from '../../assets/svgs/exitIcon.svg';
import jasoMeLogo from '../../assets/svgs/jasoMeLogo.svg';
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";
import { useLocation } from "react-router-dom";
import { getEmotionAnalysisResult } from "apis/interviewService";
import { getCustomAPI } from "../../apis/api";
import InterviewChart from 'components/InterviewChart';
import WordCountChart from 'components/InterviewChart/WordCountChart';

interface stateType {
    // src: string;
    // happyPer: string;
    recordeds: string[];
    wordCounts: WordCount[];
}

interface result {
  url: string;
  happyPer: string;
}


const InterviewResult: React.FC = () => {
    const location = useLocation();
    const state = location.state as stateType;
    const [interviewSrc, setInterviewSrc] = useState<string>('');

    const [resultSrc, setResultSrc] = useState('');
    const [happyPer, setHappyPer] = useState('');
    const [happyMessage, setHappyMessage] = useState<string>('');

    const [emotions, setEmotions] = useState<string[]>();
    const [values, setValues] = useState<number[]>();

    const [interviewList, setInterviewList] = useState<InterviewMeta[]>();
    const [selectedInterview, setSelectedInterview] = useState<InterviewMeta>({interviewId: -1, title: ""});
    
    // 선택한 인터뷰 상세 정보 (동영상 + 대화기록 + 통계)
    const [curInterview, setCurInterview] = useState<Interview>();

    const [isReplyaing, setIsReplaying] = useState<boolean>(true);
    const [isHistory, setIsHistory] = useState<boolean>(true);

    const getHappyMessage = () => {
        var emotion_all = 0
        var happy = 0
        for (var i = 0; i < emotions.length; i++) {
          emotion_all += values[i]
          if(emotions[i]=="happy")
            happy = values[i]
        }
        happy = (happy / emotion_all) * 100
        happy = Math.round(happy)
        
        if (happy > 60) {
            return happy + "% 미소 지었어요! \n 절반 이상 웃었군요. 좋아요! 👏";
        } else {
            return happy + "% 미소 지었군요.. 조금 더 웃어볼까요? 😃";
        }
    }
  

    const retrieveHappyResult = async () => {
      await getCustomAPI('http://localhost', '8000').get(`/stop-interview`)
          .then((res) => { 
              console.log('getHappyResult', res.data)
              setEmotions(res.data.emotions)
              setValues(res.data.values)
              return res.data
          })
          .catch((e) => console.log(e));
    };

    // 

  useEffect(() => {
    retrieveHappyResult();

    if (state && state.recordeds) {
        const recordedBlob = new Blob(state.recordeds, { type: "video/webm" });
        setInterviewSrc(URL.createObjectURL(recordedBlob));
      }
    }, []);

  useEffect(() => {
    if(emotions && values){
      setHappyMessage(getHappyMessage())
    }
  }, [emotions, values]);

    const onReplay = () => {
        setIsReplaying(true);
    }; 

    const onExit = () => {
        setIsReplaying(false);
        // Revoke Blob URL after DOM updates..
        if(resultSrc)
          window.URL.revokeObjectURL(resultSrc);
    }

    const onClickHistory = () => {
        if (!isHistory)
            setIsHistory(true);
    }

    const onClickStatistics = () => {
        if (isHistory)
            setIsHistory(false);
    }

    return (
      <div className="Main">
        <Background>
          <TopNavigationBar state="모의면접" />
          <GlobalStyled.ViewRow style={{ display: "block" }}>
            <GlobalStyled.ViewRow style={{ display: "block" }}>
              <GlobalStyled.ViewCol
                className="webcam-div"
                style={{ flex: 4, float: "left", width: "60%" }}
              >
                <BlueBox
                  style={{
                    flex: 1,
                    paddingTop: 20,
                    paddingBottom: 20,
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    onClick={onExit}
                    src={exitIcon}
                    alt="logo"
                    style={{
                      width: 30,
                      height: 30,
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                  />
                  <div style={{ marginLeft: 140 }} className="interview-title">
                    2022 상반기 네이버 공채 모의 면접
                  </div>
                </BlueBox>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <video
                    src={interviewSrc}
                    controls
                    autoPlay
                    loop
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </GlobalStyled.ViewCol>
              <GlobalStyled.ViewCol
                className="history-div"
                style={{ flex: 4, height: "90vh" }}
              >
                <BlueBox
                  style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <GlobalStyled.ViewRow style={{ height: 30 }}>
                    <WhiteBox
                      // onClick={onClickHistory}
                      style={{
                        backgroundColor: themes.colors.main_blue,
                        color: themes.colors.white,
                      }}
                    >
                      대화 기록
                    </WhiteBox>
                    <WhiteBox
                      // onClick={onClickStatistics}
                      style={{
                        backgroundColor: themes.colors.white,
                        color: themes.colors.black
                      }}
                    >
                      통계
                    </WhiteBox>
                  </GlobalStyled.ViewRow>
                </BlueBox>

                <GlobalStyled.ViewCol
                  style={{
                    flex: 30,
                    backgroundColor: "white",
                    overflow: "auto",
                    width:'100%',
                  }}
                >
                  <InterviewChart emotions={emotions} values={values}></InterviewChart>

                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginBottom: 15,
                      padding: '20px',
                      paddingTop: '50px',
                      textAlign: 'center',
                    }}
                  >
                    {happyMessage}
                  </div>
                  <WordCountChart wordCounts={state.wordCounts}></WordCountChart>
                </GlobalStyled.ViewCol>
              </GlobalStyled.ViewCol>
            </GlobalStyled.ViewRow>
          </GlobalStyled.ViewRow>
        </Background>
      </div>
    );
}

const Background = styled.div`
    flex: 1;
    background-color: ${themes.colors.background};
`;

const BlueBox = styled(GlobalStyled.ViewRow)`
    background-color: ${themes.colors.main_blue};
    color: ${themes.colors.white};
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 'auto';
    height: '10%';
`;

const WhiteBox = styled(GlobalStyled.ViewRow)`
    background-color: ${themes.colors.white};
    color: ${themes.colors.black};
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
    justify-content: center;
    align-items: center;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    width: 50%;
    height: 100%;
    cursor: pointer
`;

export default InterviewResult;