import React, { useEffect, useState } from 'react';
import GlobalStyled from 'styles/GlobalStyled';
import { useNavigate } from 'react-router';
import themes from 'styles/themes';
import Webcam from "react-webcam";
import styled from 'styled-components';
import { Button } from '@mui/material';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

const WebcamTest: React.FC = () => {

    let navigate = useNavigate();
    const [value, setValue] = useState<string>("");

    const infoMessage: Array<string> = 
        ["모의 면접 시작 전 웹캠과 마이크 인식이 잘 작동하는지 확인하세요.",
        "준비가 되었으면 면접 시작 버튼을 눌러주세요."];

    const goToInterviewRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/home/interview/webcamtest/interviewroom");
    }


    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: string) => {
          setValue(result);
        },
    });

    useEffect(() => {
        // 말하는 도중이 아닌 말이 끝난 뒤(말 사이 텀이 생기면) 출력
        listen({ interimResults: false });
    }, [value]);

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
                <Webcam mirrored={true}/>
            </GlobalStyled.ViewCol>

            <div style={{ width: '100%', height: 200}}>
                {value}
            </div>
            
            {infoMessage.map((text, tidx) => {
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