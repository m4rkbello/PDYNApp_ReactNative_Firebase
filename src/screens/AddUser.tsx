import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useFirestore } from '../hooks/UseFirestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { User } from '../types/Users';

type Props = NativeStackScreenProps<RootStackParamList, 'AddUser'>;

const AddUser: React.FC<Props> = ({ navigation }) => {
    const { addItem } = useFirestore('users');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!name.trim()) {
            Alert.alert('Error', 'Please enter a name');
            return false;
        }
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter an email');
            return false;
        }
        if (!age.trim() || isNaN(parseInt(age))) {
            Alert.alert('Error', 'Please enter a valid age');
            return false;
        }
        return true;
    };

    const addUser = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await addItem({
                name: name.trim(),
                email: email.trim().toLowerCase(),
                age: parseInt(age),
            });
            Alert.alert('Success', 'User added successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to add user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.form}>
                    <Text style={styles.title}>➕ Add New User</Text>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput style={styles.input} value={name} onChangeText={setName} />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Age</Text>
                        <TextInput
                            style={styles.input}
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.addButton, loading && styles.disabledButton]}
                            onPress={addUser}
                            disabled={loading}
                        >
                            <Text style={styles.addButtonText}>
                                {loading ? 'Adding...' : 'Add User'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddUser;

const styles = StyleSheet.create({/* ... keep your styles as is ... */ });
