import MainMenuText from 'components/MainMenuText';
import TopNavigationBar from 'components/TopNavigationBar';
import { useNavigate } from 'react-router'
import React from 'react';
import styled from 'styled-components';
import themes from 'styles/themes';
import mainIlst from '../assets/svgs/mainIlst.svg';
import coverLetterLogo from '../assets/svgs/coverLetterLogo.svg';
import interviewLogo from '../assets/svgs/interviewLogo.svg';
import questionLogo from '../assets/svgs/questionLogo.svg';



const Home: React.FC = () => {

    let navigate = useNavigate();

    const menuText = {
        coverLetterText: {
            title: '자기소개서',
            desc: 'AI 추천을 통한 쉽고 빠른 나만의 자기소개서를 작성해보세요!',
            sign: '자기소개서 작성하기',
        },
        interviewText: {
            title: '모의 면접',
            desc: '다양한 질문과 함께 실제 면접에 대비해보세요!',
            sign: '모의면접 진행하기',
        },
       questionText: {
            title: '면접 질문',
            desc: '모의면접을 위한 질문을 생성 및 수정할 수 있어요!',
            sign: '마이페이지 바로가기',
        },
    }

    return (
      <Background>
        <TopNavigationBar />
        <div style={{ display: 'flex', flexDirection: 'row'}}>

        <MainInfoBg>
            <MainIlstImage src={mainIlst} />
            <div style={{ display: 'flex', flexDirection: 'column'}}>
                <MainTitle>취업 준비 서비스!</MainTitle>
                <MainContent>{'자기소개서 작성, 모의 면접, \n모두 자소미에서!'}</MainContent>
            </div>
        </MainInfoBg>

        <MainMenuBg>
            <CoverLetterBg>
                <MainMenuText
                    onClick={() => { navigate("/coverLetter")}}
                    title={menuText.coverLetterText.title}
                    desc={menuText.coverLetterText.desc}
                    sign={menuText.coverLetterText.sign} />
                <img src={coverLetterLogo} style={{ marginLeft: 20, flex: 1, width: 130, height: 130 }}/>
            </CoverLetterBg>

            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20, width: '100%'}}>
                <InterviewBg>
                    <MainMenuText 
                        onClick={() => { console.log('hi') }}
                        title={menuText.interviewText.title}
                        desc={menuText.interviewText.desc}
                        sign={menuText.interviewText.sign} />
                    <div style={{ display: 'flex', flex: 1}}></div>
                    <img src={interviewLogo} style={{ width: 110, height: 110, alignSelf: 'flex-end'}}/>
                </InterviewBg>

                <QuestionBg>
                    <MainMenuText 
                        onClick={() => { console.log('hi') }}
                        title={menuText.questionText.title}
                        desc={menuText.questionText.desc}
                        sign={menuText.questionText.sign} />
                    <img src={questionLogo} style={{ width: 110, height: 110, marginLeft: 20, flex: 1 }}/>
                </QuestionBg>
            </div>
        </MainMenuBg>

        </div>
      </Background>
    )
}

const Background = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${themes.colors.background};
`;

const MainInfoBg = styled.div`
    display: flex;
    flex-direction: column;
    flex: 2;
    margin-right: 100;
    align-items: center;
`;

const MainIlstImage = styled.img`
    width: 470px;
    height: 320px;
    margin-top: 70px;
    margin-left: 70px;
`;

const MainTitle = styled.div`
    font-size: 33px;
    font-weight: 700;
    margin-bottom: 15px;
`;;

const MainContent = styled.div`
    width: 250px;
    font-size: 23px;
    font-weight: 500;
`

const MainMenuBg = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
    align-items: center;
    margin-top: 70px;
    margin-left: 120px;
`

const CoverLetterBg = styled.div`
    width: 590px;
    height: 190px;
    display: flex;
    flex-direction: row;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${themes.colors.blue_2};
`

const InterviewBg = styled.div`
    height: 300px;
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-right: 20px;
    padding: 24px;
    background-color: ${themes.colors.blue_1};
`;

const QuestionBg = styled.div`
    height: 190px;
    display: flex;
    flex: 2.5;
    flex-direction: row;
    align-items: center;
    padding-left: 24px;
    padding-right: 24px;
    background-color: ${themes.colors.blue_3};
`;

  export default Home;