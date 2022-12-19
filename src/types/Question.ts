import { QuestionTheme } from "./QuestionTheme";
import { QuestionType } from "./QuestionType";

type QuestionBase = {
    id: string;
    question: string;
    theme: QuestionTheme;
}

export type MultipleChoiceQuestion = QuestionBase & {
    type: QuestionType.MultipleChoice;
    options: string[];
    answer: string[];
    withFormula: boolean;
}

export type SingleChoiceQuestion = QuestionBase & {
    type: QuestionType.SingleChoice;
    options: string[];
    answer: string;
    withFormula: boolean;
}

export type TextQuestion = QuestionBase & {
    type: QuestionType.Text;
    answer: string;
}

export type Question = MultipleChoiceQuestion | SingleChoiceQuestion | TextQuestion;