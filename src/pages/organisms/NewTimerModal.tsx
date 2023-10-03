import {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import Modal from '../molecules/Modal';
import {TextArea} from '../atoms/TextArea';
import ButtonComponent from '../atoms/Button';
import {ITimeTracker} from '../../domain/ITimeTracker';
import {createNewTimeTracker, getTracker, updateTracker} from '../../services/trackers.service';

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    justify-content: flex-end;
    margin-top: 1rem;
`;

interface NewTimerModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    isModalOpen: boolean;
    setIsEdit: (isEdit: boolean) => void;
    isEdit: boolean;
    selectedItemId: string;
    userId: string;
}

export default function NewTimerModal(props: NewTimerModalProps): JSX.Element {
    const {setIsModalOpen, isModalOpen, setIsEdit, isEdit, selectedItemId, userId} = props;

    const [timeTrackerState, setTimeTrackerState] = useState<ITimeTracker>({timeLogged: 0, description: '', userId: ''});

    const handleChange = (name: string, value: string): void => {
        setTimeTrackerState({
            ...timeTrackerState,
            [name]: value,
        });
    };

    async function fetchTracker(id: string): Promise<void> {
        const result = await getTracker(id);
        setTimeTrackerState(result);
    }

    useEffect(() => {
        if (isEdit) {
            fetchTracker(selectedItemId);
        }
    }, [selectedItemId, isEdit]);

    async function handleSubmit(e: React.FormEvent): Promise<void> {
        e.preventDefault();
        if (isEdit) {
            await updateTracker(selectedItemId, timeTrackerState.timeLogged, timeTrackerState.description);
        } else {
            await createNewTimeTracker(timeTrackerState.description, userId);
        }
        setIsModalOpen(false);
    }

    const handleClose = (): void => {
        setIsModalOpen(false);
        setIsEdit(false);
    };

    return (
        <Modal title="Create new timer" openModal={isModalOpen} closeModal={handleClose}>
            <TextArea
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.name, e.target.value)}
                value={timeTrackerState.description}
                name="description"
            />
            <ButtonsWrapper>
                <ButtonComponent
                    label="Cancel"
                    onClick={() => {
                        setIsModalOpen(false);
                        setTimeTrackerState({timeLogged: 0, description: '', userId: ''});
                    }}
                    transparent
                />
                <ButtonComponent label="Save" onClick={(e: React.FormEvent) => e && handleSubmit(e)} />
            </ButtonsWrapper>
        </Modal>
    );
}
