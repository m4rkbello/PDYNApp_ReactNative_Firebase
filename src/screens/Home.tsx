import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<any, any>;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const logout = () => {
        auth().signOut().then(() => navigation.replace('Login'));
    };

    return (
        <View style={styles.container}>
            <Text>Welcome, {auth().currentUser?.email}</Text>
            <Button title="Logout" onPress={logout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, marginTop: 80 },
});

export default HomeScreen;
