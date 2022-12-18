import { QuestionType } from "./QuestionType";

type QuestionBase = {
    id: string;
    question: string;
}

type MultipleChoiceQuestion = QuestionBase & {
    type: QuestionType.MultipleChoice;
    options: string[];
    answer: string[];
}

type SingleChoiceQuestion = QuestionBase & {
    type: QuestionType.SingleChoice;
    options: string[];
    answer: string;
}

type TextQuestion = QuestionBase & {
    type: QuestionType.Text;
    answer: string;
}

export type Question = MultipleChoiceQuestion | SingleChoiceQuestion | TextQuestion;