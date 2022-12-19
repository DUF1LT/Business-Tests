import { useNavigate } from 'react-router-dom';

import { Logo } from 'images/Logo';

import './Header.scss';

export function Header() {
    const navigate = useNavigate()

    return (
        <header className='header'>
            <div className='header-content'>
                <Logo
                    className='header-logo'
                    onClick={() => navigate('/')}
                />
            </div>
        </header>
    );
}