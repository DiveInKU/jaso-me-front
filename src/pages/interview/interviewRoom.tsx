import GlobalStyled from "styles/GlobalStyled";
import React from "react";
import TopNavigationBar from "components/TopNavigationBar";
import themes from "styles/themes";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Button } from "@mui/material";


const InterviewRoom: React.FC = () => {
    const questions: Array<string> = [
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
    ];

    return(
        <GlobalStyled.ViewCol style ={{ backgroundColor: themes.colors.background }}>
            <TopNavigationBar state="모의 면접"/>
            <GlobalStyled.ViewRow>
                <GlobalStyled.ViewCol className="webcam-div" style={{flex: 5}}>
                    <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div className="interview-title">2022 상반기 네이버 공채 모의 면접</div>
                    </BlueBox>
                    <Webcam mirrored={true} style={{ flex: 8 }} />
                    <BlueBox 
                        className="media-box"
                        style={{ flex: 1, justifyContent: 'flex-end', paddingRight: 30, height: 80}}>
                        <Button 
                            className="next-btn"
                            disableElevation
                            variant="contained" 
                            style={{
                                backgroundColor: 'white',
                                color: themes.colors.main_blue, 
                                fontWeight: 800}}>
                                다음으로
                        </Button>
                    </BlueBox>
                </GlobalStyled.ViewCol>

                <GlobalStyled.ViewCol className="history-div" style={{flex: 4}}>
                    <BlueBox style={{ flex:1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div>대화 기록</div>
                    </BlueBox>

                    <GlobalStyled.ViewCol style={{ flex: 30, backgroundColor: 'white', height: 600 }}>
                        
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