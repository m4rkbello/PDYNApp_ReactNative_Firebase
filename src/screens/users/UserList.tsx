// screens/UserList.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { firestoreService } from '../../services/api/firebaseConfig';

export default function UserList({ navigation }) {
    const [users, setUsers] = useState<any[]>([]);

    const fetchUsers = async () => {
        const data = await firestoreService.getAllDocuments('users');
        setUsers(data);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchUsers);
        return unsubscribe;
    }, [navigation]);

    const renderItem = ({ item }: any) => (
        <View style={styles.item}>
            <Text style={styles.flatList}>{item.name} - {item.email}</Text>
            <Button title="Edit" onPress={() => navigation.navigate('EditUser', { user: item })} />
            <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
        </View>
    );

    const handleDelete = async (id: string) => {
        await firestoreService.deleteDocument('users', id);
        fetchUsers();
    };

    return (
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 5,
    },
    flatList: {
        fontSize: 30,
    }
});
