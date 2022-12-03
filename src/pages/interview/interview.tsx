import React, { useState, useEffect } from 'react';
import themes from 'styles/themes';
import GlobalStyled from 'styles/GlobalStyled';
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import { TextField } from "@material-ui/core";
import { FormGroup, 
    FormControl,
    FormControlLabel, 
    Checkbox, 
    Button, 
    Select,
    MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { startEmotionAnalysis } from "apis/interviewService";
import { InterviewInfo } from 'types/interview/interview-type';
import {getRandomQuestions} from 'apis/myPageService';
import { QuestionSet } from 'types/mypage/mypage-type';

const Interview: React.FC = () => {
    let navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    const [isRandom, setIsRandom] = useState<boolean>(true);
    const [isMember, setIsMember] = useState<boolean>(true);
    const [count, setCount] = useState<number>(1);
    const [question,setQuestion] = useState<QuestionSet[]>([{content:""}]);

    useEffect(() => {
        getRandomQuestions(isRandom,isMember,count)
            .then((res) => {setQuestion(res.result)})
    }, [isRandom,isMember,count]);

    const goToWebcamTestPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("질문셋",question)
        let InterviewInfo: InterviewInfo = { title: title, question: question}
    
        console.log("test",InterviewInfo)
        startEmotionAnalysis();
        navigate("/home/interview/webcamtest", {state : InterviewInfo})
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const isRandomQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsRandom(e.target.checked);
        //console.log('랜덤질문',isRandom);
    }

    const isMemberQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsMember(e.target.checked);
        //console.log('사용자질문', isMember);
    }


    return (
        <GlobalStyled.ViewCol style={{ backgroundColor: themes.colors.background}}>
            <TopNavigationBar state='모의 면접' />
            <GlobalStyled.ViewCol style={{ paddingTop: 20, paddingLeft: 30}}>
                <Title>모의 면접 제목</Title>
                <TextField
                    onChange={onTitleChange} 
                    style={{ marginTop: 10, marginBottom: 30}}
                    type="text" 
                    className='input-id'
                    variant="outlined"
                    size="small"
                    placeholder='제목을 입력하세요.'/>

                <Title>질문 선택</Title>
                <FormGroup row={true} style={{ marginBottom: 30}}>
                    <FormControlLabel 
                        control={<Checkbox defaultChecked sx={{
                            '&.Mui-checked': {
                                color: themes.colors.main_blue
                            }
                         }} onChange={isRandomQuestion}/>}
                        label={'랜덤 질문'}/>
                    <FormControlLabel 
                         control={<Checkbox defaultChecked sx={{
                            '&.Mui-checked': {
                                color: themes.colors.main_blue
                            }
                         }} onChange={isMemberQuestion}/>}
                        label={'사용자 정의 질문'}/>
                </FormGroup>

                <Title>질문 개수</Title>

                <FormControl style={{ width: 100, marginTop: 10, marginBottom: 20}}>
                    <Select onChange={(e) => {setCount(e.target.value as number)}}
                        size="small"
                        defaultValue={1}
                        inputProps={{
                        name: 'numbers'
                        }}
                        id="demo-select-small"

                    >
                        {questionNumbers.map((numbers, idx) => 
                            { return <MenuItem key={idx} value={numbers}>{numbers}</MenuItem> }
                        )}
                    </Select>
                </FormControl>
                
                <Button 
                    style={{ 
                        width: 120,
                        backgroundColor: themes.colors.main_blue,
                        color: themes.colors.white,
                        fontWeight: 700,
                        marginTop: 20,
                    }}
                    onClick={goToWebcamTestPage}
                    >
                        모의 면접 생성
                </Button>
                
            </GlobalStyled.ViewCol>
        </GlobalStyled.ViewCol>
    )
}

const Title = styled.text`
    font-size: 18px;
    font-weight: 500;
`;

export default Interview;