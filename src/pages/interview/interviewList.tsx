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
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";

const InterviewList: React.FC = () => {
    const [interviewList, setInterviewList] = useState<InterviewMeta[]>();
    const [selectedInterview, setSelectedInterview] = useState<InterviewMeta>({interviewId: -1, title: ""});
    
    // 선택한 인터뷰 상세 정보 (동영상 + 대화기록 + 통계)
    const [curInterview, setCurInterview] = useState<Interview>();

    const [isReplyaing, setIsReplaying] = useState<boolean>(false);
    const [isHistory, setIsHistory] = useState<boolean>(true);

    useEffect(() => {
        const tempList: InterviewMeta[] 
            = [{interviewId: 0, title: "2022 네이버 하반기 공채 모의면접"}, 
            {interviewId: 1, title: "2022 신한은행 ICT 수시채용 모의면접"},
            {interviewId: 2, title: "2022 건국대학교 석/박사 대학원 모의면접"},
            {interviewId: 3, title: "2022 동아제약 모의면접"}];

        setInterviewList(tempList);
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

    const onSelectInterview = (interviewId: number) => {
        setSelectedInterview(interviewList.filter(interviewMeta => interviewMeta.interviewId == interviewId)[0]);
        
        // interview 상세 정보 가져오기 (동영상 + 대화기록 + 통계)

        const videoUrl = '/videos/interviewTest.mp4';

        const histories: History[] = [
            { text: '대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?', type: HISTORY_TYPE.QUESTION },
            { text: '저는 교내 개발 동아리의 회장으로 활동했었습니다. 그 과정에서 부원들과 자바 스터디를 만들어서 멘토의 역할을 수행하기도 하고 동아리 내에서 개발 경진대회를 개최한 경험이 아직까지 기억에 남습니다. 경진대회에서 저마다의 열정이 담긴 프로젝트 결과물을 보면서 함께하는 개발의 즐거움을 느낄 수 있었습니다.', type: HISTORY_TYPE.ANSWER},
            
            { text: '가장 인상깊은 과목이 있다면 한가지를 말해주세요.', type: HISTORY_TYPE.QUESTION },
            { text: '학부 때 소프트웨어 아키텍처 과목을 들으며 설계 지식을 얻을 수 있었던 점이 인상깊습니다. 평소엔 짧은 시간 동안 결과물을 내기 위해 설계를 고려하지 않고 기능 개발에 착수하였는데 그렇게 된다면 개발의 규모가 커질수록 코드 의 수정이나 재활용이 어려워지는 문제가 생겼습니다. 이러한 문제를 겪은 후에는 다양한 아키텍처나 디자인 패턴을 적용해는 것이 클린 아키텍처의 첫 걸음이라 생각하며 노력하고있습니다.', type: HISTORY_TYPE.ANSWER},
            
            { text: '최근 가장 몰입한 경험이 무엇인가요?', type: HISTORY_TYPE.QUESTION },
            { text: '졸업 프로젝트를 수강하며 팀원들과 1년동안 몰입해서 문제를 해결한 경험이 있습니다. 제가 졸업 프로젝트를 하며 느낀 점은 개발자는 끊임없이 공부해서 다양한 기술을 적용할 수 있어야 한다는 점이었습니다. 프론트엔드 개발을 맡았지만 아직 잘 모르는 ai 기술을 공부하고 실제로 구현해내는 경험을 통해서 어떤 문제에도 맞서서 해결해보려는 끈기를 기를 수 있었습니다.', type: HISTORY_TYPE.ANSWER},

            { text: '목표를 달성하는 방법을 말해주세요.', type: HISTORY_TYPE.QUESTION },
            { text: '목표에 대한 명확한 보상과 동기부여가 될 수 있는 다양한 활동이 존재한다면 끝까지 몰입해서 목표를 달성할 수 있다고 생각합니다. 예를들어 앱 런칭이라는 목표를 끝까지 해낼 수 있었던 이유는 실제 유저들이 우리 서비스를 사용해보고 남기는 다양한 데이터들을 분석해서 더 좋은 서비스를 만들 수 있는 여러가지 시도들을 해볼 수 있다는 점이 매우 기대되었고 그것이 목표를 끝까지 해낼 수 있게 한 명확한 동기부여가 되었다고 생각합니다.', type: HISTORY_TYPE.ANSWER},

            { text: '협업을 하며 갈등 경험과 해결한 방법을 말해주세요.', type: HISTORY_TYPE.QUESTION },
            { text: '연속으로 팀원이 2명이 나간 팀프로젝트를 진행한 경험이 있습니다. 그때 제가 들었던 생각은 아무도 우리 팀의 인원수가 적다는 것을 모르게 하겠다 라는 생각이 들었습니다. 협업을 하며 힘들고 지치는 상황에서도 적극적인 소통이 중요하다고 생각해서 밝은 목소리로 회의 분위기를 주도하려고 노력한 결과 좋은 성적으로 프로젝트를 마무리 할 수 있었습니다.', type: HISTORY_TYPE.ANSWER},
        ]

        const tempInterview: Interview = {    
            videoUrl: videoUrl,
            histories: histories,
            gazeUrl: '',
            smileUrl: ''};
        
        setCurInterview(tempInterview);
   };

    return(
        <div className="Main">
            <Background>
                <TopNavigationBar state="모의면접"/>
                <GlobalStyled.ViewRow style={{marginTop: '20px'}}>
                    {isReplyaing ?  
                    <GlobalStyled.ViewRow style={{ flex: 1}}>
                    <GlobalStyled.ViewCol className="webcam-div" style={{flex: 4}}>
                    <BlueBox style={{paddingTop: 20, paddingBottom: 20, justifyContent: 'flex-start', alignItems: 'center'}}>
                        <img onClick={onExit} src={exitIcon} style={{width: 30, height: 30, cursor: 'pointer', marginLeft: 10}} />
                        <div style={{marginLeft: 140 }} className="interview-title">2022 상반기 네이버 공채 모의 면접</div>
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

                <GlobalStyled.ViewCol className="history-div" style={{flex: 6}}>
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
                            isHistory ? curInterview.histories.map((log, idx) => {
                                return (
                                    log.type == HISTORY_TYPE.QUESTION ?
                                    <LeftBubble text={log.text} /> :
                                    <RightBubble text={log.text} />
                                )
                            }) : null
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
    height: '200px';
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