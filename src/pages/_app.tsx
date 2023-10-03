import type {AppProps} from 'next/app';
import GlobalStyle from '../styles/global.style';
import 'primeicons/primeicons.css';
import React from 'react';

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}
