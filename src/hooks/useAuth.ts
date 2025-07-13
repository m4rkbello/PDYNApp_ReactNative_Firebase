import { useEffect, useState } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

// Remove the extra closing brace at the end
export const useAuth = () => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(setUser);
        return unsubscribe;
    }, []);

    return user;
}; // Remove the extra }; here