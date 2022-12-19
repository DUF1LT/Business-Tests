import { Card } from "@chakra-ui/react";
import { getLabelFromTheme } from "helpers/getLabelFromTheme";
import { QuestionTheme } from "types/QuestionTheme";

import './ThemeCard.scss';

interface Props {
    theme: QuestionTheme,
    onClick?: () => void;
}

export function ThemeCard({
    theme,
    onClick,
}: Props) {
    return (
        <Card
            className='theme-card'
            size='md'
            onClick={onClick}
        >
            {getLabelFromTheme(theme)}
        </Card>
    );
}