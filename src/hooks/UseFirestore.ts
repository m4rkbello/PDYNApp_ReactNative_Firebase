// hooks/useFirestore.ts
import { useState, useEffect, useCallback } from 'react';
import { FirebaseService } from '../services/api/FirebaseService';

interface UseFirestoreReturn<T> {
    data: T[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    create: (item: Omit<T, 'id'>) => Promise<string>;
    update: (id: string, updates: Partial<T>) => Promise<void>;
    remove: (id: string) => Promise<void>;
    getById: (id: string) => Promise<T | null>;
}

export function useFirestore<T extends { id?: string }>(
    collectionName: string,
    realtime = true
): UseFirestoreReturn<T> {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const documents = await FirebaseService.getAllDocuments(collectionName);
            setData(documents as T[]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [collectionName]);

    useEffect(() => {
        if (realtime) {
            // Set up real-time listener
            const unsubscribe = firestoreService.subscribeToCollection(
                collectionName,
                (documents) => {
                    setData(documents as T[]);
                    setLoading(false);
                    setError(null);
                }
            );

            return unsubscribe;
        } else {
            // Fetch data once
            refresh();
        }
    }, [collectionName, realtime, refresh]);

    const create = async (item: Omit<T, 'id'>): Promise<string> => {
        try {
            const docId = await firestoreService.createDocument(collectionName, item);
            if (!realtime) {
                await refresh();
            }
            return docId;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const update = async (id: string, updates: Partial<T>): Promise<void> => {
        try {
            await firestoreService.updateDocument(collectionName, id, updates);
            if (!realtime) {
                await refresh();
            }
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const remove = async (id: string): Promise<void> => {
        try {
            await firestoreService.deleteDocument(collectionName, id);
            if (!realtime) {
                await refresh();
            }
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const getById = async (id: string): Promise<T | null> => {
        try {
            return await firestoreService.getDocument(collectionName, id) as T | null;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    return {
        data,
        loading,
        error,
        refresh,
        create,
        update,
        remove,
        getById,
    };
}