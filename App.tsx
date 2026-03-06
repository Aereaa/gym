import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserDataProvider } from './src/contexts/UserDataContext';
import { MascotProvider } from './src/contexts/MascotContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        <MascotProvider>
          <AppNavigator />
        </MascotProvider>
      </UserDataProvider>
    </AuthProvider>
  );
}
