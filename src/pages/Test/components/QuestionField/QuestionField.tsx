import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Checkbox, FormControl, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { MathJax } from "better-react-mathjax";

import { TestFormValues } from "pages/Test/Test";
import { MultipleChoiceQuestion, Question, SingleChoiceQuestion, TextQuestion } from "types/Question";
import { QuestionType } from "types/QuestionType";

import './QuestionField.scss';

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

    return (
        <div className="question-field">
            <p className="question-title">
                {index}. {question.question}
            </p>
            {renderOptions(question)}
        </div>
    );
}