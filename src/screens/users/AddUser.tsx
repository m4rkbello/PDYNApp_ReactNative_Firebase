import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { createUser } from '../../services/api/firebaseConfig';

export default function AddUser({ navigation }) {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [age, setAge] = useState('');
    const [contact_no, setContact] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [work, setWork] = useState('');

    const handlePickImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (!result.didCancel && result.assets?.length) {
            setImageUri(result.assets[0].uri || null);
        }
    };

    const handleAddUser = async () => {
        try {
            let imageUrl = '';

            if (imageUri) {
                const filename = `users/${Date.now()}.jpg`;
                const reference = storage().ref(filename);
                await reference.putFile(imageUri);
                imageUrl = await reference.getDownloadURL();
            }

            await createUser({
                image: imageUrl,
                firstname,
                middlename,
                lastname,
                address,
                age,
                contact_no,
                birthdate,
                work,
            });

            Alert.alert('Success', 'User added!');
            navigation.goBack();
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Button title="Pick Profile Image" onPress={handlePickImage} />
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 100, height: 100, borderRadius: 8, marginVertical: 10 }
                    }
                />
            )}

            <TextInput placeholder="Enter Firstname" value={firstname} onChangeText={setFirstname} style={styles.input} />
            <TextInput placeholder="Enter Middlename" value={middlename} onChangeText={setMiddlename} style={styles.input} />
            <TextInput placeholder="Enter Lastname" value={lastname} onChangeText={setLastname} style={styles.input} />
            <TextInput placeholder="Enter Address" value={address} onChangeText={setAddress} style={styles.input} />
            <TextInput placeholder="Enter Age" value={age} onChangeText={setAge} keyboardType="numeric" style={styles.input} />
            <TextInput placeholder="Enter Contact Number" value={contact_no} onChangeText={setContact} keyboardType="phone-pad" style={styles.input} />
            <TextInput placeholder="Enter Birthdate (YYYY-MM-DD)" value={birthdate} onChangeText={setBirthdate} style={styles.input} />
            <TextInput placeholder="Enter Work" value={work} onChangeText={setWork} style={styles.input} />
            <Button title="Add User" onPress={handleAddUser} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});
