import React from 'react';
import { AuthProvider } from './src/contexts/AuthContext';
import { UserDataProvider } from './src/contexts/UserDataContext';
import { MascotProvider } from './src/contexts/MascotContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <UserDataProvider>
          <MascotProvider>
            <AppNavigator />
          </MascotProvider>
        </UserDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
