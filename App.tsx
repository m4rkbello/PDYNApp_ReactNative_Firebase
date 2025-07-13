import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigators/AppNavigators';

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
