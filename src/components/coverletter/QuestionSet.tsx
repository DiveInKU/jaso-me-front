import React, { useState,useEffect, useRef } from 'react'
import { TextField } from "@material-ui/core";
import { Button,IconButton } from '@mui/material';
import styled from 'styled-components';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { QuestionSetProps } from 'types/coverletter/coverletter-type';

const QuestionSet:React.FC<QuestionSetProps> = ({ index, onSearch, onSetQnas, defaultQuestion, defaultAnswer }) => {

    const [question, setQuestion] = useState<string>(defaultQuestion);
    const [answer, setAnswer] = useState<string>(defaultAnswer);

    const [visible,setVisible] = useState<boolean>(false);
    const [visible1,setVisible1] = useState<boolean>(true);
    const [visible2,setVisible2] = useState<boolean>(true);
    const [visible3,setVisible3] = useState<boolean>(true);

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
    
    const CopyClipBoard=async(text:string) => {
        try{
            await navigator.clipboard.writeText(text);
            //alert('클립보드에 복사되었습니다.')
        }catch(error){
            //alert('복사 실패,,')
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
                defaultValue={question}
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
                defaultValue={answer}
            />

            {visible && <div>
                {visible1 && <div>
                    <AnswerBox style={{fontFamily: 'Notosans-medium',letterSpacing: 0.5,lineHeight: 1.3}} onClick={()=> CopyClipBoard('추천1')}>
                        <IconButton style={{float:"right"}} onClick={()=>{setVisible1(false);}}>
                            <CancelOutlinedIcon style={{position:"absolute"}}></CancelOutlinedIcon>
                        </IconButton>
                        추천 1<br/><br/>제가 가장 중요하다고 생각하는 것은 '팀워크'입니다. 저는 먼저 팀원을 이끄는 책임감과 리더십을 갖추고자 합니다. 
                        대학교에서 다양한 경험을 했고 여러 가지 아르바이트를 했습니다. 
                        특히나 전공 수업과 학과 홍보 업무를 병행했기에 대외활동과 기획활동을 통해 더 많은 사람과 교류하는 것이 가능해졌었습니다. 
                        대학에 입학한 후에도 대학생활 동안 동아리 활동을 하면서 학내 구성원들과 함께 크고 작은 마찰이 있었음에도 화합하며 일을 해결해 나갔으며 
                        좋은 기억으로 남을 수 있습니다. 귀사에 입사 후
                    </AnswerBox>
                </div>}
                
                {visible2 && <div>
                    <AnswerBox style={{fontFamily: 'Notosans-medium',letterSpacing: 0.5,lineHeight: 1.3}} onClick={()=> CopyClipBoard('추천2')}>
                        <IconButton style={{float:"right"}} onClick={()=>{setVisible2(false);}}>
                            <CancelOutlinedIcon style={{position:"absolute"}}></CancelOutlinedIcon>
                        </IconButton>
                        추천 2<br/><br/>제가 가장 중요하다고 생각하는 것은 '직접 경험하고 느낄 수 있는 역량'입니다. 
                        귀사에 입사하여 관련 직무에 대한 경험을 쌓고 싶습니다. 그 과정에서, 
                        더 넓은 세상을 보며 다양한 이해관계자들과 소통한 경험과 전문성을 키우기 위해 다음과 같은 계획을 세우고 실천해 나갈 것입니다. 
                        먼저 물류의 시작부터 끝까지 책임지는 인재로 거듭나겠습니다 지금까지 쌓아온 꼼꼼함을 바탕으로 업무에 잘 적응할 뿐만 아니라 
                        고객의 니즈를 만족시키는 일에 관심을 두게 됩니다. 또한, 글로벌 역량을 강화하기 위한 도전
                    </AnswerBox>
                </div>}

                {visible3 && <div>
                    <AnswerBox style={{fontFamily: 'Notosans-medium',letterSpacing: 0.5,lineHeight: 1.3}} onClick={()=> CopyClipBoard('추천3')}>
                        <IconButton style={{float:"right"}} onClick={()=>{setVisible3(false);}}>
                            <CancelOutlinedIcon style={{position:"absolute"}}></CancelOutlinedIcon>
                        </IconButton>
                        추천 3<br/><br/>제가 가장 중요하다고 생각하는 것은 '열정'입니다. 
                        대학 시절 동아리 활동, 연합 토론회, 국제포럼 등 활발한 대외활동을 통해 팀워크를 이뤄왔습니다. 
                        이러한 역량을 바탕으로 귀사에 입사하여 열정적으로 노력하겠습니다 저는 어릴 때부터 열정이 많아 남들에게 인정을 많이 받았기 때문에 
                        주위 사람들 앞에서 먼저 발 벗고 나서서 적극적으로 말할 수 있다고 생각합니다. 그래서 평소에는 적극적인 성격을 가지고 있기 때문에, 
                        항상 밝고 긍정적인 성격으로 사람들에게 신뢰를 받아 주변 사람들도 자신을 인정해주면서 함께 일하는 것을 좋아하기 때문입니다.
                    </AnswerBox>
                </div>}
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