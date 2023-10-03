import styled from 'styled-components';
import Modal from './Modal';
import ButtonComponent from '../atoms/Button';

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    justify-content: flex-end;
    margin-top: 1rem;
`;

interface DeleteConfirmationModalProps {
    isModalOpen: boolean;
    closeModal: () => void;
    handleSubmit: (e: React.FormEvent) => void;
}

export default function DeleteConfirmationModal(props: DeleteConfirmationModalProps): JSX.Element {
    const {isModalOpen, closeModal, handleSubmit} = props;

    return (
        <Modal title="Are you sure you want to delete this item?" openModal={isModalOpen} closeModal={closeModal}>
            <ButtonsWrapper>
                <ButtonComponent label="Cancel" onClick={closeModal} transparent />
                <ButtonComponent label="Save" onClick={(e: React.FormEvent) => e && handleSubmit(e)} />
            </ButtonsWrapper>
        </Modal>
    );
}
