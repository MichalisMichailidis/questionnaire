export interface QuestionOption {
    Id: number;
    AnswerId: number;
    Answer: string;
    Action: 'GoToQuestion' | 'GoToUrl';
    GoToQuestionId: number;
    FilterQueryStringKey?: string;
    FilterQueryStringValue?: string;
}

export interface Question {
    Id: number;
    Question: string;
    Subtitle?: string;
    QuestionSelectType: number;
    IsOptional: boolean;
    Options: QuestionOption[];
}

export interface UserAnswer {
    questionId: number;
    selectedOptions: QuestionOption[];
}
