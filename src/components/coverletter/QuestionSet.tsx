import React, { useState } from 'react'
import { TextField } from "@material-ui/core";
import { Button,IconButton } from '@mui/material';
import styled from 'styled-components';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { QuestionSetProps } from 'types/coverletter/coverletter-type';

const QuestionSet:React.FC<QuestionSetProps> = ({ index, onSearch, onSetPairs }) => {
    const [question,setQuestion] = useState<string>("");
    const [answer,setAnswer] = useState<string>("");

    const [visible,setVisible] = useState<boolean>(false);
    const [visible1,setVisible1] = useState<boolean>(true);
    const [visible2,setVisible2] = useState<boolean>(true);
    const [visible3,setVisible3] = useState<boolean>(true);

    const qChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
        onSetPairs(question, answer, index);
    }

    const aChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
        onSetPairs(question, answer, index);
    }
    
    const CopyClipBoard=async(text:string) => {
        try{
            await navigator.clipboard.writeText(text);
            alert('클립보드에 복사되었습니다.')
        }catch(error){
            alert('복사 실패,,')
        }
    }



    return(
        <div style={{marginLeft:"10px"}}>
            <TextProperty>{"자기소개서 질문"}</TextProperty>
            <TextField type="text" className='input-property' variant="outlined" size="small" placeholder='자기소개서 질문을 입력해주세요.'
                onChange={qChange} style={{
                    width:"700px",
                    marginBottom:"30px",
                    backgroundColor:"white"
                }}
            />
            <div style={{position:"relative", marginBottom:"10px"}}>
                <TextProperty1>{"자기소개서 작성"}</TextProperty1>
                <Button 
                    className="button-login"
                    variant="contained" 
                    onClick={ () => {
                        setVisible(true);
                        setVisible1(true);
                        setVisible2(true);
                        setVisible3(true);
                    }}
                        style={{
                            position:"absolute", top: 0, left:"120px", marginRight:"0px", marginLeft:"5px",
                            backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                            fontWeight: "500", fontSize:"13px", width:"40px", height:"30px"
                        }} >검색</Button>
            </div>
            <TextField type="text" multiline rows={7} className='input-property' variant="outlined" size="small" placeholder='질문에 대한 자기소개서를 입력하고 검색을 눌러보세요.'
                onChange={aChange} style={{
                    width:"700px",
                    marginBottom:"30px",
                    backgroundColor:"white"
                }}
            />

            {visible && <div>
                {visible1 && <div>
                    <IconButton style={{float:"right"}} onClick={()=>{setVisible1(false);}}>
                        <CancelOutlinedIcon style={{paddingRight:"10px"}}></CancelOutlinedIcon>
                    </IconButton>
                    <AnswerBox onClick={()=> CopyClipBoard('추천1')}>추천 1</AnswerBox></div>}
                
                {visible2 && <div>
                    <IconButton style={{float:"right"}} onClick={()=>{setVisible2(false);}}>
                        <CancelOutlinedIcon style={{paddingRight:"10px"}}></CancelOutlinedIcon>
                    </IconButton>
                    <AnswerBox onClick={()=> CopyClipBoard('추천2')}>추천 2</AnswerBox></div>}

                {visible3 && <div>
                    <IconButton style={{float:"right"}} onClick={()=>{setVisible3(false);}}>
                        <CancelOutlinedIcon style={{paddingRight:"10px"}}></CancelOutlinedIcon>
                    </IconButton>
                    <AnswerBox onClick={()=> CopyClipBoard('추천3')}>추천 3</AnswerBox></div>}
            </div>}

            
        </div>
        
    )
}

const TextProperty = styled.div`
    width: 690px;
    font-family: 'Notosans-semibold';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    margin-bottom: 7px;
    padding-left: 5px;
`;

const TextProperty1 = styled.div`
    width: 690px;
    font-family: 'Notosans-semibold';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    padding: 5px;
    margin-right:10px;
`;

const AnswerBox= styled.div`
    width: 683px;
    height: 140px;
    font-family: 'Notosans-semibold';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    background-color:white;
    border: 2px solid #4F62AC;
    border-radius: 5px;
    padding: 7px;
    margin-bottom: 15px;
`;

export default QuestionSet;