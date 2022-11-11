import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import { TextField } from "@material-ui/core";
import { Button,IconButton } from '@mui/material';
import styled from 'styled-components';
import themes from 'styles/themes';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import QuestionSet from 'components/coverletter/QuestionSet';
import { QnAPair } from 'types/coverletter/coverletter-type';
import { createCoverLetter } from 'apis/coverLetterService';

const CoverLetter: React.FC = () => {
    let navigate = useNavigate();

    const [qnas, setQnas] = useState<QnAPair[]>([{question: "", answer: ""}]);
    const [title, setTitle] = useState<string>("");

    const titleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.target.value);
    }

    const backToHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/home");
    }

    const addQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newQuestion = { question: "", answer: "" };
        setQnas([...qnas, newQuestion]);
    }

    const onSetQnas = (question: string, answer: string, index: number) => {
        const pair: QnAPair = { question: question, answer: answer }
        let tempPairs = qnas;
        tempPairs.splice(index, 1, pair)
        setQnas(tempPairs)
    }
    
    // 자기소개서 작성 후 검색을 누르면 실행되는 함수, 몇번째 자개소개서인지 index 값 필요
    const onSearch = (index: number) => {
        // API 호출
    }

    const saveCoverLetter = async () => {
        createCoverLetter(qnas, title)
            .then((res) => navigate("/home/coverLetterList"))
    }

    return(
        <div className="Main">
        <Background>
            <TopNavigationBar state="자기소개서 작성"/>
            <div style={{position:"relative", marginBottom:"30px"}}>
                <IconButton onClick={backToHome}>
                    <ArrowBackIosOutlinedIcon className="back-icon"></ArrowBackIosOutlinedIcon>
                </IconButton>
                <Button 
                    className="button-login" 
                    variant="contained" 
                    onClick={() => {
                    saveCoverLetter();
                }}
                        style={{
                            position:"absolute", top: 10, right: 20, marginRight:"0px",
                            backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                            fontWeight: "500", fontSize:"13px", width:"40px", height:"30px",
                        }} >저장</Button>
            </div>

            <LetterBody>
                <TextProperty>{"자기소개서 제목"}</TextProperty>
                <TextField type="text" className='input-property' variant="outlined" size="small" placeholder='자기소개서 제목을 입력해주세요.'
                    onChange={titleChange} style={{
                        width:"700px",
                        marginBottom:"30px",
                        backgroundColor:"white"
                        }}
                />
                {qnas.map((qna, idx) => {
                    return (
                        <QuestionSet 
                            key={idx} 
                            index={idx}
                            onSearch={() => { onSearch(idx) }} 
                            onSetQnas={onSetQnas}
                            defaultQuestion={""}
                            defaultAnswer={""}
                        />
                    )
                })}
                <Button className="button-login" variant="contained" onClick={addQuestion}
                    style={{
                        backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                        fontWeight: "500", fontSize:"14px", width:"100px", height:"35px",marginBottom: "10px",
                    }}> 질문 추가</Button>

            </LetterBody>
        </Background>
        </div>
        
    )
}

const Background = styled.div`
    flex: 1;
    background-color: ${themes.colors.background};
`;

const TextProperty = styled.div`
    width: 690px;
    font-family: 'Notosans-semibold';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 7px;
`;

const LetterBody= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default CoverLetter;