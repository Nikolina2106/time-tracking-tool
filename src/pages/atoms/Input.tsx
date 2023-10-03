import {InputText} from 'primereact/inputtext';
import styled from 'styled-components';
import {ChangeEvent} from 'react';

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledInput = styled(InputText)`
    height: 2.625rem;
    display: flex;
    border-radius: 0.2rem;
    background: var(--White, #fff);
    border: 1px solid #e6e6e6;
    padding: 0 1rem;
`;

const IconWrapper = styled.div`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #5f6b8a;
`;

interface InputProps {
    type?: string;
    icon?: JSX.Element;
    placeholder?: string;
    value?: string | undefined;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputProps): JSX.Element {
    const {type, icon, placeholder, value, onChange} = props;

    return (
        <InputWrapper>
            <StyledInput type={type} value={value} placeholder={placeholder} onChange={onChange} />
            {icon && <IconWrapper>{icon}</IconWrapper>}
        </InputWrapper>
    );
}
