// screens/UsersScreen.tsx
import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useFirestore } from '../hooks/UseFirestore';
import { User } from '../types/Users';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Users'>;

const UsersScreen: React.FC<Props> = ({ navigation }) => {
    const { data: users, loading, error, deleteItem } = useFirestore('users');

    const confirmDelete = (id: string) => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this user?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => deleteItem(id) },
        ]);
    };

    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('EditUser', { user: item })}
            onLongPress={() => confirmDelete(item.id!)}
        >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
        </TouchableOpacity>
    );

    if (loading) return <ActivityIndicator size="large" color="#3498db" />;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 All Users</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id!}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default UsersScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    list: { gap: 12 },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    name: { fontSize: 18, fontWeight: 'bold' },
    email: { fontSize: 14, color: '#666' },
});
