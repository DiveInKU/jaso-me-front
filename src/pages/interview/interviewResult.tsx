import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import GlobalStyled from 'styles/GlobalStyled';
import { HistorySet, Interview, MockInterview, WordCount } from 'types/interview/interview-type';
import exitIcon from '../../assets/svgs/exitIcon.svg';
import jasoMeLogo from '../../assets/svgs/jasoMeLogo.svg';
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";
import { useLocation } from "react-router-dom";
import { getEmotionAnalysisResult, createInterview } from "apis/interviewService";
import InterviewChart from 'components/InterviewChart/RadarChart';
import WordCountChart from 'components/InterviewChart/WordCountChart';
import ScatterChart from 'components/InterviewChart/ScatterChart'; 

interface stateType {
    title: String;
    histories: HistorySet[];
    wordCounts: WordCount[];
    videoSrc: string;
    videoUrl: string;
}

interface result {
  url: string;
  happyPer: string;
}

const InterviewResult: React.FC = () => {
    const location = useLocation();
    const state = location.state as stateType;

    const [resultSrc, setResultSrc] = useState('');
    const [happyPer, setHappyPer] = useState('');
    const [happyMessage, setHappyMessage] = useState<string>('');

    const [emotions, setEmotions] = useState<string[]>();
    const [values, setValues] = useState<number[]>();
    const [xData, setXData] = useState<number[]>();
    const [yData, setYData] = useState<number[]>();
    const [combinedData, setCombinedData] = useState<object>();

    // 선택한 인터뷰 상세 정보 (동영상 + 대화기록 + 통계)
    const [curInterview, setCurInterview] = useState<Interview>();

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
  
  useEffect(() => {
    getEmotionAnalysisResult()
    .then((data)=>{
      setEmotions(data.emotions)
      setValues(data.values)
      setXData(data.x_data);
      setYData(data.y_data);

      console.log(values);
      // onSave(data.emotions, data.values, data.x_data, data.y_data)
    });

  }, []);

  useEffect(() => {
    if(emotions && values){
      setHappyMessage(getHappyMessage())
    }
  }, [emotions, values]);

  useEffect(()=>{
    if(xData && yData){
      setCombinedData(
        xData.map((x, i)=>{
          return {
            x: Math.min(0.75 ,Math.max(0.2, x)),
            y: Math.min(0.80 ,Math.max(0.2, yData[i])),
          }
        })
      );
    }
  }, [xData, yData]);

    const onExit = () => {
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

    const onSave = (emotions: string[], values: number[], xData: number[], yData: number[]) => {
      
      const body = {
        "title": state.title,
        "qnas": state.histories,
        "emotions": emotions,
        "values": values,
        "wordCounts": state.wordCounts,
        "x": xData,
        "y": yData,
        "videoUrl": state.videoUrl 
      }

      console.log(body);

      createInterview(body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
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
                    {state.title}
                  </div>
                  {/* <Button onClick={onSave}>저장</Button> */}
                </BlueBox>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <video
                    src={state.videoSrc}
                    controls
                    autoPlay
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Sorry, your browser doesn't support embedded videos.
                  </video>
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
                      onClick={onClickHistory}
                      style={{ 
                        backgroundColor: isHistory ? themes.colors.white : themes.colors.main_blue,
                        color: isHistory ? themes.colors.black : themes.colors.white
                      }}
                    >
                      대화 기록
                    </WhiteBox>
                    <WhiteBox
                      onClick={onClickStatistics}
                      style={{ 
                        backgroundColor: !isHistory ? themes.colors.white : themes.colors.main_blue,
                        color: !isHistory ? themes.colors.black : themes.colors.white
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
                  {
                    isHistory ? state.histories.map((history, idx)=> {
                      return (
                        <>
                          <LeftBubble text={history.question} /> 
                          <RightBubble text={history.answer} />
                        </>
                      )
                    })
                    :
                    <>
                      <InterviewChart emotions={emotions} values={values}></InterviewChart>
                      <ScatterChart combinedData={combinedData}></ScatterChart>
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
                    </>
                }
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