import React, { useState } from 'react';
import themes from 'styles/themes';
import GlobalStyles from 'styles/GlobalStyles';
import TopNavigationBar from 'components/TopNavigationBar';
import styled from 'styled-components';
import { TextField } from "@material-ui/core";
import { FormGroup, 
    FormControl,
    FormControlLabel, 
    Checkbox, 
    Button, 
    Select,
    InputLabel,
    NativeSelect,
    Menu,
    MenuItem,
} from '@mui/material';

const Interview: React.FC = () => {

    const questionNumbers = [2, 3, 4, 5, 6, 7, 8];

    return (
        <GlobalStyles.ViewCol style={{ backgroundColor: themes.colors.background}}>
            <TopNavigationBar state='모의 면접' />
            <GlobalStyles.ViewCol style={{ paddingTop: 20, paddingLeft: 30}}>
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

                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Age
                    </InputLabel>
                    <NativeSelect
                        defaultValue={30}
                        inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                        }}
                    >
                        <option value={10}>Ten</option>
                        <option value={20}>Twenty</option>
                        <option value={30}>Thirty</option>
                    </NativeSelect>
                </FormControl>
                
                <Button 
                    style={{ 
                        width: 120,
                        backgroundColor: themes.colors.main_blue,
                        color: themes.colors.white,
                        fontWeight: 700,
                        marginTop: 20,
                    }}>
                        모의 면접 생성
                </Button>
                
            </GlobalStyles.ViewCol>
        </GlobalStyles.ViewCol>
    )
}

const Title = styled.text`
    font-size: 18px;
    font-weight: 500;
`;

export default Interview;