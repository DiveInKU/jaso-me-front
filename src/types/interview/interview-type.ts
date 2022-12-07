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
    history: HistorySet[],
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
    chartRef: any;
}

export interface WordCount {
    word: string;
    count: number;
};

export interface HistorySet {
    question: string;
    answer: string;
}

export interface MockInterview {
    title: string;
    qnas: HistorySet[];
    emotions: string[];
    values: number[];
    wordCounts: WordCount[];
    x: number[];
    y: number[];
    videoUrl: string;
}

export interface InterviewSet {
    emotionValues: number[];
    emotions: string[];
    qnas: HistorySet[];
    title: string;
    videoUrl: string;
    wordCounts: WordCount[];
    x: number[];
    y: number[];
    
}