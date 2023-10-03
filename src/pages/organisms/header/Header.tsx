import React from 'react';
import {Menubar} from 'primereact/menubar';
import styled from 'styled-components';
import {signOut} from 'firebase/auth';
import {MenuItem} from 'primereact/menuitem';
import {useRouter} from 'next/router';
import {UserImpl} from '@firebase/auth/internal';
import {auth} from '../../../../firebase';

const StyledHeader = styled(Menubar)`
    height: 7rem;
    border-radius: 0 0 1.375rem 1.375rem;
    background-color: #181846;
    color: lightgray;
    > ul {
        position: absolute;
        right: 40px;
        gap: 2rem;

        > li {
            height: 7rem;
            display: flex;
            color: white;

            > a {
                color: white;
                vertical-align: center;
                gap: 0.3rem;
            }
        }
    }
`;

interface HeaderProps {
    session: UserImpl | undefined;
}

export default function Header(props: HeaderProps): JSX.Element {
    const {session} = props;
    const loggedIn = !!session;

    const router = useRouter();

    const handleLogout = async (): Promise<void> => {
        try {
            await signOut(auth);
            router.replace('/organisms/authentication/login');
        } catch (error) {
            console.error(error);
        }
    };

    let navItems: MenuItem[] = [];

    if (loggedIn) {
        navItems = [
            {
                label: 'Trackers',
                icon: 'pi pi-clock',
                command: () => router.replace('/'),
            },
            {
                label: 'History',
                icon: 'pi pi-history',
                command: () => router.replace('/organisms/history/trackers-history'),
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-user',
                command: () => handleLogout(),
            },
        ];
    }

    return <StyledHeader model={navItems} />;
}
