import GlobalStyled from "styles/GlobalStyled";
import React, {  useState } from "react";
import TopNavigationBar from "components/TopNavigationBar";
import themes from "styles/themes";
import styled from "styled-components";
import Webcam from "react-webcam";
import { Button } from "@mui/material";
import LeftBubble from "components/LeftBubble";
import RightBubble from "components/RightBubble";
import { History } from "types/interview/interview-type";

const InterviewRoom: React.FC = () => {

    const questions: Array<string> = [
        "대학교 때 겪은 가장 흥미로운 활동이 무엇인가요?",
        "가장 인상깊은 과목이 있다면 한가지를 말해주세요.",
        "최근 가장 몰입한 경험이 무엇인가요?",
        "목표를 달성하는 방법을 말해주세요.",
        "협업을 하며 갈등 경험과 해결한 방법을 말해주세요.",
    ];

    const [stage, setStage] = useState<number>(0); // 현재 질문 단계
    const [logs, setLogs] = useState<History[]>([{text: questions[0], type: 0}]); // 질문 + 답변 기록 배열

    const moveToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (stage == questions.length - 1) {
            alert("마지막 질문입니다.");
        }
        else {
            setStage(stage+1);

            const nextQuestion: History = {text: questions[stage], type: 0}
            const curAnswer: History = {text: "답변입니다.", type: 1}

            setLogs([...logs, curAnswer, nextQuestion]);
        }
    }

    return(
        <GlobalStyled.ViewCol style ={{ backgroundColor: themes.colors.background }}>
            <TopNavigationBar state="모의 면접"/>
            <GlobalStyled.ViewRow>
                <GlobalStyled.ViewCol className="webcam-div" style={{flex: 5}}>
                    <BlueBox style={{ flex: 1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div className="interview-title">2022 상반기 네이버 공채 모의 면접</div>
                    </BlueBox>
                    <Webcam mirrored={true} style={{ flex: 8 }} />
                    <BlueBox 
                        className="media-box"
                        style={{ flex: 1, justifyContent: 'flex-end', paddingRight: 30, height: 80}}>
                        <Button
                            className="next-btn"
                            disableElevation
                            variant="contained"
                            onClick={moveToNext}
                            style={{
                                backgroundColor: 'white',
                                color: themes.colors.main_blue, 
                                fontWeight: 800}}>
                                {stage == questions.length-1 ? "면접 종료" : "다음으로"}
                        </Button>
                    </BlueBox>
                </GlobalStyled.ViewCol>

                <GlobalStyled.ViewCol className="history-div" style={{flex: 4}}>
                    <BlueBox style={{ flex:1, paddingTop: 20, paddingBottom: 20, justifyContent: 'center'}}>
                        <div>대화 기록</div>
                    </BlueBox>

                    <GlobalStyled.ViewCol style={{ flex: 30, backgroundColor: 'white' }}>
                        {
                            logs.map((log, idx) => {
                                return (
                                    log.type == 0 ?
                                    <LeftBubble text={log.text} /> :
                                    <RightBubble text={log.text} />
                                )
                            })
                        }
                    </GlobalStyled.ViewCol>

                </GlobalStyled.ViewCol>
            </GlobalStyled.ViewRow>

        </GlobalStyled.ViewCol>
    )
}

const BlueBox = styled(GlobalStyled.ViewRow)`
    background-color: ${themes.colors.main_blue};
    color: ${themes.colors.white};
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 'auto';
    height: '10%';
`;


export default InterviewRoom;