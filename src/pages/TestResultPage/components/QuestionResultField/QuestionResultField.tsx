import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Checkbox, Input, InputGroup, InputLeftElement, Radio, Stack } from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";

import { MultipleChoiceQuestion, Question, SingleChoiceQuestion, TextQuestion } from "types/Question";
import { QuestionAnswer } from "types/QuestionAnswer";
import { QuestionType } from "types/QuestionType";

import './QuestionResultField.scss';

interface Props {
    index: number;
    question: Question;
    questionAnswer: QuestionAnswer;
}

export function QuestionResultField({
    index,
    question,
    questionAnswer,
}: Props) {
    const renderSingleChoiceOptions = (question: SingleChoiceQuestion, questionAnswer: QuestionAnswer) => {
        const { options, withFormula } = question;

        const getRadioProps = (option: string) => {
            const userAnswer = questionAnswer.answer as string;
            const answer = question.answer;

            if (answer === option && answer === userAnswer) {
                return ({
                    colorScheme: 'green',
                    isChecked: true,
                });
            }

            if (answer === option && answer !== userAnswer) {
                return ({
                    colorScheme: 'red',
                    isChecked: true,
                });
            }

            if (option === userAnswer) {
                return ({
                    isChecked: true,
                });
            }

            return ({
                isChecked: false,
            });

        }

        return (
            <Stack direction="column">
                {options.map(o => (
                    <Radio
                        key={o}
                        value={o}
                        {...getRadioProps(o)}
                    >
                        {withFormula ? <MathJax>{o}</MathJax> : o}
                    </Radio>
                ))}
            </Stack>
        );
    };

    const renderMultipleChoiceOptions = (question: MultipleChoiceQuestion, questionAnswer: QuestionAnswer) => {
        const { options, withFormula } = question;

        const getCheckboxProps = (option: string) => {
            const userAnswers = !Array.isArray(questionAnswer.answer) ? [] : questionAnswer.answer as string[];
            const questionAnswers = question.answer;

            if (questionAnswers.includes(option) && userAnswers.includes(option)) {
                return ({
                    icon: <CheckIcon color='green' />,
                    colorScheme: 'green',
                    isChecked: true,
                });
            }

            if ((!questionAnswers.includes(option) && userAnswers.includes(option)) || (questionAnswers.includes(option) && !userAnswers.includes(option))) {
                return ({
                    icon: <CloseIcon color='red' />,
                    colorScheme: 'red',
                    isChecked: true,
                });
            }

            return ({
                isChecked: false,
            });

        }

        return (
            <Stack direction="column">
                {options.map(o => (
                    <Checkbox
                        key={o}
                        readOnly
                        {...getCheckboxProps(o)}
                    >
                        {withFormula ? <MathJax>{o}</MathJax> : o}
                    </Checkbox>
                ))}
            </Stack>
        )
    };

    const renderText = (question: TextQuestion, questionAnswer: QuestionAnswer) => {
        if (question.answer === questionAnswer.answer as string) {
            return (
                <InputGroup borderColor='green.500' colorScheme='green'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CheckIcon color='green.500' />}
                    />
                    <Input
                        readOnly
                        value={question.answer}
                        color='green.500'
                        colorScheme='green'
                    />
                </InputGroup>
            );
        }

        return (
            <div className="text-correct-and-wrong">
                <InputGroup borderColor='red.500' colorScheme='red'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CloseIcon color='red.500' />}
                    />
                    <Input
                        readOnly
                        value={questionAnswer.answer}
                        color='red.500'
                        colorScheme='red'
                        focusBorderColor="red.500"
                    />
                </InputGroup>
                <InputGroup borderColor='green.500' colorScheme='green'>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<CheckIcon color='green.500' />}
                    />
                    <Input
                        readOnly
                        value={question.answer}
                        color='green.500'
                        colorScheme='green'
                        focusBorderColor="green.500"
                    />
                </InputGroup>
            </div>
        )
    };

    const renderOptions = (question: Question, questionAnswer: QuestionAnswer) => {
        switch (question.type) {
            case QuestionType.SingleChoice:
                return renderSingleChoiceOptions(question, questionAnswer);
            case QuestionType.MultipleChoice:
                return renderMultipleChoiceOptions(question, questionAnswer);
            case QuestionType.Text:
                return renderText(question, questionAnswer);
            default:
                return null;
        }
    };

    return (
        <div className="question-field">
            <p className="question-title">
                {index}. {question.question}
            </p>
            {renderOptions(question, questionAnswer)}
        </div>
    );
}