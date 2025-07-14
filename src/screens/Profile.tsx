import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {
    const user = auth().currentUser;

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>👤 Profile</Text>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user?.email || 'N/A'}</Text>
                <Text style={styles.label}>UID:</Text>
                <Text style={styles.value}>{user?.uid || 'N/A'}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 12,
        color: '#555',
    },
    value: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default ProfileScreen;
