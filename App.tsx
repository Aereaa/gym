import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserDataProvider } from './src/contexts/UserDataContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <AppNavigator />
      </UserDataProvider>
    </AuthProvider>
  );
}
