export interface QuestionSetProps {
    index: number,
    onSearch: Function,
    onSetQnas: Function,
    defaultQuestion: string,
    defaultAnswer: string,
    defaultCategory: string,
};

export interface QnAPair {
    question: string;
    answer: string;
};

export interface CoverLetterMeta {
    resumeId: number,
    title: string,
}

export interface CoverLetter {
    qnas: Array<QnAPair>
    category: string,
    title: string,
}

