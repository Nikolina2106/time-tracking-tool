import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc} from 'firebase/firestore';
import {Nullable} from 'primereact/ts-helpers';
import {db} from '../../firebase';
import {ITimeTracker} from '../domain/ITimeTracker';
import {ITrackerHistory} from '../domain/ITrackerHistory';

export async function getTrackersHistory(
    descriptionSearch: string,
    startAt: Nullable<Date>,
    endAt: Nullable<Date>
): Promise<ITrackerHistory[]> {
    let trackersHistory: ITrackerHistory[] = [];
    try {
        const first = query(collection(db, 'trackersHistory'), orderBy('date', 'desc'));
        const documentSnapshots = await getDocs(first);
        trackersHistory = documentSnapshots.docs.map((doc) => doc.data() as ITrackerHistory);
        if (descriptionSearch.trim() !== '') {
            trackersHistory = trackersHistory.filter((item) => item.description.includes(descriptionSearch.trim()));
        }
        if (startAt) {
            trackersHistory = trackersHistory.filter((item) => item.date.toDate().getDate() >= startAt?.getDate());
        }
        if (endAt) {
            trackersHistory = trackersHistory.filter((item) => item.date.toDate().getDate() <= endAt?.getDate());
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    return trackersHistory;
}

export async function getTrackerHistory(id: string): Promise<ITrackerHistory> {
    let trackerHistory: ITrackerHistory = {} as ITrackerHistory;

    try {
        const docRef = doc(db, 'trackersHistory', id);
        const docSnap = await getDoc(docRef);
        trackerHistory = docSnap.data() as ITrackerHistory;
    } catch (error) {
        console.log(error);
    }

    return trackerHistory;
}

export async function addTimeTrackerTimeLoggedToHistory(tracker: ITimeTracker, userId: string): Promise<void> {
    try {
        const docRef = await addDoc(collection(db, 'trackersHistory'), {
            timeTracked: tracker.timeLogged,
            description: tracker.description,
            userId,
            date: new Date(),
        });
        await updateDoc(docRef, {
            id: docRef.id,
        });
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

export async function deleteTrackerHistory(id: string): Promise<any> {
    try {
        const docRef = doc(db, 'trackersHistory', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

export async function updateTrackerHistory(activeTimeTrackerId: string, description: string): Promise<void> {
    try {
        const queryRef = doc(db, 'trackersHistory', activeTimeTrackerId);
        await updateDoc(queryRef, {
            description,
        });
    } catch (error) {
        console.error('Error updating document:', error);
    }
}
