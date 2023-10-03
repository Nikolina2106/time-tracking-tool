import {Column} from 'primereact/column';
import React from 'react';
import styled from 'styled-components';
import {DataTable} from 'primereact/datatable';
import ButtonComponent from '../atoms/Button';
import {formatDate, getTime} from '../../utils/date.utils';
import {ITimeTracker} from '../../domain/ITimeTracker';
import {ITrackerHistory} from '../../domain/ITrackerHistory';

const StyledTable = styled(DataTable)`
    .p-datatable-wrapper {
        overflow: hidden;
        padding-bottom: 2rem;
        color: #5f6b8a;
    }

    .p-datatable-tbody {
        padding: 4rem;

        > tr {
            height: 3rem;
            display: table-row;

            > td {
                vertical-align: middle;
                display: table-cell;
                padding-left: 1rem;
            }

            border-top: 1px solid #e8e8e8;
        }
    }

    .p-datatable-thead {
        background-color: #f9f9fd;
        color: #0c0d25;
        height: 4rem;

        > tr {
            display: table-row;

            > th {
                vertical-align: middle;
                display: table-cell;
                padding-left: 1rem;

                > div {
                    > span {
                        font-weight: 800;
                    }
                }
            }
        }
    }

    .p-paginator-bottom {
        gap: 1rem;
    }

    .p-paginator-pages {
        display: flex;
        gap: 1rem;
    }

    .p-dropdown {
        display: flex;
        gap: 0.5rem;
        border: 1px solid #e8e8e8;
        padding: 0.4rem;
        border-radius: 0.2rem;
    }

    .p-highlight {
        min-width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-color: #e5e5ee;
        color: black;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.7rem;
`;

interface TableProps {
    value: ITimeTracker[] | ITrackerHistory[];
    columns: {field: string; header: string}[];
    editButtonAction: (id: string) => void;
    deleteButtonAction: (id: string) => void;
    startPauseButtonAction?: (id: string) => void;
    stopButtonAction?: (id: string) => void;
    hasStartStop?: boolean;
    activeStopWatchId?: string;
}

export default function Table(props: TableProps): JSX.Element {
    const {
        value,
        columns,
        editButtonAction,
        deleteButtonAction,
        startPauseButtonAction,
        stopButtonAction,
        activeStopWatchId,
        hasStartStop,
    } = props;

    const actionButtons = (data: any) => {
        const {id} = data;

        return (
            <ButtonWrapper>
                {hasStartStop && (
                    <>
                        <ButtonComponent
                            icon={activeStopWatchId && activeStopWatchId === id ? 'pi pi-pause' : 'pi pi-play'}
                            primary
                            iconButton
                            onClick={() => startPauseButtonAction && startPauseButtonAction(id)}
                        />
                        <ButtonComponent
                            icon="pi pi-stop-circle"
                            primary
                            iconButton
                            onClick={() => stopButtonAction && stopButtonAction(id)}
                        />
                    </>
                )}
                <ButtonComponent icon="pi pi-pencil" iconButton onClick={() => editButtonAction(id)} />
                <ButtonComponent icon="pi pi-trash" iconButton onClick={() => deleteButtonAction(id)} />
            </ButtonWrapper>
        );
    };

    return (
        <StyledTable editMode="row" value={value} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}>
            {columns.map((column, index) => (
                <Column
                    field={column.field}
                    header={column.header}
                    key={index}
                    body={(rowData) => {
                        if (column.field === 'timeLogged') {
                            return getTime(rowData.timeLogged);
                        }
                        if (column.field === 'timeTracked') {
                            return getTime(rowData.timeTracked);
                        }
                        if (column.field === 'date') {
                            return formatDate(rowData.date.toDate(), 'DD.MM.YYYY.');
                        }
                        return rowData[column.field];
                    }}
                />
            ))}
            <Column header="Actions" body={actionButtons} />
        </StyledTable>
    );
}
