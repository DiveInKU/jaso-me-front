import React, { useEffect, useState } from 'react';
import GlobalStyled from 'styles/GlobalStyled';
import { useNavigate } from 'react-router';
import themes from 'styles/themes';
import Webcam from "react-webcam";
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useLocation } from "react-router-dom";
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import SocketVideo from 'components/socket-video';
import { InterviewTitle } from 'types/interview/interview-type';

const WebcamTest: React.FC = () => {

    let navigate = useNavigate();
    const location = useLocation();
    const temp: InterviewTitle = location.state;
    const [title, setTitle] = useState<InterviewTitle>({title: ""});
    const [value, setValue] = useState<string>(""); // 마이크 테스트를 위한 text value

    const infoMessage: Array<string> = 
        ["모의 면접 시작 전 웹캠과 마이크 인식이 잘 작동하는지 확인하세요.",
        "준비가 되었으면 면접 시작 버튼을 눌러주세요."];

    const goToInterviewRoom = () => {
        stop();
        navigate("/home/interview/webcamtest/interviewroom");
    }

    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: string) => {
          setValue(result);
        },
    });

    useEffect(() => {
        setTitle(location.state);
        console.log(title.title);
    }, []);

    return(
        <GlobalStyled.ViewCol 
            style={{ 
                backgroundColor: themes.colors.background,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Header>
                웹캠 및 마이크 테스트
            </Header>
            <GlobalStyled.ViewCol style={{ width: 500, height: 400}}>
                {/* <Webcam mirrored={true}/> */}
                <SocketVideo finishConnector={() => {}} webSocketUrl = {'ws://localhost:8000/test-cam'} showing = {false} ></SocketVideo>
            </GlobalStyled.ViewCol>

            <Button
                variant="outlined"
                onClick={listening ? stop : listen}
                style={{
                    marginTop: 20,
                    backgroundColor: themes.colors.white,
                    borderWidth: 1.5,
             }}>
                {listening ? "마이크 테스트 정지" : "마이크 테스트 시작"}
            </Button>

            <GlobalStyled.ViewCol style={{ height: 200, backgroundColor: themes.colors.gray_100, marginTop: 20, marginBottom: 20 }}>
                {value}
            </GlobalStyled.ViewCol>
            
            {infoMessage.map((text) => {
                return (
                    <InfoText>{text}</InfoText>
                )
            })}

            <Button 
                variant="outlined"
                onClick={goToInterviewRoom}
                style={{
                    marginTop: 20,
                    backgroundColor: themes.colors.white,
                    borderWidth: 1.5,
                }}>
                    면접 시작
            </Button>

        </GlobalStyled.ViewCol>
    )
}

const Header = styled(GlobalStyled.ViewCol)`
    background-color: ${themes.colors.main_blue};
    color: ${themes.colors.white};
    font-weight: 600;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 60px;
    align-items: center;
    width: 100%;
    height: 'auto';
`;

const InfoText = styled.text`
    color: ${themes.colors.gray_900};
    margin-top: 20px;
    font-weight: 500;
`;

export default WebcamTest;