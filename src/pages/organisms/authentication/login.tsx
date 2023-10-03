import React, {useState} from 'react';
import styled from 'styled-components';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';
import {Label} from '../../atoms/Label';
import Input from '../../atoms/Input';
import Layout from '../../templates/Layout';
import ButtonComponent from '../../atoms/Button';
import {app} from '../../../../firebase';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.87rem;
    align-items: center;
    width: 100%;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    height: 18rem;
    flex-shrink: 0;
    fill: var(--White-Lilac, #f9f9fd);
    stroke-width: 0.5px;
    stroke: var(--Whisper, #ecedf5);
    background-color: #f9f9fd;
    align-items: center;
    gap: 1rem;
    padding: 2rem;

    > label {
        padding-bottom: 1rem;
    }
    > Button {
        margin-top: 1rem;
    }
`;

const RegisterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 5.75rem;
    flex-shrink: 0;
    background-color: #f9f9fd;
    gap: 1rem;
`;

const RegisterTextContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledLabel = styled(Label)`
    font-family: Nunito Sans;
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.0625rem;
`;

export default function Login(): JSX.Element {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (): Promise<void> => {
        const auth = getAuth(app);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential) {
                router.replace('/');
            }
        } catch (error) {
            toast.error('error message');
            console.error(error);
        }
    };

    return (
        <Layout>
            <Container>
                <FormContainer>
                    <Label>Login</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        icon={<ButtonComponent onClick={() => setShowPassword(!showPassword)} icon="pi pi-eye" iconButton />}
                    />
                    <ButtonComponent label="Login" onClick={() => handleLogin()} fullWidth />
                </FormContainer>
                <RegisterContainer>
                    <i className="pi pi-user-plus" style={{fontSize: '4rem'}} />
                    <RegisterTextContainer>
                        <StyledLabel>Need an account?</StyledLabel>
                        <ButtonComponent label="Register here" onClick={() => router.replace('/organisms/authentication/register')} link />
                    </RegisterTextContainer>
                </RegisterContainer>
            </Container>
        </Layout>
    );
}
