import {createUserWithEmailAndPassword, onAuthStateChanged, UserCredential} from 'firebase/auth';
import {UserImpl} from '@firebase/auth/internal';
import {auth} from '../../firebase';

export async function checkIfLoggedIn(): Promise<UserImpl> {
    return new Promise<UserImpl>((resolve) => {
        onAuthStateChanged(auth, (user) => {
            let currentUser: UserImpl;

            if (!user) {
                currentUser = {} as UserImpl;
            } else {
                currentUser = user as UserImpl;
            }

            resolve(currentUser);
        });
    });
}

export async function register(email: string, password: string): Promise<UserCredential> {
    let userCredential: UserCredential = {} as UserCredential;
    try {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
    }
    return userCredential;
}
