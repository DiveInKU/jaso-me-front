import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import GlobalStyled from 'styles/GlobalStyled';
import ReactPlayer from 'react-player'
import ReplayIcon from 'components/interview/ReplayIcon';
import { History, HISTORY_TYPE, Interview, InterviewMeta } from 'types/interview/interview-type';
import { Button } from "@mui/material";
import LeftBubble from "components/interview/LeftBubble";
import RightBubble from "components/interview/RightBubble";

const InterviewList: React.FC = () => {
    const [interviewList, setInterviewList] = useState<InterviewMeta[]>();
    const [selectedInterview, setSelectedInterview] = useState<InterviewMeta>({interviewId: -1, title: ""});
    
    // 선택한 인터뷰 상세 정보 (동영상 + 대화기록 + 통계)
    const [curInterview, setCurInterview] = useState<Interview>();

    const [isReplyaing, setIsReplaying] = useState<boolean>(false);

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

    const onSelectInterview = (interviewId: number) => {
        setSelectedInterview(interviewList.filter(interviewMeta => interviewMeta.interviewId == interviewId)[0]);
        
        // interview 상세 정보 가져오기 (동영상 + 대화기록 + 통계)

        const tempVideoUrl = '/videos/interviewTest.mp4';

        const histories: History[] = [
            { text: '대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?', type: HISTORY_TYPE.QUESTION },
            { text: '저는 교내 개발 동아리의 회장으로 활동했었습니다. 그 과정에서 부원들과 자바 스터디를 만들어서 멘토의 역할을 수행하기도 하고 동아리 내에서 개발 경진대회를 개최한 경험이 아직까지 기억에 남습니다.', type: HISTORY_TYPE.ANSWER},
            
            { text: '가장 인상깊은 과목이 있다면 한가지를 말해주세요.', type: HISTORY_TYPE.QUESTION },
            { text: '학부 때 운영체제 과목을 들으며 컴퓨터 구조적 지식을 얻을 수 있었던 점이 인상깊습니다.', type: HISTORY_TYPE.ANSWER},
            
            { text: '최근 가장 몰입한 경험이 무엇인가요?', type: HISTORY_TYPE.QUESTION },
            { text: '졸업 프로젝트를 수강하며 팀원들과 1년동안 몰입해서 문제를 해결한 경험이 있습니다.', type: HISTORY_TYPE.ANSWER},

            { text: '목표를 달성하는 방법을 말해주세요.', type: HISTORY_TYPE.QUESTION },
            { text: '목표에 대한 명확한 보상과 동기부여가 될 수 있는 다양한 활동이 존재한다면 끝까지 몰입해서 목표를 달성할 수 있다고 생각합니다.', type: HISTORY_TYPE.ANSWER},

            { text: '협업을 하며 갈등 경험과 해결한 방법을 말해주세요.', type: HISTORY_TYPE.QUESTION },
            { text: '연속으로 팀원이 2명이 나간 팀프로젝트를 진행한 경험이 있습니다. 그런 상황일수록 적극적인 소통이 중요하다고 생각해서 밝은 목소리로 회의 분위기를 주도하려고 노력한 결과 좋은 성적으로 프로젝트를 마무리 할 수 있었습니다.', type: HISTORY_TYPE.ANSWER},
        ]

        const tempInterview: Interview = {    
            videoUrl: tempVideoUrl,
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
                    <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div className="interview-title">2022 상반기 네이버 공채 모의 면접</div>
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

                <GlobalStyled.ViewCol className="history-div" style={{flex: 4}}>
                    <BlueBox style={{ flex:1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div>대화 기록</div>
                    </BlueBox>

                    <GlobalStyled.ViewCol style={{ flex: 30, backgroundColor: 'white', overflow: 'auto' }}>
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

export default InterviewList;