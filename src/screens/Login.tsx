import React, { useState, useContext } from 'react';
import {
    View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity,
    KeyboardAvoidingView, ScrollView, Platform, Image,
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
            style={{ flex: 1, backgroundColor: 'black' }}  // Black background
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Image
                    source={require('../assets/haha.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.title}>PDYN</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#a2ff00"  // Green placeholder
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#a2ff00"  // Green placeholder
                    secureTextEntry
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>

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
        backgroundColor: 'black',  // Black background
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#a2ff00',  // Green text
    },
    input: {
        borderWidth: 2,
        borderColor: '#a2ff00',  // Green border
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: 'white',  // Black background
        color: 'black',  // Green text
    },
    loginButton: {
        backgroundColor: '#a2ff00',  // Green background
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    loginButtonText: {
        color: 'black',  // Black text
        textAlign: 'center',
        fontWeight: 'bold',
    },
    link: {
        color: '#a2ff00',  // Green text
        marginTop: 24,
        textAlign: 'center',
    },
});

export default Login;