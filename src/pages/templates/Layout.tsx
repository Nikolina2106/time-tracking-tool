import React, {PropsWithChildren} from 'react';
import styled from 'styled-components';
import {UserImpl} from '@firebase/auth/internal';
import Header from '../organisms/header/Header';

const StyledBody = styled.div`
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
    line-height: 1;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: Avenir Next LT Pro, sans-serif;
    font-size: 1rem;
    letter-spacing: 0;
    color: #282b2e;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    background-color: white;
`;

const Body = styled.main`
    position: relative;
    width: 100%;
    transition: all 0.4s;
    @media (max-width: 1023px) {
        width: 100%;
        left: 0;
    }
    height: 100%;
`;

const StyledChildren = styled.div`
    height: 100%;
    margin-top: 56px;
    padding: 2rem 2.5rem;
    display: flex;
`;

interface LayoutProps {
    session?: UserImpl;
}
export default function Layout({session, children}: PropsWithChildren<LayoutProps>): JSX.Element {
    return (
        <>
            <StyledBody>
                <Body>
                    <Header session={session} />
                    <StyledChildren>{children}</StyledChildren>
                </Body>
            </StyledBody>
        </>
    );
}
