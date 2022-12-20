import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Checkbox, FormControl, Input, Radio, RadioGroup, Stack, Tooltip } from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";

import { TestFormValues } from "pages/Test/Test";
import { MultipleChoiceQuestion, Question, SingleChoiceQuestion, TextQuestion } from "types/Question";
import { QuestionType } from "types/QuestionType";

import './QuestionField.scss';
import { QuestionOutlineIcon } from "@chakra-ui/icons";

interface Props {
    index: number;
    question: Question;
    control: Control<TestFormValues>;
    register: UseFormRegister<TestFormValues>;
}

export function QuestionField({
    index,
    question,
    control,
    register,
}: Props) {
    const renderSingleChoiceOptions = (question: SingleChoiceQuestion) => {
        const { id, options, withFormula } = question;

        return (
            <Controller
                name={id}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <RadioGroup onChange={onChange} value={value as string}>
                        <Stack direction="column">
                            {options.map(o => (
                                <Radio
                                    key={o}
                                    value={o}
                                >
                                    {withFormula ? <MathJax>{o}</MathJax> : o}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                )}
            />
        )
    };

    const renderMultipleChoiceOptions = (question: MultipleChoiceQuestion) => {
        const { id, options, withFormula } = question;

        return (
            <FormControl>
                <Stack direction="column">
                    {options.map(o => (
                        <Checkbox
                            key={o}
                            value={o}
                            {...register(id)}
                        >
                            {withFormula ? <MathJax>{o}</MathJax> : o}
                        </Checkbox>
                    ))}
                </Stack>
            </FormControl>
        )
    };

    const renderText = (question: TextQuestion) => {
        const { id } = question;

        return (
            <Input {...register(id)} />
        )
    };

    const renderOptions = (question: Question) => {
        switch (question.type) {
            case QuestionType.SingleChoice:
                return renderSingleChoiceOptions(question);
            case QuestionType.MultipleChoice:
                return renderMultipleChoiceOptions(question);
            case QuestionType.Text:
                return renderText(question);
            default:
                return null;
        }
    };

    const renderTip = () => {
        if (question.type === QuestionType.Text) {
            return (
                <Tooltip
                    label='Пример ответа на текстовый вопрос:  "24.56 10200.20 123.45"'
                    color='teal'
                    bg='white'
                    placement='top-end'
                    width='72'
                >
                    <QuestionOutlineIcon />
                </Tooltip >
            )
        }
    }

    return (
        <div className="question-field">
            <div className="question-header">
                {renderTip()}
                <p className="question-title">
                    {index}. {question.question}
                </p>
            </div>
            {renderOptions(question)}
        </div>
    );
}