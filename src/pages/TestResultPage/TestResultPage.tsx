import { Divider } from "@chakra-ui/react";
import { getQuestion } from "helpers/getQuestion";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

import { TestResult } from "types/TestResult";
import { QuestionResultField } from "./components/QuestionResultField";

export function TestResultPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const testResult = location.state as TestResult;

    useEffect(() => {
        window.scrollTo({
            top: 0
        });

        if (!testResult) {
            navigate('/');
        }
    }, [testResult, navigate]);

    if (!testResult) {
        return null;
    }

    const renderQuestionAnswers = () => {
        return (
            <>
                {testResult.questionAnswers.map((q, i) => {
                    const question = getQuestion(q.questionId);

                    return (
                        <>
                            <QuestionResultField
                                key={q.questionId}
                                index={i + 1}
                                question={question!}
                                questionAnswer={q}
                            />
                            {i !== testResult.questionAnswers.length - 1 ? <Divider key={'divider-' + q.questionId} /> : null}
                        </>
                    )
                })}
            </>
        );
    }

    return (
        <div className="test">
            <p className="test-label">
                Результат: {testResult.correctAnswers} / {testResult.questionAnswers.length}
            </p>
            <div>
                {renderQuestionAnswers()}
            </div>
        </div>
    );
};