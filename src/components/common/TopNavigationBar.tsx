import React, { useState } from 'react';
import styled from 'styled-components';
import themes from 'styles/themes';
import jasoMeLogo from '../../assets/svgs/jasoMeLogo.svg';
import LogoutBtn from './LogoutBtn';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';

type MenuStateProps = {
    state: string;
}

const TopNavigationBar: React.FC<MenuStateProps> = ({ state }) => {
    let navigate = useNavigate();

    const [isCoverLetter, setIsCoverLetter] = useState(false);
    const [isInterview, setIsInterview] = useState(false);

    return (
        <NavBg>
            <LogoImage src={jasoMeLogo} onClick={() => {navigate("/home")}} style={{cursor:'pointer'}} />
            {!isCoverLetter && (<Button  onMouseEnter={() => setIsCoverLetter(true)} onMouseLeave={() => setIsCoverLetter(false)}
            style={{border: "none", backgroundColor: "transparent",fontSize: 20,fontWeight: 500, marginTop:5,color:"black"}}>자기소개서</Button>)}
            {isCoverLetter && (<div onMouseLeave={() => setIsCoverLetter(false)} style={{marginTop:10}}><Button onClick={() => {navigate("/home/coverLetter")}} style={{marginRight:15}}>● 자기소개서 작성</Button>
                        <Button onClick={() => {navigate("/home/coverLetterList"); window.location.reload();}}>● 자기소개서 목록</Button></div>)}
            <NavDecoration />
            {!isInterview && (<Button  onMouseEnter={() => setIsInterview(true)} onMouseLeave={() => setIsInterview(false)}
            style={{border: "none", backgroundColor: "transparent",fontSize: 20,fontWeight: 500, marginTop:5,color:"black"}}>모의면접</Button>)}
            {isInterview && (<div onMouseLeave={() => setIsInterview(false)} style={{marginTop:10}}><Button onClick={() => {navigate("/home/interview")}} style={{marginRight:15}}>● 모의면접 녹화</Button>
                        <Button onClick={() => {navigate("/home/interviewList")}}>● 모의면접 목록</Button></div>)}
            <NavDecoration />
            <Button onClick={() => { navigate("/home/mypage")}} style={{border: "none", backgroundColor: "transparent",fontSize: 20,fontWeight: 500, marginTop:5,color:"black"}}>면접질문</Button>
            <div style={{ flex: 1 }}/>
            <LogoutBtn />
            
        </NavBg>
    )
}

const NavBg = styled.div`
    width: auto;
    height: 20%;
    display: flex;
    flex-direction: row;
    padding: 15px;
`;

const NavText = styled.button`
    border: none;
    background-color: transparent;
    font-size: 20px;
    font-weight: 500;
    margin-top: 5px;
`;

const NavDecoration = styled.div`
    width: 1px;
    height: 30px;
    background-color: ${themes.colors.main_blue};
    margin-left: 22px;
    margin-right: 22px;
    margin-top: 10px;
`

const LogoImage = styled.img`
    width: 120px;
    height: 38px;
    margin-right: 50px;
    margin-left: 10px;
    margin-top: 5px;
`;


export default TopNavigationBar;