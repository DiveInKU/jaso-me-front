import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import {  FormControlLabel, FormLabel, TextField } from "@material-ui/core";
import { Button,IconButton, FormControl, RadioGroup,  } from '@mui/material';
import Radio from '@mui/material/Radio';
import styled from 'styled-components';
import themes from 'styles/themes';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import QuestionSet from 'components/coverletter/QuestionSet';
import { QnAPair } from 'types/coverletter/coverletter-type';
import { createCoverLetter } from 'apis/coverLetterService';
import GlobalStyled from "styles/GlobalStyled";


const CoverLetter: React.FC = () => {
    let navigate = useNavigate();

    const [qnas, setQnas] = useState<QnAPair[]>([{question: "", answer: ""}]);
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("marketing");
    
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

    const removeQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        setQnas(qnas.splice(0,qnas.length-1));
    }
    
    const categoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
        console.log(category);
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
        //console.log("category 확인",category);
       createCoverLetter(qnas, category, title)
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
                <TextProperty>{"분야 선택"}</TextProperty>
                    <FormControl style={{width:"690px", marginBottom:"30px",}}>
                        <FormLabel id="radio-group-label"></FormLabel>
                        <RadioGroup row aria-labelledby='radio-group-label' name='radio-button-group' defaultValue="marketing" onChange={categoryChange}>
                            <FormControlLabel value="marketing" control={<Radio size="small"/>}  label="마케팅 👍"/>
                            <FormControlLabel value="business" control={<Radio size="small"/>}  label="경영"/>
                            <FormControlLabel value="it" control={<Radio size="small"/>}  label="IT"/>
                            {/* <FormControlLabel value="total" control={<Radio size="small"/>} label="전체"/> */}
                        </RadioGroup>
                    </FormControl>
                {qnas.map((qna, idx) => {
                    return (
                        <QuestionSet 
                            key={idx} 
                            index={idx}
                            onSearch={() => { onSearch(idx) }} 
                            onSetQnas={onSetQnas}
                            defaultQuestion={""}
                            defaultAnswer={""}
                            defaultCategory={category}
                        />
                    )
                })}

                
                <GlobalStyled.ViewRow>
                    <Button className="button-login" variant="contained" onClick={addQuestion}
                        style={{ flex:1,
                            backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                            fontWeight: "500", fontSize:"14px", width:"100px", height:"35px",marginBottom: "10px", marginRight: "15px",
                        }}> 질문 추가</Button>
                    <Button className="button-login" variant="contained" onClick={removeQuestion}
                        style={{ flex:1,
                            backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                            fontWeight: "500", fontSize:"14px", width:"100px", height:"35px",marginBottom: "10px", 
                        }}> 질문 제거</Button>
                </GlobalStyled.ViewRow>
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