import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyAziIh01l-9n6nUor-vwEasDDNJwNlJlDU',
    authDomain: 'tracking-time-tool.firebaseapp.com',
    projectId: 'tracking-time-tool',
    storageBucket: 'tracking-time-tool.appspot.com',
    messagingSenderId: '11367779286',
    appId: '1:11367779286:web:c1a729e5a943398cb8b277',
    measurementId: 'G-N0RDHZG6Z5',
    services: {
        auth: true,
    },
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
