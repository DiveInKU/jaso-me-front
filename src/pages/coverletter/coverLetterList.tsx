import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import TopNavigationBar from 'components/common/TopNavigationBar';
import { TextField } from "@material-ui/core";
import { Button,IconButton } from '@mui/material';
import styled from 'styled-components';
import themes from 'styles/themes';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import QuestionSet from 'components/coverletter/QuestionSet';


const CoverLetterList: React.FC = () => {
   

    return(
        <div className="Main">
            <Background>
                <TopNavigationBar state="자기소개서 목록"/>
                <div style={{position:"relative", marginBottom:"30px", marginLeft:"50px", marginTop:"25px"}}>
                    <div className='question-text'>{"자기소개서 목록"}</div>
                </div>
            </Background>
        </div>
          
    )
}

const Background = styled.div`
    flex: 1;
    background-color: ${themes.colors.background};
`;

export default CoverLetterList;