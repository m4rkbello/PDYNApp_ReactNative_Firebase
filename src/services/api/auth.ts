import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Login with Firebase Auth
 * @param email string
 * @param password string
 */
export const loginUser = (
    email: string,
    password: string
): Promise<FirebaseAuthTypes.UserCredential> => {
    return auth().signInWithEmailAndPassword(email, password);
};

/**
 * Register a new user in Firebase Auth + Firestore
 * @param email string
 * @param password string
 */
export const registerUser = async (
    email: string,
    password: string
): Promise<FirebaseAuthTypes.UserCredential> => {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);

    await firestore().collection('users').doc(userCredential.user.uid).set({
        email,
        createdAt: firestore.FieldValue.serverTimestamp(),
    });

    return userCredential;
};
