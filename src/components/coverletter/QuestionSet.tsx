import React, { useState,useEffect, useCallback } from 'react'
import { TextField, useEventCallback } from "@material-ui/core";
import { Button,IconButton } from '@mui/material';
import styled from 'styled-components';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { QuestionSetProps } from 'types/coverletter/coverletter-type';
import { generateCoverLetter } from 'apis/aiService';
import ScaleLoader from "react-spinners/ScaleLoader";

const QuestionSet:React.FC<QuestionSetProps> = ({ index, onSearch, onSetQnas, defaultQuestion, defaultAnswer, defaultCategory}) => {

    //let content: string[] = [];

    const [question, setQuestion] = useState<string>(defaultQuestion);
    const [answer, setAnswer] = useState<string>(defaultAnswer);
    const [content, setContent] = useState<string[]>([]);

    const [visible,setVisible] = useState<boolean>(false);
    const [loading,setLoading] = useState<boolean>(false);

    useEffect(() => {
        setQuestion(question);
        setAnswer(answer);
        //console.log('받는 data',defaultQuestion)
      },[])

    useEffect(() => {
        onSetQnas(question, answer, index);
    },[question]);

    useEffect(() => {
        onSetQnas(question, answer, index);
    },[answer]);

    const qChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
        onSetQnas(question, answer, index);
        //console.log('질문',question);
    }

    const aChange=(e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value);
        onSetQnas(question, answer, index);
    }
    
    const closeButton = (idx:number) => {
        console.log("index 확인",idx);
        setContent([...content.slice(0,idx),...content.slice(idx+1)]);
        console.log(content);
    }

    const CopyClipBoard = async(text:string) => {
        try{
            await navigator.clipboard.writeText(text);
            //alert('클립보드에 복사되었습니다.')
        }catch(error){
            //alert('복사 실패,,')
        }
    }

    const onSelectSearchButton = () => {
        setLoading(true);
        setVisible(false);
        setContent(content.splice(0));

        generateCoverLetter(defaultCategory,answer,3)
            .then((res) => { 
                setLoading(false);
                console.log(res.generated);            
                setContent([...content, ...res.generated]);
                setVisible(true);
            })
            .catch((err) => {
                console.log(err);
            });
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
                defaultValue={question}
            />
            <div style={{position:"relative", marginBottom:"10px"}}>
                <TextProperty1>{"자기소개서 작성"}</TextProperty1>
                <Button 
                    className="button-login"
                    variant="contained" 
                    onClick={ () => {
                        onSelectSearchButton();
                       
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
                defaultValue={answer}
            />
            {visible && <div>
                {content ? content.map((content, idx) => {
                return (
                    <div key={idx}>
                    <AnswerBox style={{fontFamily: 'Notosans-medium',letterSpacing: 0.5,lineHeight: 1.3, fontSize:14}} onClick={()=> CopyClipBoard(content)}>
                        <IconButton style={{float:"right"}}>
                            <CancelOutlinedIcon style={{position:"absolute"}} onClick={() => closeButton(idx)}></CancelOutlinedIcon>
                        </IconButton>
                            {"추천 " + Number(idx+1)} <br/><br/> {content}
                    </AnswerBox>
                    </div>
                )
            }):null}</div>}

            {loading && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <div style={{marginBottom:10,}}>잠시만 기다려 주세요</div>
                <ScaleLoader style={{ marginBottom:100 }} color="#4F62AC" height={30} width={5} radius={2} margin={2}/>
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
    height: 200px;
    font-family: 'Notosans-semibold';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    background-color:white;
    border: 2px solid #4F62AC;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 15px;
`;

export default QuestionSet;