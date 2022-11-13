import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import themes from 'styles/themes';

const LogoutBtn: React.FC = () => {
    let navigate = useNavigate();

    const Logout=(e: React.MouseEvent<HTMLButtonElement>) => {
        localStorage.removeItem('jwt');//로그아웃 저장 한거 삭제
        navigate("/");
    }

    return (
        <BtnBg onClick={Logout} style={{cursor:'pointer'}} >로그아웃</BtnBg>
    )
}

const BtnBg = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 42px;
    border-radius: 30px;
    background: none;
    background-color: transparent;
    border: 2px solid ${themes.colors.main_blue};
    font-size: 18px;
    font-weight: 500;
`;

export default LogoutBtn;