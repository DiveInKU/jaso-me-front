export interface BubbleProps {
    text: string;
};

export interface History {
    text: string;
    type: HISTORY_TYPE;
}

export const HISTORY_TYPE = {
    QUESTION: 'Question',
    ANSWER: 'Answer'
} as const;
type HISTORY_TYPE = typeof HISTORY_TYPE[keyof typeof HISTORY_TYPE]