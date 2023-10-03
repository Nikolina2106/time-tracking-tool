import {ChangeEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import firebase from 'firebase/compat';
import Modal from '../../molecules/Modal';
import {TextArea} from '../../atoms/TextArea';
import ButtonComponent from '../../atoms/Button';
import {ITrackerHistory} from '../../../domain/ITrackerHistory';
import {getTrackerHistory, updateTrackerHistory} from '../../../services/trackersHistory.service';
import Timestamp = firebase.firestore.Timestamp;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    width: 100%;
    justify-content: flex-end;
    margin-top: 1rem;
`;

interface EditTrackerHistoryModalProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    isModalOpen: boolean;
    selectedItemId: string;
}

export default function EditTrackerHistoryModal(props: EditTrackerHistoryModalProps): JSX.Element {
    const {setIsModalOpen, isModalOpen, selectedItemId} = props;

    const [trackerHistoryItemState, setTrackerHistoryItemState] = useState<ITrackerHistory>({
        timeTracked: 0,
        description: '',
        userId: '',
        date: {seconds: 0, nanoseconds: 0} as Timestamp,
    });

    const handleChange = (name: string, value: string): void => {
        setTrackerHistoryItemState({
            ...trackerHistoryItemState,
            [name]: value,
        });
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await updateTrackerHistory(selectedItemId, trackerHistoryItemState.description);
        setIsModalOpen(false);
    }

    async function fetchTrackersHistory(id: string) {
        const result = await getTrackerHistory(id);
        setTrackerHistoryItemState(result);
    }

    useEffect(() => {
        fetchTrackersHistory(selectedItemId);
    }, [selectedItemId]);

    return (
        <Modal title="Edit description" openModal={isModalOpen} closeModal={() => setIsModalOpen(false)}>
            <TextArea
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.name, e.target.value)}
                value={trackerHistoryItemState.description}
                name="description"
            />
            <ButtonsWrapper>
                <ButtonComponent
                    label="Cancel"
                    onClick={() => {
                        setIsModalOpen(false);
                        setTrackerHistoryItemState({
                            timeTracked: 0,
                            description: '',
                            userId: '',
                            date: {seconds: 0, nanoseconds: 0} as Timestamp,
                        });
                    }}
                    transparent
                />
                <ButtonComponent label="Save" onClick={(e: React.FormEvent) => e && handleSubmit(e)} />
            </ButtonsWrapper>
        </Modal>
    );
}
