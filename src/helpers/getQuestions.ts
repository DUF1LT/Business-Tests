import { QuestionTheme } from "types/QuestionTheme";

import questionJson from "data/questions.json";
import { Question } from "types/Question";

export function getQuestions(theme: QuestionTheme) {
    const questions = JSON.parse(JSON.stringify(questionJson)) as Question[];

    if (theme === QuestionTheme.All) {
        return questions;
    }

    const themeQuestions = questions.filter((question) => question.theme === theme);

    return themeQuestions;
}