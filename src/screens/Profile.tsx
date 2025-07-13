import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
    const user = auth().currentUser;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>👤 Profile</Text>
            <Text>Email: {user?.email}</Text>
            <Text>UID: {user?.uid}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        marginTop: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ProfileScreen;
