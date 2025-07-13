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

type Props = NativeStackScreenProps<RootStackParamList, 'EditUser'>;

const EditUser: React.FC<Props> = ({ route, navigation }) => {
    const { updateItem } = useFirestore('users');
    const { user } = route.params;

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [age, setAge] = useState(user.age.toString());
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

    const updateUser = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            await updateItem(user.id!, {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                age: parseInt(age),
            });

            Alert.alert('Success', 'User updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to update user');
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
                    <Text style={styles.title}>✏️ Edit User</Text>

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
                            style={[styles.updateButton, loading && styles.disabledButton]}
                            onPress={updateUser}
                            disabled={loading}
                        >
                            <Text style={styles.updateButtonText}>
                                {loading ? 'Updating...' : 'Update User'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditUser;

const styles = StyleSheet.create({/* ... keep your styles as is ... */ });
