// services/firebaseConfig.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// 🔐 Authentication functions
export const loginUser = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
};

export const registerUser = async (email: string, password: string) => {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    await firestore().collection('userProfiles').doc(userCredential.user.uid).set({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp()
    });
    return userCredential;
};

export const logoutUser = () => auth().signOut();

// 📝 CRUD service
export const firestoreService = {
    createDocument: async (collection: string, data: any) => {
        const docRef = await firestore().collection(collection).add({
            ...data,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp()
        });
        return docRef.id;
    },
    getAllDocuments: async (collection: string) => {
        const snapshot = await firestore().collection(collection).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getDocument: async (collection: string, id: string) => {
        const doc = await firestore().collection(collection).doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    },
    updateDocument: async (collection: string, id: string, data: any) => {
        await firestore().collection(collection).doc(id).update({
            ...data,
            updatedAt: firestore.FieldValue.serverTimestamp()
        });
    },
    deleteDocument: async (collection: string, id: string) => {
        await firestore().collection(collection).doc(id).delete();
    }
};

// Optional shortcut
export const createUser = (data: { name: string; email: string }) =>
    firestoreService.createDocument('users', data);
