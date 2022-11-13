import React, { useState, useEffect } from 'react'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import { FormControlLabel, FormLabel} from "@material-ui/core";
import { Button, FormControl, RadioGroup} from '@mui/material';
import Radio from '@mui/material/Radio';
import { getCoverLetterList, getCoverLetter, deleteCoverLetter, changeCoverLetter } from 'apis/coverLetterService';
import { CoverLetter, CoverLetterMeta } from 'types/coverletter/coverletter-type';
import GlobalStyled from 'styles/GlobalStyled';
import QuestionSet from 'components/coverletter/QuestionSet';
import { QnAPair } from 'types/coverletter/coverletter-type';

const CoverLetterList: React.FC = () => {

    const [visible,setVisible] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [qnas, setQnas] = useState<QnAPair[]>([{question: "", answer: ""}]);
    const [title, setTitle] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    // 불러온 자기소개서 목록
    const [coverLetterList, setCoverLetterList] = useState<CoverLetterMeta[]>();

    // 현재 선택한 자기소개서 (이름, 아이디)
    const [selectedCoverLetter, setSelectedCoverLetter] = useState<CoverLetterMeta>({resumeId: -1, title: ""});

    // 선택한 자기소개서의 질문과 답변들
    const [curCoverLetter, setCurCoverLetter] = useState<CoverLetter>();

   // 최초 렌더링 시 자기소개서 리스트 조회
    useEffect(() => {
        getCoverLetterList()
            .then((res) => {
                setCoverLetterList(res.result);
            })
    }, []);
   
    useEffect(() => {
        console.log('curcoverletter',curCoverLetter);
        //setCategory(curCoverLetter.category);

    },[curCoverLetter]);

   // 자기소개서 선택하기
   const onSelectCoverLetter = (resumeId: number) => {
        setVisible(true);
        setSelectedCoverLetter(coverLetterList.filter(coverLetterMeta => coverLetterMeta.resumeId == resumeId)[0]);
        setId(resumeId);
        console.log(id);
        // 자기소개서 상세 정보 가져오기
        getCoverLetter(resumeId)
            .then((res) => { 
                console.log("결과 값 확인",res.result);
                const data: CoverLetter = res.result
                console.log('length', data.qnas.length)
                const newCoverLetter = { title: data.title, qnas: data.qnas, category: data.category,}
                
                //console.log("카테고리 확인",data.category);
                setCategory(data.category);
                setQnas(data.qnas);
                setTitle(data.title);
                setCurCoverLetter(newCoverLetter);
                //console.log('data',newCoverLetter)
            });
   }

   const onSelectDeleteButton = () => {
        deleteCoverLetter(id)
            .then((res) => { 
                console.log(res);
                window.location.replace("/home/coverLetterList");
            });
   }

   const onSelectChangeButton = async () => {
        console.log("category 값 바뀌는거 확인", category);
        changeCoverLetter(qnas, category, title, id)
            .then((res) => {
                console.log('수정 test',category);
                window.location.replace("/home/coverLetterList");
            })
    }

   const onSearch = () => {
        // 검색 API
   };
   
   const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategory(e.target.value);
        console.log("카테고리 확인",e.target.value);
    }  

   const onSetQnas = (question: string, answer: string, index: number) => {
        const qna = { question: question, answer: answer }
        let qnas = curCoverLetter.qnas
        qnas.splice(index, 1, qna)

        const newCoverLetter = {title: curCoverLetter.title, qnas: qnas, category: curCoverLetter.category}
        setCurCoverLetter(newCoverLetter);
    }

    return(
        <div className="Main">
            <Background>
                <TopNavigationBar state="자기소개서 목록"/>
                <GlobalStyled.ViewRow style={{marginTop: '20px' }}>
                    <GlobalStyled.ViewCol style={{ flex: 3, marginLeft: 20 }}>

                        <div style={{fontSize: 22, marginBottom: 10}}>자기소개서 목록</div>
                        {coverLetterList ? coverLetterList.map((coverLetterMeta, idx) => {
                            return (
                                <div key={idx}
                                    onClick={() => onSelectCoverLetter(coverLetterMeta.resumeId) }
                                    style={{ 
                                        color: coverLetterMeta.resumeId == selectedCoverLetter.resumeId ? themes.colors.main_blue : "black",
                                        fontWeight: coverLetterMeta.resumeId == selectedCoverLetter.resumeId ? "bold" : "normal",
                                        marginLeft: 10,
                                        marginTop: 20,
                                        fontSize: 18,
                                        cursor: 'pointer'
                                    }}
                                >
                                    • {coverLetterMeta.title}
                                </div>
                            )
                        }) : null}
                    </GlobalStyled.ViewCol>

                    <GlobalStyled.ViewCol style={{flex: 7}}>
                    {visible && <div>
                        <Button 
                            className="button-login" 
                            variant="contained" 
                            onClick={() => {onSelectChangeButton();}}
                            style={{
                                position:"absolute", top: 10, right: 20, marginRight:"80px", marginTop:"70px",
                                backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                                fontWeight: "500", fontSize:"13px", width:"40px", height:"30px",
                            }} >수정</Button>
                        <Button 
                            className="button-login" 
                            variant="contained" 
                            onClick={() => {onSelectDeleteButton();}}
                            style={{
                                position:"absolute", top: 10, right: 20, marginRight:"0px", marginTop:"70px",
                                backgroundColor: "#4F62AC", fontFamily: 'Notosans-medium', fontStyle:"normal",
                                fontWeight: "500", fontSize:"13px", width:"40px", height:"30px",
                            }} >삭제</Button>

                        <TextProperty>{"분야 선택"}</TextProperty>
                            <FormControl style={{width:"690px", marginBottom:"30px", marginLeft:"15px"}}>
                                <FormLabel id="radio-group-label"></FormLabel>
                                    <RadioGroup row aria-labelledby='radio-group-label' name='radio-button-group' defaultValue={category} onChange={changeCategory}>
                                        <FormControlLabel checked={category == "marketing"} value="marketing" control={<Radio size="small"/>}  label="마케팅"/>
                                        <FormControlLabel checked={category == "business"} value="business" control={<Radio size="small"/>}  label="경영"/>
                                        <FormControlLabel checked={category == "it"} value="it" control={<Radio size="small"/>}  label="IT"/>
                                        <FormControlLabel  checked={category == "total"} value="total" control={<Radio size="small"/>} label="전체"/>
                                    </RadioGroup>
                            </FormControl></div>}

                            {curCoverLetter ? 
                                curCoverLetter.qnas.map((qna, idx) => {
                                console.log('바뀜', qna.question, idx)
                                return (
                                    <QuestionSet 
                                        key={qna.question} //key로 주는거 때매 question focus 사라짐,,
                                        onSearch={onSearch} 
                                        onSetQnas={onSetQnas} 
                                        index={idx}
                                        defaultQuestion={qna.question}
                                        defaultAnswer={qna.answer} 
                                        defaultCategory={category}/>
                                )   
                            }) : null}
                    </GlobalStyled.ViewCol>
                </GlobalStyled.ViewRow>     
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
    margin-left: 10px;
    padding-left: 5px;
`;

export default CoverLetterList;