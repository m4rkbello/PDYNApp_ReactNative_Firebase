import React, { createContext, useState, ReactNode } from 'react';

type AuthContextType = {
    user: any;
    setUser: (user: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
