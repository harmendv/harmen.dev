import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { App } from './App'
import { Privacy } from './pages/Privacy'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Main } from './components/layout/Main'

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <StrictMode>
        <BrowserRouter>
            <Header />
            <Main>
                <Routes>
                    <Route index element={<App />}></Route>
                    <Route path="/privacy" element={<Privacy />}></Route>
                </Routes>
            </Main>
            <Footer />
        </BrowserRouter>
    </StrictMode>
);