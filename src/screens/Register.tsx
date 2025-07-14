import React, { useState, useContext } from 'react';
import {
    View, Text, TextInput, Button, Alert, StyleSheet
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { AuthContext } from '../context/AuthContext';

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const authContext = useContext(AuthContext);

    const handleRegister = async () => {
        try {
            await authContext?.register(email, password);
        } catch (error: any) {
            Alert.alert('Registration Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput style={styles.input} onChangeText={setEmail} value={email} />
            <Text>Password</Text>
            <TextInput style={styles.input} onChangeText={setPassword} value={password} secureTextEntry />
            <Button title="Register" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 80 },
    input: { borderWidth: 1, padding: 10, marginVertical: 10 },
});

export default RegisterScreen;
