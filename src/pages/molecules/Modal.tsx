import React, {MutableRefObject, PropsWithChildren, useRef} from 'react';
import styled from 'styled-components';
import {useOnClickOutside} from '../../hooks/useOnClickOutside';
import ButtonComponent from '../atoms/Button';

const StyledModal = styled.div`
    display: inline-flex;
    padding: 1.5rem 2rem 2rem 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 0.5rem;
    border-radius: 0.25rem;
    background: white;
    box-shadow: 0 4px 8px 0 rgba(96, 97, 112, 0.16), 0 0 2px 0 rgba(40, 41, 61, 0.04);
`;

const ModalOverlay = styled.div<{$isOpen?: boolean}>`
    background: rgba(13, 21, 33, 0.7);
    justify-content: center;
    margin-left: 0;
    width: 100%;
    align-items: center;
    display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 6000;
    outline: none;
`;

const ModalBody = styled.div`
    display: flex;
    width: 36.5625rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const ModalTitle = styled.h2`
    color: black;
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.625rem;
    letter-spacing: 0.00625rem;
`;

interface IModal {
    title: string;
    openModal: boolean;
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal(props: PropsWithChildren<IModal>): JSX.Element {
    const {title, openModal = false, closeModal, children} = props;

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => {
        if (openModal && ref.current) {
            closeModal(false);
        }
    });

    return (
        <ModalOverlay $isOpen={openModal}>
            <StyledModal ref={ref as MutableRefObject<HTMLDivElement>}>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <ButtonComponent icon="pi pi-times" onClick={() => closeModal(false)} iconButton />
                </ModalHeader>
                <ModalBody>{children}</ModalBody>
            </StyledModal>
        </ModalOverlay>
    );
}
