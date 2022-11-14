import React, { useState } from 'react';
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

const Interview: React.FC = () => {
    let navigate = useNavigate();

    const questionNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

    const goToWebcamTestPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        startEmotionAnalysis();
        navigate("/home/interview/webcamtest")
    }

    return (
        <GlobalStyled.ViewCol style={{ backgroundColor: themes.colors.background}}>
            <TopNavigationBar state='모의 면접' />
            <GlobalStyled.ViewCol style={{ paddingTop: 20, paddingLeft: 30}}>
                <Title>모의 면접 제목</Title>
                <TextField style={{ marginTop: 10, marginBottom: 30}}
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
                         }}/>}
                        label={'랜덤 질문'}/>
                    <FormControlLabel 
                         control={<Checkbox defaultChecked sx={{
                            '&.Mui-checked': {
                                color: themes.colors.main_blue
                            }
                         }}/>}
                        label={'사용자 정의 질문'}/>
                </FormGroup>

                <Title>질문 개수</Title>

                <FormControl style={{ width: 100, marginTop: 10, marginBottom: 20}}>
                    <Select
                        size="small"
                        defaultValue={1}
                        inputProps={{
                        name: 'numbers'
                        }}
                        id="demo-select-small"
                    >
                        {questionNumbers.map((number, idx) => 
                            { return <MenuItem key={idx} value={number}>{number}</MenuItem> }
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