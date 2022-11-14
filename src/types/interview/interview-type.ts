import SocketVideo from "components/socket-video";
import React from "react";

export interface BubbleProps {
    text: string;
};

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
    // ref: React.MutableRefObject<React.FC >;
};

export const HISTORY_TYPE = {
    QUESTION: 'Question',
    ANSWER: 'Answer'
} as const;
type HISTORY_TYPE = typeof HISTORY_TYPE[keyof typeof HISTORY_TYPE]