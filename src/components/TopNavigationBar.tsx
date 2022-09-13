import React from 'react';
import styled from 'styled-components';
import themes from 'styles/themes';
import jasoMeLogo from '../assets/svgs/jasoMeLogo.svg';
import LogoutBtn from './LogoutBtn';
import { Button } from '@mui/material';

type MenuStateProps = {
    state: string;
}

const TopNavigationBar: React.FC<MenuStateProps> = ({ state }) => {

    return (
        <NavBg>
            <LogoImage src={jasoMeLogo} />
            <NavText>자기소개서</NavText>
            <NavDecoration />
            <NavText>모의 면접</NavText>
            <NavDecoration />
            <NavText>면접 질문</NavText>
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
    padding: 24px;
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
    margin-top: 5px;
`

const LogoImage = styled.img`
    width: 120px;
    height: 38px;
    margin-right: 50px;
`;


export default TopNavigationBar;