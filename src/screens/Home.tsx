import React from 'react';
import { View, Text, Button, StyleSheet, SafeAreaView } from 'react-native';
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
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text style={styles.textData}>
                    Welcome, {auth().currentUser?.email || 'User'}
                </Text>
                <View style={styles.buttonContainer}>
                    <Button title="Logout" onPress={logout} />
                </View>
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
        paddingHorizontal: 20,
    },
    textData: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        width: '100%',
    },
});

export default HomeScreen;
