import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Divider, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import ReactRouterPrompt from "react-router-prompt";

import { useQuestions } from "helpers/useQuestions";
import { QuestionTheme } from "types/QuestionTheme";
import { getLabelFromTheme } from "helpers/getLabelFromTheme";
import { TestResult } from "types/TestResult";
import { QuestionAnswer } from "types/QuestionAnswer";

import { QuestionField } from "./components/QuestionField";

import './Test.scss';
import { QuestionType } from "types/QuestionType";

export type TestFormValues = {
    [key: string]: string | string[],
}

const sortStrings = (a: string, b: string) => a.localeCompare(b);

export function Test() {
    const { theme } = useParams();
    const questions = useQuestions(theme as QuestionTheme);
    const navigate = useNavigate();

    const { register, handleSubmit, control, formState: { isSubmitting } } = useForm<TestFormValues>();


    const onSubmit = (values: TestFormValues) => {
        const questiondIds = Object.keys(values);

        const correctAnswers = questiondIds.reduce((acc, value) => {
            const question = questions.find(f => f.id === value);

            switch (question?.type) {
                case QuestionType.MultipleChoice: {
                    const answer = question.answer;
                    const userAnswer = !Array.isArray(values[value]) ? [] : values[value] as string[];

                    if (JSON.stringify(answer.sort(sortStrings)) === JSON.stringify(userAnswer?.sort(sortStrings))) {
                        acc++;
                    }
                    break;
                }
                case QuestionType.SingleChoice: {
                    const answer = question.answer;
                    const userAnswer = values[value] as string;
                    if (userAnswer === answer) {
                        acc++;
                    }
                    break;
                }
                case QuestionType.Text: {
                    const answer = question.answer;
                    const userAnswer = values[value] as string;
                    if (answer.includes(userAnswer?.trim())) {
                        acc++;
                    }
                    break;
                }
                default:
                    return acc;
            }

            return acc;
        }, 0);

        const questionAnswers = Object.entries(values).map(e => {
            return {
                questionId: e[0],
                answer: e[1],
            } as QuestionAnswer;
        });

        const testResult: TestResult = {
            questionAnswers,
            correctAnswers,
        };

        navigate('/test/result', {
            state: testResult
        })
    }

    const renderQuestions = () => {
        if (!questions || questions.length === 0) {
            return (
                <span className="test-stub">???????????????? ???? ???????????? ???????? ???? ????????????????????</span>
            )
        }

        return (
            <>
                {questions.map((q, i) => (
                    <>
                        <QuestionField
                            key={q.id}
                            index={i + 1}
                            question={q}
                            control={control}
                            register={register}
                        />
                        {i !== questions.length - 1 ? <Divider key={'divider-' + q.id} /> : null}
                    </>
                ))}
                <Button
                    type="submit"
                    className="test-form-submit"
                    colorScheme='teal'
                >
                    ??????????????????
                </Button>
            </>
        );
    }

    return (
        <>
            <ReactRouterPrompt when={!isSubmitting && questions.length !== 0}>
                {({ isActive, onConfirm, onCancel }) =>
                    <Modal
                        isOpen={isActive}
                        closeOnOverlayClick
                        closeOnEsc
                        onClose={() => onCancel(null)}
                        size='lg'
                        isCentered
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalBody className="test-modal">
                                <ModalHeader>???? ?????????????????????????? ???????????? ?????????? ???? ???????????</ModalHeader>
                                <div className='test-modal-buttons'>
                                    <Button
                                        colorScheme='teal'
                                        onClick={onCancel}
                                        w={100}
                                    >
                                        ??????
                                    </Button>
                                    <Button
                                        colorScheme='red'
                                        onClick={onConfirm}
                                        w={100}
                                    >
                                        ????
                                    </Button>
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                }
            </ReactRouterPrompt>
            <div className="test">
                <p className="test-label">
                    {getLabelFromTheme(theme as QuestionTheme)}
                </p>
                <form className="test-form" onSubmit={handleSubmit(onSubmit)}>
                    {renderQuestions()}
                </form>
            </div>
        </>
    );
}