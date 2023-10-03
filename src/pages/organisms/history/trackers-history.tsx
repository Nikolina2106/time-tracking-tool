import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Nullable} from 'primereact/ts-helpers';
import {GetServerSideProps, GetServerSidePropsResult} from 'next';
import {UserImpl} from '@firebase/auth/internal';
import Layout from '../../templates/Layout';
import Table from '../../molecules/Table';
import DeleteConfirmationModal from '../../molecules/DeleteConfirmationModal';
import EditTrackerHistoryModal from './EditTrackerHistoryModal';
import {Label} from '../../atoms/Label';
import Input from '../../atoms/Input';
import CalendarInput from '../../atoms/CalendarInput';
import {ITrackerHistory} from '../../../domain/ITrackerHistory';
import {deleteTrackerHistory, getTrackersHistory} from '../../../services/trackersHistory.service';
import {checkIfLoggedIn} from '../../../services/authentication.service';

const Container = styled.div`
    margin: 0 10rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    width: 100%;
`;

const FilterContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #f9f9fd;
    justify-content: center;
    gap: 1rem;
`;

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`;

const StyledLabel = styled(Label)`
    color: var(--Lynch, #5f6b8a);
    font-family: Roboto;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.0625rem;
`;

interface ITrackerHistoryProps {
    session: UserImpl;
}

export default function TrackersHistory(props: ITrackerHistoryProps): JSX.Element {
    const {session} = props;

    const [trackersHistory, setTrackersHistory] = useState<ITrackerHistory[]>([]);
    const [selectedItemId, setSelectedItemId] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [descriptionSearch, setDescriptionSearch] = useState('');
    const [startAt, setStartAt] = useState<Nullable<Date>>(null);
    const [endAt, setEndAt] = useState<Nullable<Date>>(null);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const result = await getTrackersHistory(descriptionSearch, startAt, endAt);
            setTrackersHistory(result);
        };
        fetchData();
    }, [descriptionSearch, startAt, endAt, session.uid]);

    const handleCloseDeleteModal = (): void => {
        setIsDeleteModalOpen(false);
        setSelectedItemId('');
    };

    const handleDeleteItem = (): void => {
        deleteTrackerHistory(selectedItemId);
        setIsDeleteModalOpen(false);
        setSelectedItemId('');
    };

    const columns = [
        {field: 'date', header: 'Date'},
        {field: 'description', header: 'Description'},
        {field: 'timeTracked', header: 'Time tracked'},
    ];

    return (
        <>
            <Layout session={session}>
                <Container>
                    <FilterContainer>
                        <FilterWrapper>
                            <StyledLabel>Start date</StyledLabel>
                            <CalendarInput
                                value={startAt}
                                onChange={(e: any) => setStartAt(e.value)}
                                icon={<i className="pi pi-calendar" />}
                            />
                        </FilterWrapper>
                        <FilterWrapper>
                            <StyledLabel>End date</StyledLabel>
                            <CalendarInput value={endAt} onChange={(e: any) => setEndAt(e.value)} icon={<i className="pi pi-calendar" />} />
                        </FilterWrapper>
                        <FilterWrapper>
                            <StyledLabel>Description include</StyledLabel>
                            <Input
                                value={descriptionSearch}
                                onChange={(e) => setDescriptionSearch(e.target.value)}
                                icon={<i className="pi pi-times" />}
                            />
                        </FilterWrapper>
                    </FilterContainer>
                    <Table
                        value={trackersHistory}
                        columns={columns}
                        editButtonAction={(id: string) => {
                            setIsEditModalOpen(true);
                            setSelectedItemId(id);
                        }}
                        deleteButtonAction={(id: string) => {
                            setIsDeleteModalOpen(true);
                            setSelectedItemId(id);
                        }}
                    />
                </Container>
            </Layout>
            <EditTrackerHistoryModal setIsModalOpen={setIsEditModalOpen} isModalOpen={isEditModalOpen} selectedItemId={selectedItemId} />
            <DeleteConfirmationModal isModalOpen={isDeleteModalOpen} closeModal={handleCloseDeleteModal} handleSubmit={handleDeleteItem} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (): Promise<GetServerSidePropsResult<ITrackerHistoryProps>> => {
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
