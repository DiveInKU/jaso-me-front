import React, { useState, useEffect } from 'react'
import TopNavigationBar from 'components/common/TopNavigationBar';
import styled from 'styled-components';
import themes from 'styles/themes';
import { getCoverLetterList, getCoverLetter } from 'apis/coverLetterService';
import { CoverLetter, CoverLetterMeta } from 'types/coverletter/coverletter-type';
import GlobalStyled from 'styles/GlobalStyled';
import QuestionSet from 'components/coverletter/QuestionSet';

const CoverLetterList: React.FC = () => {
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
    console.log('보내는 data',curCoverLetter);
  },[curCoverLetter]);


   // 자기소개서 선택하기
   const onSelectCoverLetter = (resumeId: number) => {
        setSelectedCoverLetter(coverLetterList.filter(coverLetterMeta => coverLetterMeta.resumeId == resumeId)[0]);
        
        // 자기소개서 상세 정보 가져오기
        getCoverLetter(resumeId)
            .then((res) => { 
                const data: CoverLetter = res.result
                console.log('length', data.qnas.length)
                const newCoverLetter = { title: data.title, qnas: data.qnas }
                setCurCoverLetter(newCoverLetter);
                //console.log('data',newCoverLetter)
            });
   }

   const onSearch = () => {
        // 검색 API
   };

   const onSetQnas = (question: string, answer: string, index: number) => {
        // const qna = { question: question, answer: answer }
        // let qnas = curCoverLetter.qnas
        // qnas.splice(index, 1, qna)

        // const newCoverLetter = {title: curCoverLetter.title, qnas: qnas}
        // setCurCoverLetter(newCoverLetter);
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
                            {curCoverLetter ? 
                                curCoverLetter.qnas.map((qna, idx) => {
                                console.log('바뀜', qna.question, idx)
                                return (
                                    <QuestionSet 
                                        key={qna.question} 
                                        onSearch={onSearch} 
                                        onSetQnas={onSetQnas} 
                                        index={idx}
                                        defaultQuestion={qna.question}
                                        defaultAnswer={qna.answer} />
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

export default CoverLetterList;