import styled from 'styled-components';
import {Calendar} from 'primereact/calendar';
import {SyntheticEvent} from 'react';
import {FormEvent, Nullable} from 'primereact/ts-helpers';

const InputWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledCalendarInput = styled(Calendar)`
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
    icon?: JSX.Element;
    value?: Nullable<Date>;
    onChange: (event: FormEvent<Date, SyntheticEvent<Element, Event>>) => void;
}

export default function Input(props: InputProps): JSX.Element {
    const {icon, value, onChange} = props;

    return (
        <InputWrapper>
            <StyledCalendarInput
                value={value}
                onChange={onChange}
                dateFormat="dd.mm.yy."
                panelStyle={{backgroundColor: 'white', boxShadow: '1px 1px 1px 1px #e4e8ee'}}
            />
            {icon && <IconWrapper>{icon}</IconWrapper>}
        </InputWrapper>
    );
}
