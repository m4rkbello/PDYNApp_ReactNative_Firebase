export interface User {
    id?: string;
    name: string;
    email: string;
    age: number;
    createdAt?: FirebaseFirestoreTypes.Timestamp;
    updatedAt?: FirebaseFirestoreTypes.Timestamp;
}
