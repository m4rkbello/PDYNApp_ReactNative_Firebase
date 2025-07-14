import React, { useState, useContext } from 'react';
import {
    View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity,
    KeyboardAvoidingView, ScrollView, Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            await authContext?.login(email, password);
        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>PDYN</Text>

                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <Button title="Login" onPress={handleLogin} />

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>No account? Register</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    link: {
        color: 'blue',
        marginTop: 24,
        textAlign: 'center',
    },
});

export default Login;
