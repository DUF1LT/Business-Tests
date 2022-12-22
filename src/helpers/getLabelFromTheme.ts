import { QuestionTheme } from "types/QuestionTheme";

const themeToLabel: Record<QuestionTheme, string> = {
    [QuestionTheme.OrganizationalLegalForms]: 'Организационно-правовые формы',
    [QuestionTheme.Amortization]: 'Амортизация',
    [QuestionTheme.ProfitProfitabilityCost]: 'Прибыль, Рентабельность, Себестоимость',
    [QuestionTheme.FixedCapital]: 'Основные средства',
    [QuestionTheme.WorkingCapital]: 'Оборотные средства',
    [QuestionTheme.All]: 'Все темы',
};

export const getLabelFromTheme = (theme: QuestionTheme) => themeToLabel[theme] ?? 'Все темы';