// screens/EditUser.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { firestoreService } from '../../services/api/firebaseConfig';

export default function EditUser({ route, navigation }) {
    const { user } = route.params;
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleUpdate = async () => {
        try {
            await firestoreService.updateDocument('users', user.id, { name, email });
            Alert.alert('Updated!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <Button title="Update" onPress={handleUpdate} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    input: { marginBottom: 12, borderWidth: 1, borderRadius: 5, padding: 10 }
});
