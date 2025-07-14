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
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: 'black', // Black background for drawer
                    width: 500,
                },
                drawerActiveTintColor: '#a2ff00', // Green for selected item text
                drawerActiveBackgroundColor: 'rgba(162, 255, 0, 0.1)', // Slight green tint for selected bg
                drawerInactiveTintColor: 'white', // White for inactive items
                drawerLabelStyle: {
                    fontSize: 16,
                },
                headerStyle: {
                    backgroundColor: 'black', // Black header
                },
                headerTintColor: '#a2ff00', // Green header text
            }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    drawerLabel: 'Home',
                }}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerLabel: 'Profile',
                }}
            />
            <Drawer.Screen
                name="User List"
                component={UserListScreen}
                options={{
                    drawerLabel: 'User List',
                }}
            />
            <Drawer.Screen
                name="AddUser"
                component={AddUserScreen}
                options={{
                    drawerLabel: 'Add User',
                }}
            />
            <Drawer.Screen
                name="EditUser"
                component={EditUserScreen}
                options={{
                    drawerLabel: 'Edit User',
                }}
            />
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
