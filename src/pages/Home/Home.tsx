import { useNavigate } from "react-router-dom";

import { ThemeCard } from "components/ThemeCard";
import { QuestionTheme } from "types/QuestionTheme";

import './Home.scss';

const themes: QuestionTheme[] = [
    QuestionTheme.OrganizationalLegalForms,
    QuestionTheme.Amortization,
    QuestionTheme.FixedCapital,
    QuestionTheme.WorkingCapital,
    QuestionTheme.Profitability,
    QuestionTheme.All,
];

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <p className="home-title">
                Темы
            </p>
            <div className="home-themes">
                {themes.map(t => (
                    <ThemeCard
                        key={t}
                        theme={t}
                        onClick={() => navigate('test/' + t)}
                    />
                ))}
            </div>
        </div>
    );
}