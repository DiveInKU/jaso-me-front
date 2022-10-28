import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import { IconButton } from '@mui/material';
import '../App.css'; 
import UserQuestionSet from 'components/mypage/UserQuestionSet';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const MyPage: React.FC = () => {
    type MyPagePair = {
        content: string;
    };

    let navigate = useNavigate();
    const [pairs,setPairs] = useState<MyPagePair[]>([{content: ""}]);

    const addQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newQuestion = { content: "" };
        setPairs([...pairs, newQuestion])
    }
    return(
        <div className="Main">
            <Background>
                <TopNavigationBar state="마이페이지"/>
                <div style={{position:"relative", marginBottom:"30px", marginLeft:"50px", marginTop:"25px"}}>
                    <div className='question-text'>{"사용자 정의 질문"}</div>
                    {pairs.map((pair, idx) => {
                    return (
                        <UserQuestionSet key={idx}></UserQuestionSet>
                    )
                    })}

                    <IconButton onClick={addQuestion}>
                        <AddCircleIcon className="plus-icon" style={{
                            marginLeft:"5px",
                            color: "#4F62AC", width:"40px", height:"40px"}}></AddCircleIcon>
                    </IconButton>
                    
                </div>
            </Background>
        </div>

        
    )
}

const Background = styled.div`
    flex: 1;
    background-color: ${themes.colors.background};
`;

export default MyPage;