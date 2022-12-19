import { QuestionAnswer } from "./QuestionAnswer";

export type TestResult = {
    questionAnswers: QuestionAnswer[],
    correctAnswers: number;
};