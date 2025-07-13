import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<any, any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            await firestore().collection('users').doc(userCredential.user.uid).set({
                email,
                createdAt: new Date(),
            });
            navigation.replace('Home');
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
