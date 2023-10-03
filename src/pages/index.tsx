import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {GetServerSideProps, GetServerSidePropsResult} from 'next';
import {UserImpl} from '@firebase/auth/internal';
import Layout from './templates/Layout';
import {Label} from './atoms/Label';
import {getCurrentDate} from '../utils/date.utils';
import ButtonComponent from './atoms/Button';
import NewTimerModal from './organisms/NewTimerModal';
import Table from './molecules/Table';
import DeleteConfirmationModal from './molecules/DeleteConfirmationModal';
import {ITimeTracker} from '../domain/ITimeTracker';
import {deleteTracker, getTrackers, updateTracker} from '../services/trackers.service';
import {addTimeTrackerTimeLoggedToHistory} from '../services/trackersHistory.service';
import {checkIfLoggedIn} from '../services/authentication.service';
import Timeout = NodeJS.Timeout;

const Container = styled.div`
    margin: 0 10rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
`;

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
`;

interface ITrackersProps {
    session: UserImpl;
}

export default function Home(props: ITrackersProps): JSX.Element {
    const {session} = props;

    const [trackersState, setTrackersState] = useState<ITimeTracker[]>([]);
    const [newTimerOpen, setNewTimeOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [activeStopWatchId, setActiveStopWatchId] = useState<string>('');

    useEffect(() => {
        let intervalId: Timeout;

        if (activeStopWatchId) {
            intervalId = setInterval(async () => {
                setTrackersState((prevTimeTrackerData) => {
                    return prevTimeTrackerData.map((timeTracker) => {
                        if (timeTracker.id === activeStopWatchId) {
                            updateTracker(activeStopWatchId, timeTracker.timeLogged + 10, timeTracker.description);
                            return {...timeTracker, timeLogged: timeTracker.timeLogged + 10};
                        }
                        return timeTracker;
                    });
                });
            }, 10);
        }

        return () => clearInterval(intervalId);
    }, [activeStopWatchId]);

    async function addTimeLoggedToHistory(tracker: ITimeTracker): Promise<void> {
        await addTimeTrackerTimeLoggedToHistory(tracker, session.uid);
    }

    const handleCloseDeleteModal = (): void => {
        setIsDeleteModalOpen(false);
        setSelectedItemId('');
    };

    const handleDeleteItem = (): void => {
        deleteTracker(selectedItemId);
        setIsDeleteModalOpen(false);
        setSelectedItemId('');
    };

    const handleStartPause = (id: string): void => {
        if (setActiveStopWatchId) {
            if (id === activeStopWatchId) {
                setActiveStopWatchId('');
            } else setActiveStopWatchId(id);
        }
    };

    async function handleStop(id: string): Promise<void> {
        setActiveStopWatchId('');
        const selectedTimeTracker = trackersState.find((timeTracker) => timeTracker.id === id);
        setTrackersState((prevTimeTrackerData) => {
            return prevTimeTrackerData.map((timeTracker) => {
                if (timeTracker === selectedTimeTracker) {
                    return {...timeTracker, timeLogged: 0};
                }
                return timeTracker;
            });
        });
        await addTimeLoggedToHistory(selectedTimeTracker as ITimeTracker);
        selectedTimeTracker?.description && (await updateTracker(id, 0, selectedTimeTracker.description));
    }

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const result = await getTrackers();
            setTrackersState(result);
        };
        fetchData();
    }, []);

    const columns = [
        {field: 'timeLogged', header: 'Time Logged'},
        {field: 'description', header: 'Description'},
    ];

    return (
        <>
            <Layout session={session}>
                <Container>
                    <Label>
                        <i className="pi pi-calendar" style={{fontSize: '1.5rem', paddingRight: '1rem'}} /> Today ({getCurrentDate()})
                    </Label>
                    <ButtonsWrapper>
                        <ButtonComponent icon="pi pi-stopwatch" label="Start new timer" onClick={() => setNewTimeOpen(true)} />
                        <ButtonComponent
                            icon="pi pi-stop-circle"
                            label="Stop all"
                            onClick={() => handleStop(activeStopWatchId)}
                            secondary
                        />
                    </ButtonsWrapper>
                    <Table
                        value={trackersState}
                        columns={columns}
                        editButtonAction={(id: string) => {
                            setNewTimeOpen(true);
                            setIsEdit(true);
                            setSelectedItemId(id);
                        }}
                        deleteButtonAction={(id: string) => {
                            setIsDeleteModalOpen(true);
                            setSelectedItemId(id);
                        }}
                        hasStartStop
                        activeStopWatchId={activeStopWatchId}
                        startPauseButtonAction={(id: string) => handleStartPause(id)}
                        stopButtonAction={(id: string) => handleStop(id)}
                    />
                </Container>
            </Layout>
            <NewTimerModal
                isModalOpen={newTimerOpen}
                setIsModalOpen={setNewTimeOpen}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                selectedItemId={selectedItemId}
                userId={session.uid}
            />
            <DeleteConfirmationModal isModalOpen={isDeleteModalOpen} closeModal={handleCloseDeleteModal} handleSubmit={handleDeleteItem} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (): Promise<GetServerSidePropsResult<ITrackersProps>> => {
    const session = await checkIfLoggedIn();

    if (!session) {
        return {
            redirect: {
                permanent: false,
                destination: '/organisms/authentication/login',
            },
        };
    }

    return {
        props: {
            session,
        },
    };
};
