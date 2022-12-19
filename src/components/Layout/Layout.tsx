import { Outlet } from "react-router-dom";

import { Header } from "../Header";

import './Layout.scss';

export function Layout() {
    return (
        <>
            <Header />
            <main className='main'>
                <Outlet />
            </main>

        </>
    );
}