import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { loginUser } from '../services/firebaseConfig';
import { AuthContext } from '../context/AuthContext'; // ✅ import context

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

const Login: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext); // ✅ get setUser

    const handleLogin = async () => {
        try {
            const userCredential = await loginUser(email, password);
            setUser(userCredential.user); // ✅ save user to context
            // No need to call navigation.replace('Home') anymore
        } catch (error: any) {
            Alert.alert('Login Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 80 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 6,
        marginVertical: 10,
    },
    link: { color: 'blue', marginTop: 20, textAlign: 'center' },
});

export default Login;
