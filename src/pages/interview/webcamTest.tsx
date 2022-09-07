import React, { useState } from 'react';
import GlobalStyled from 'styles/GlobalStyled';
import { useNavigate } from 'react-router';
import themes from 'styles/themes';
import Webcam from "react-webcam";
import styled from 'styled-components';
import { Button } from '@mui/material';

const WebcamTest: React.FC = () => {

    let navigate = useNavigate();

    const infoMessage: Array<string> = 
        ["모의 면접 시작 전 웹캠이 잘 나오는지 확인하세요.",
        "준비가 되었으면 면접 시작 버튼을 눌러주세요."];

    const goToInterviewRoom = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/home/interview/webcamtest/interviewroom");
    }

    return(
        <GlobalStyled.ViewCol 
            style={{ 
                backgroundColor: themes.colors.background,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Header>
                웹캠 테스트
            </Header>
            <GlobalStyled.ViewCol style={{ width: 500, height: 400}}>
                <Webcam mirrored={true}/>
            </GlobalStyled.ViewCol>
            
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