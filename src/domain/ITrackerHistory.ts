import firebase from 'firebase/compat';
import Timestamp = firebase.firestore.Timestamp;

export type ITrackerHistory = {
    id?: string;
    timeTracked: number;
    description: string;
    userId: string;
    date: Timestamp;
};
