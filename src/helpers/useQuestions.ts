import { useEffect, useState } from "react";

import { Question } from "types/Question";
import { QuestionTheme } from "types/QuestionTheme";

import { getQuestions } from "./getQuestions";

export function useQuestions(theme: QuestionTheme = QuestionTheme.All, amount: number = 10, shuffle: boolean = true) {
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        const questions = getQuestions(theme);
        const shuffledQuestions = shuffle ? questions.sort(() => Math.random() - 0.5) : questions;
        const questionsToTake = shuffledQuestions.slice(0, amount);

        setQuestions(questionsToTake);
    }, [theme, amount, shuffle]);

    return questions;
}