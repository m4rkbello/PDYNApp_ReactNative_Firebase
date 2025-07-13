import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Login with Firebase
 */
export const loginUser = (
    email: string,
    password: string
): Promise<FirebaseAuthTypes.UserCredential> => {
    return auth().signInWithEmailAndPassword(email, password);
};

/**
 * Register new user and create Firestore profile
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

export const logoutUser = (): Promise<void> => auth().signOut();
export const getCurrentUser = (): FirebaseAuthTypes.User | null => auth().currentUser;

export { auth, firestore };
