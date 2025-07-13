
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

type Props = {
    onLogout: () => void;
    email?: string;
};

const Navbar: React.FC<Props> = ({ onLogout, email }) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.title}>🏠 Home</Text>
            <Text style={styles.email}>{email}</Text>
            <TouchableOpacity onPress={onLogout}>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    email: {
        color: '#fff',
        fontSize: 14,
        flex: 1,
        textAlign: 'center',
    },
    logout: {
        color: '#fff',
        fontSize: 14,
    },
});

export default Navbar;
