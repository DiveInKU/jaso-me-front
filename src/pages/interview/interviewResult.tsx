import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import GlobalStyled from 'styles/GlobalStyled';
import ReactPlayer from 'react-player'
import ReplayIcon from 'components/interview/ReplayIcon';
import { History, HISTORY_TYPE, Interview, InterviewMeta } from 'types/interview/interview-type';
import exitIcon from '../../assets/svgs/exitIcon.svg';
import jasoMeLogo from '../../assets/svgs/jasoMeLogo.svg';
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";
import { useLocation } from "react-router-dom";

interface stateType {
    src: string;
    happyPer: string;
    recordeds: string[];
}

const InterviewResult: React.FC = () => {
    const location = useLocation();
    const state = location.state as stateType;
   const recordedBlob = '';

    const [interviewList, setInterviewList] = useState<InterviewMeta[]>();
    const [selectedInterview, setSelectedInterview] = useState<InterviewMeta>({interviewId: -1, title: ""});
    
    // 선택한 인터뷰 상세 정보 (동영상 + 대화기록 + 통계)
    const [curInterview, setCurInterview] = useState<Interview>();

    const [isReplyaing, setIsReplaying] = useState<boolean>(true);
    const [isHistory, setIsHistory] = useState<boolean>(true);

    const getHappyMessage = (happyPer: string) => {
        happyPer = parseFloat(happyPer).toFixed(2)
        const happy = parseFloat(happyPer)
        
        if (happy > 70) {
            return happy + " 이상 미소 지었어요! 좋아요! 👏";
        } else {
            return happy + " 이상 미소 지었군요.. 조금 더 웃어볼까요? 😃";
        }

    }

  useEffect(() => {
      if (state && state.recordeds) {
        const recordedBlob = new Blob(state.recordeds, { type: "video/webm" });
        // recordingPlayer.src = URL.createObjectURL(recordedBlob);
      }
    }, []);

    const onReplay = () => {
        setIsReplaying(true);
    }; 

    const onExit = () => {
        setIsReplaying(false);
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
                    src={recordedBlob}
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
                  }}
                >
                  <img
                    src={state ? state.src : ""}
                    alt=""
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: 10,
                    }}
                  />
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: "bold",
                      marginBottom: 15,
                    }}
                  >
                    {state
                      ? state.happyPer
                        ? getHappyMessage(state.happyPer)
                        : ""
                      : ""}
                  </div>
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