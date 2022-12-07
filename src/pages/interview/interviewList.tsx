import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import GlobalStyled from 'styles/GlobalStyled';
import ReactPlayer from 'react-player'
import ReplayIcon from 'components/interview/ReplayIcon';
import smileResult from '../../assets/svgs/smileResult.svg';
import gazeResult from '../../assets/svgs/gazeResult.svg';
import { History, HISTORY_TYPE, Interview, InterviewMeta, WordCount, HistorySet, InterviewSet } from 'types/interview/interview-type';
import { useLocation } from "react-router-dom";
import exitIcon from '../../assets/svgs/exitIcon.svg';
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";
import InterviewChart from 'components/InterviewChart/RadarChart';
import WordCountChart from 'components/InterviewChart/WordCountChart';
import ScatterChart from 'components/InterviewChart/ScatterChart'; 
import { getInterviewList, getInterview } from 'apis/interviewService';



const InterviewList: React.FC = () => {

    const [interviewList, setInterviewList] = useState<InterviewMeta[]>();
    const [selectedInterview, setSelectedInterview] = useState<InterviewMeta>({interviewId: -1, title: ""});
    
    // 선택한 인터뷰 상세 정보 (동영상 + 대화기록 + 통계)
    // TODO : Interview type 서버랑 맞추기
    const [curInterview, setCurInterview] = useState<InterviewSet>();

    const [isReplyaing, setIsReplaying] = useState<boolean>(false);
    const [isHistory, setIsHistory] = useState<boolean>(true);
    const [id, setId] = useState<number>(0);

    const [happyMessage, setHappyMessage] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const [emotions, setEmotions] = useState<string[]>(["happy","sad"]);
    const [values, setValues] = useState<number[]>([10,20]);
    const [xData, setXData] = useState<number[]>([0.3,0.5]);
    const [yData, setYData] = useState<number[]>([0.5, 0.6]);
    const [combinedData, setCombinedData] = useState<object>();

    const [videourl,setVideourl] = useState<string>("");
    const [history, setHistory] = useState<HistorySet[]>([{question:"질문 test",answer:"답변 test"}]);
    const [wordcount, setWordcount] = useState<WordCount[]>([{word:"이제",count:5}]);


    useEffect(() => {
        getInterviewList()
            .then((res) => {
                setInterviewList(res.result);
            })
    }, []);

    useEffect(() => {
        console.log('curInterview',curInterview);
    }, [curInterview]);

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

    const onSelectInterview = (interviewId: number) => {
        setSelectedInterview(interviewList.filter(interviewMeta => interviewMeta.interviewId == interviewId)[0]);
        setId(interviewId);
        // interview 상세 정보 가져오기 (동영상 + 대화기록 + 통계)
        getInterview(interviewId)
        .then((res) => {
            console.log("결과 값 확인",res.result);
            const data: InterviewSet = res.result
            const newInterview = { emotionValues:data.emotionValues, emotions:data.emotions, qnas:data.qnas,
            title:data.title, videoUrl:data.videoUrl, wordCounts:data.wordCounts, x:data.x, y:data.y}

            setValues(data.emotionValues);
            setEmotions(data.emotions);
            setHistory(data.qnas);
            setTitle(data.title);
            setVideourl(data.videoUrl);
            setWordcount(data.wordCounts);
            setXData(data.x);
            setYData(data.y);

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
            
            setCurInterview(newInterview);
        });
        
   };

    return(
        <div className="Main">
            <Background>
                <TopNavigationBar state="모의면접"/>
                <GlobalStyled.ViewRow style = {{display:'block'}}>
                    {isReplyaing ?  
                    <GlobalStyled.ViewRow style = {{display:'block'}}>
                    <GlobalStyled.ViewCol className="webcam-div" style={{ flex: 4, float:'left', width:'48%' }}>
                    <BlueBox style={{flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <img onClick={onExit} src={exitIcon} style={{width: 30, height: 30, cursor: 'pointer', marginLeft: 10}} />
                        <div style={{marginLeft: 140 }} className="interview-title">{title}</div>
                    </BlueBox>
                    <ReactPlayer 
                                url={process.env.PUBLIC_URL + curInterview.videoUrl}
                                width='600px'
                                height='400px'
                                playing={false}
                                muted={false}
                                controls={true}
                                loop={true}/>
                </GlobalStyled.ViewCol>

                <GlobalStyled.ViewCol className="history-div" style={{flex: 4, height: '90vh'}}>
                    <BlueBox style={{ paddingTop: 20, paddingBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <GlobalStyled.ViewRow style={{height: 30}}>
                            <WhiteBox 
                            onClick={onClickHistory}
                            style={{ 
                                backgroundColor: isHistory ? themes.colors.white : themes.colors.main_blue,
                                color: isHistory ? themes.colors.black : themes.colors.white
                                }}>
                                대화 기록</WhiteBox>
                            <WhiteBox 
                            onClick={onClickStatistics}
                            style={{ 
                                backgroundColor: !isHistory ? themes.colors.white : themes.colors.main_blue,
                                color: !isHistory ? themes.colors.black : themes.colors.white
                            }}
                            >통계</WhiteBox>
                        </GlobalStyled.ViewRow>
                    </BlueBox>

                    <GlobalStyled.ViewCol style={{ flex: 30, backgroundColor: 'white', overflow: 'auto' }}>
                        {
                            isHistory ? curInterview.qnas.map((log, idx) => {
                                return (
                                    <>
                                    <LeftBubble text={log.question} /> 
                                    <RightBubble text={log.answer} />
                                    </>
                                )
                            })
                            :
                            <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
                  

                  <ScatterChart combinedData={combinedData}></ScatterChart>
                 
                  <WordCountChart wordCounts={wordcount}></WordCountChart>
                </GlobalStyled.ViewCol>
                            </div>
                        }
                    </GlobalStyled.ViewCol>

                </GlobalStyled.ViewCol>
                </GlobalStyled.ViewRow>
                    : 
                    <GlobalStyled.ViewRow style={{ flex: 1}}>
                        <GlobalStyled.ViewCol style={{ flex: 3, marginLeft: 20 }}>
                        <div style={{fontSize: 22, marginBottom: 10}}>모의면접 목록</div>
                        {interviewList ? interviewList.map((interview, idx) => {
                            return (
                                <div key={idx}
                                    onClick={() => onSelectInterview(interview.interviewId)}
                                    style={{ 
                                        color: interview.interviewId == selectedInterview.interviewId ? themes.colors.main_blue : "black",
                                        fontWeight: interview.interviewId == selectedInterview.interviewId ? "bold" : "normal",
                                        marginLeft: 10,
                                        marginTop: 20,
                                        fontSize: 18,
                                        cursor: 'pointer'
                                    }}
                                >
                                    • {interview.title}
                                </div>
                            )
                        }) : null}
                    </GlobalStyled.ViewCol>

                    <GlobalStyled.ViewCol style={{flex: 7, marginLeft: 20 }}>
                        {curInterview ? 
                        <div style={{ position: 'relative'}} >
                            <ReactPlayer 
                                url={process.env.PUBLIC_URL + curInterview.videoUrl}
                                width='600px'
                                height='400px'
                                playing={false}
                                muted={false}
                                controls={true}
                                loop={true}/>
                            <div onClick={onReplay} style={{ position: 'absolute', top: '30%', left: '20%'}}><ReplayIcon/></div>
                        </div> : null}
                    </GlobalStyled.ViewCol></GlobalStyled.ViewRow>}
                </GlobalStyled.ViewRow>    
            </Background>
        </div>
          
    )
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

export default InterviewList;