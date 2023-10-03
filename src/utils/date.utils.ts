import moment from 'moment';

export const getCurrentDate = (): string => {
    const current = new Date();
    return `${current.getDate()}.${current.getMonth() + 1}.${current.getFullYear()}.`;
};

export const formatDate = (input: string, formatDateTime: string): string => {
    if (!input) {
        return '';
    }

    return `${moment(input).format(formatDateTime)}`;
};

export const getTime = (time: number | undefined): string => {
    if (time) {
        const hours = Math.floor(time / 360000);
        const minutes = Math.floor((time % 360000) / 6000);
        const seconds = Math.floor((time % 6000) / 100);
        const milliseconds = time % 100;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    }
    return '00:00:00:00';
};
