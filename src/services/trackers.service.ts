import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc} from 'firebase/firestore';
import {ITimeTracker} from '../domain/ITimeTracker';
import {db} from '../../firebase';

export async function getTrackers(): Promise<ITimeTracker[]> {
    let trackers: ITimeTracker[] = [];

    try {
        const queryRef = query(collection(db, 'trackers'), orderBy('createdAt', 'desc'));
        const documentSnapshots = await getDocs(queryRef);
        trackers = documentSnapshots.docs.map((doc) => doc.data() as ITimeTracker);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return trackers;
}

export async function getTracker(id: string): Promise<ITimeTracker> {
    let tracker: ITimeTracker = {} as ITimeTracker;

    try {
        const docRef = doc(db, 'trackers', id);
        const docSnap = await getDoc(docRef);
        tracker = docSnap.data() as ITimeTracker;
    } catch (error) {
        console.log(error);
    }

    return tracker;
}

export async function updateTracker(activeTimeTrackerId: string, timeLogged: number, description: string): Promise<void> {
    try {
        const queryRef = doc(db, 'trackers', activeTimeTrackerId);
        await updateDoc(queryRef, {
            timeLogged,
            description,
        });
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

export async function deleteTracker(id: string): Promise<any> {
    try {
        const docRef = doc(db, 'trackers', id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting document:', error);
    }
}

export async function createNewTimeTracker(description: string, userId: string): Promise<void> {
    try {
        const docRef = await addDoc(collection(db, 'trackers'), {
            timeLogged: 0,
            description,
            userId,
            createdAt: new Date(),
        });
        await updateDoc(docRef, {
            id: docRef.id,
        });
    } catch (error) {
        console.error('Error creating document:', error);
    }
}
