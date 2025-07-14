// screens/AddUser.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { createUser } from '../../services/api/firebaseConfig';

export default function AddUser({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAdd = async () => {
        try {
            await createUser({ name, email });
            Alert.alert('Success', 'User added!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button title="Add User" onPress={handleAdd} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    input: { marginBottom: 12, borderWidth: 1, borderRadius: 5, padding: 10 }
});
