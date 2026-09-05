

import { NavLink } from 'react-router';

export function Header() {
    return (
        <header
            className="container mx-auto max-w-4xl px-6 pb-8 pt-10 sm:px-9 sm:pt-12 flex w-full"
        >
            <NavLink to="/" end
               className="w-fit text-xl font-semibold leading-none text-foreground flex items-center gap-2"
               aria-label="Go to home page" title="Go to home page"><img
                src="/logo.svg" alt="" width="76" height="98"
                className="h-auto w-5" />harmen.dev
            </NavLink>
            <nav aria-label="Primary" className="hidden sm:flex items-center justify-end gap-x-6 text-md text-foreground ml-auto">
                <a href="#open-source">Open Source</a>
            </nav>
        </header>
    );
}