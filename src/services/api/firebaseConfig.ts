// services/firebaseConfig.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Authentication functions
export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        return userCredential;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const registerUser = async (email: string, password: string) => {
    try {
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);

        // Create user profile document in Firestore
        await firestore().collection('userProfiles').doc(userCredential.user.uid).set({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            createdAt: firestore.FieldValue.serverTimestamp(),
            updatedAt: firestore.FieldValue.serverTimestamp()
        });

        return userCredential;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const logoutUser = async () => {
    try {
        await auth().signOut();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

// Firestore CRUD operations
export const firestoreService = {
    // Create
    async createDocument(collection: string, data: any) {
        try {
            const docRef = await firestore().collection(collection).add({
                ...data,
                createdAt: firestore.FieldValue.serverTimestamp(),
                updatedAt: firestore.FieldValue.serverTimestamp()
            });
            return docRef.id;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },

    // Read all documents
    async getAllDocuments(collection: string) {
        try {
            const snapshot = await firestore().collection(collection).get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error: any) {
            throw new Error(error.message);
        }
    },

    // Read single document
    async getDocument(collection: string, id: string) {
        try {
            const doc = await firestore().collection(collection).doc(id).get();
            if (doc.exists) {
                return { id: doc.id, ...doc.data() };
            }
            return null;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },

    // Update
    async updateDocument(collection: string, id: string, data: any) {
        try {
            await firestore().collection(collection).doc(id).update({
                ...data,
                updatedAt: firestore.FieldValue.serverTimestamp()
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    },

    // Delete
    async deleteDocument(collection: string, id: string) {
        try {
            await firestore().collection(collection).doc(id).delete();
        } catch (error: any) {
            throw new Error(error.message);
        }
    },

    // Real-time listener
    subscribeToCollection(collection: string, callback: (data: any[]) => void) {
        return firestore()
            .collection(collection)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                (snapshot) => {
                    const documents = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    callback(documents);
                },
                (error) => {
                    console.error('Firestore subscription error:', error);
                }
            );
    }
};