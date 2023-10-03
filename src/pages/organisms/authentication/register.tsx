import React, {useState} from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {Label} from '../../atoms/Label';
import Input from '../../atoms/Input';
import Layout from '../../templates/Layout';
import ButtonComponent from '../../atoms/Button';
import {register} from '../../../services/authentication.service';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 25rem;
    height: 20rem;
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

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledLabel = styled(Label)`
    font-family: Nunito Sans;
    font-size: 0.9rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.0625rem;
`;

export default function Register(): JSX.Element {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async (): Promise<void> => {
        const userCredential = await register(email, password);
        if (userCredential) {
            router.replace('/organisms/authentication/login');
        }
    };

    return (
        <Layout>
            <Container>
                <FormContainer>
                    <Label>Register</Label>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        icon={<ButtonComponent onClick={() => setShowPassword(!showPassword)} icon="pi pi-eye" iconButton />}
                    />
                    <ButtonComponent label="Register" onClick={() => handleRegister()} fullWidth />
                    <TextContainer>
                        <StyledLabel>
                            Already have an account?{' '}
                            <ButtonComponent onClick={() => router.replace('/organisms/authentication/login')} label="Login" link />
                        </StyledLabel>
                    </TextContainer>
                </FormContainer>
            </Container>
        </Layout>
    );
}
