// hooks/useFirestore.ts
import { useState, useEffect } from 'react';
import { FirebaseService } from '../services/FirebaseService';
import { User } from '../types/Users';

export const useFirestore = (collection: string) => {
    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const service = new FirebaseService<User>(collection);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await service.getAll();
            setData(result);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (item: Omit<User, 'id'>) => {
        try {
            const id = await service.create(item);
            fetchData();
            return id;
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const updateItem = async (id: string, item: Partial<User>) => {
        try {
            await service.update(id, item);
            fetchData();
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    const deleteItem = async (id: string) => {
        try {
            await service.delete(id);
            fetchData();
        } catch (err: any) {
            setError(err.message);
            throw err;
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        data,
        loading,
        error,
        fetchData,
        addItem,
        updateItem,
        deleteItem,
    };
};
