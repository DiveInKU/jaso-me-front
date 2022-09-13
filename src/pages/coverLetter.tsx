import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/TopNavigationBar';
import { TextField } from "@material-ui/core";
import { Button,IconButton } from '@mui/material';
import styled from 'styled-components';
import themes from 'styles/themes';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import QuestionSet from 'components/QuestionSet';


const CoverLetter: React.FC = () => {
    type CoverLetterPair = {
        title: string;
        content: string;
    };

    let navigate = useNavigate();
    const [id,setId] = useState<string>("");
    const [pairs,setPairs] = useState<CoverLetterPair[]>([{title: "", content: ""}]);

    const emailChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setId(e.target.value);
    }

    const signIn=(e: React.MouseEvent<HTMLButtonElement>)=>{
        console.log(id);
        navigate("/home");
    }

    const backToHome = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/home");
    }

    const addQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        const newQuestion = { title: "", content: "" };
        setPairs([...pairs, newQuestion])
    }

    return(
        <div className="Main">
        <Background>
            <TopNavigationBar state="자기소개서 작성"/>
            <div style={{position:"relative", marginBottom:"30px"}}>
                <IconButton onClick={backToHome}>
                    <ArrowBackIosOutlinedIcon className="back-icon"></ArrowBackIosOutlinedIcon>
                </IconButton>
                <Button className="button-login" variant="contained" onClick={signIn}
                        style={{
                            position:"absolute", top: 10, right: 20, marginRight:"0px",
                            backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                            fontWeight: "500", fontSize:"13px", width:"40px", height:"30px",
                        }} >저장</Button>
            </div>

            <LetterBody>
                <TextProperty>{"자기소개서 제목"}</TextProperty>
                <TextField type="text" className='input-property' variant="outlined" size="small" placeholder='자기소개서 제목을 입력해주세요.'
                    onChange={emailChange} style={{
                        width:"700px",
                        marginBottom:"30px",
                        backgroundColor:"white"
                        }}
                />
                {pairs.map((pair, idx) => {
                    return (
                        <QuestionSet key={idx}></QuestionSet>
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