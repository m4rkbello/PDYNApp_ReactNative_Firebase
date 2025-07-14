// AppNavigator.tsx

import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import UserListScreen from '../screens/users/UserList';
import AddUserScreen from '../screens/users/AddUser';
import EditUserScreen from '../screens/users/EditUser';

import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="User List" component={UserListScreen} />
            <Drawer.Screen name="AddUser" component={AddUserScreen} />
            <Drawer.Screen name="EditUser" component={EditUserScreen} />
        </Drawer.Navigator>
    );
}

export default function AppNavigator() {
    const authContext = useContext(AuthContext);

    if (!authContext) return null; // Wait for context to load
    const { user, loading } = authContext;

    if (loading) return null; // Optionally add a spinner/loading screen

    return (
        <NavigationContainer>
            {user ? (
                <MainDrawer />
            ) : (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
}
