import { QuestionSet } from "types/mypage/mypage-type";

export interface BubbleProps {
    text: string;
};

export interface InterviewInfo {
    title: string;
    question: QuestionSet[];
}

export interface History {
    text: string;
    type: HISTORY_TYPE;
}

export interface InterviewMeta {
    interviewId: number,
    title: string,
}

export interface Interview {
    videoUrl: string,
    histories: History[],
    gazeUrl: string,
    smileUrl: string,
}
export interface SocketCamProps {
    webSocketUrl: string;
    showing: boolean;
    recordedChunks: string[];
    finishConnector: Function;
    onSetSocketImg: Function;
};

export const HISTORY_TYPE = {
    QUESTION: 'Question',
    ANSWER: 'Answer'
} as const;
type HISTORY_TYPE = typeof HISTORY_TYPE[keyof typeof HISTORY_TYPE]

export interface ChartProps {
    emotions: string[];
    values: number[];
}

export interface WordCountChartProps {
    wordCounts: WordCount[];
}

export interface ScatterChartProps {
    combinedData: object;
}

export interface WordCount {
    word: string;
    count: number;
};

export interface HistorySet {
    question: string;
    answer: string;
}