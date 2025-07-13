// services/FirebaseService.ts
import firestore from '@react-native-firebase/firestore';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { User } from '../types/Users';
import auth from '@react-native-firebase/auth';

export class FirebaseService<T extends { id?: string }> {
    private collectionRef: FirebaseFirestoreTypes.CollectionReference;

    constructor(collection: string) {
        this.collectionRef = firestore().collection(collection);
    }

    async create(data: Omit<T, 'id'>): Promise<string> {
        const uid = auth().currentUser?.uid;
        if (!uid) throw new Error('User not authenticated');

        await this.collectionRef.doc(uid).set({
            ...data,
            createdAt: firestore.FieldValue.serverTimestamp(),
        });

        return uid;
    }

    async getAll(): Promise<T[]> {
        const snapshot = await this.collectionRef.orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as T),
        }));
    }

    async getById(id: string): Promise<T | null> {
        const doc = await this.collectionRef.doc(id).get();
        return doc.exists ? { id: doc.id, ...(doc.data() as T) } : null;
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await this.collectionRef.doc(id).update({
            ...data,
            updatedAt: firestore.FieldValue.serverTimestamp(),
        });
    }

    async delete(id: string): Promise<void> {
        await this.collectionRef.doc(id).delete();
    }

    onSnapshot(callback: (data: T[]) => void) {
        return this.collectionRef.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as T),
            }));
            callback(data);
        });
    }
}
