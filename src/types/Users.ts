// types/User.ts
export interface User {
    id?: string;
    name: string;
    email: string;
    age: number;
    createdAt?: any;
    updatedAt?: any;
}

// types/navigation.ts
export type RootStackParamList = {
    // Auth screens
    Login: undefined;
    Register: undefined;

    // Main app screens
    MainDrawer: undefined;
    Home: undefined;
    Profile: undefined;
    Users: undefined;

    // User CRUD screens
    AddUser: undefined;
    EditUser: { user: User };
    ViewUser: { userId: string };
};

export type DrawerParamList = {
    Home: undefined;
    Profile: undefined;
    Users: undefined;
};

// types/auth.ts
export interface AuthUser {
    uid: string;
    email: string | null;
    displayName?: string | null;
}

// types/firestore.ts
export interface FirestoreTimestamp {
    seconds: number;
    nanoseconds: number;
}

export interface BaseDocument {
    id?: string;
    createdAt?: FirestoreTimestamp;
    updatedAt?: FirestoreTimestamp;
}