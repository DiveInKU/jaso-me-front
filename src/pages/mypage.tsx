import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import { IconButton, Button } from '@mui/material';
import '../App.css';
import UserQuestionSet from 'components/mypage/UserQuestionSet';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import  {getMembersQuestions} from 'apis/myPageService';
import { StringDecoder } from 'string_decoder';

const MyPage: React.FC = () => {

    type MyPagePair = {
        content: string;
    };

    let navigate = useNavigate();
    const [pairs,setPairs] = useState<MyPagePair[]>([{content: ""}]);

    // 최초 렌더링 시 사용자 정의 질문 조회
    useEffect(() => {
        getMembersQuestions()
            .then((res) => {
                setPairs(res.result);
                console.log(pairs);
                // let len = res.result.length;
                // const items=[];
                // for(let i=0; i<len;i++){
                //     items.push(res.result[i].content)
                // }
                // setQusList(items)
                // //console.log(items);
                // console.log(qusList);
            })
    }, []);

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
                            <UserQuestionSet key={pair.content} index={idx} defaultContent={pair.content}></UserQuestionSet>
                        )
                    })}

                    <IconButton onClick={addQuestion}>
                        <AddCircleIcon className="plus-icon" style={{
                            marginLeft:"5px",
                            color: "#4F62AC", width:"40px", height:"40px"}}></AddCircleIcon>
                    </IconButton>
                    
                </div>

                <Button 
                    className="button-login" 
                    variant="contained" 
                    onClick={() => {
                    }}
                style={{
                    marginLeft:"50px",
                    backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                    fontWeight: "500", fontSize:"13px", width:"40px", height:"30px",
            }} >저장</Button>

            </Background>
        </div>

        
    )
}

const Background = styled.div`
    flex: 1;
    background-color: ${themes.colors.background};
`;

export default MyPage;