import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
};

const CustomButton: React.FC<Props> = ({ title, onPress }) => (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    btn: { backgroundColor: '#3498db', padding: 12, borderRadius: 6 },
    text: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
});

export default CustomButton;
