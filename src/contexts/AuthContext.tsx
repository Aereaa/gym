import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile } from '../data/types';

const USERS_KEY = '@gymfidence_users';
const SESSION_KEY = '@gymfidence_session';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateUser: (patch: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore session on app start
  useEffect(() => {
    (async () => {
      try {
        const sessionId = await AsyncStorage.getItem(SESSION_KEY);
        if (sessionId) {
          const all = await loadAllUsers();
          const found = all.find((u) => u.id === sessionId) ?? null;
          setUser(found);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function loadAllUsers(): Promise<UserProfile[]> {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async function saveAllUsers(users: UserProfile[]) {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  async function login(email: string, password: string) {
    const all = await loadAllUsers();
    const found = all.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) return { error: 'Invalid email or password.' };
    await AsyncStorage.setItem(SESSION_KEY, found.id);
    setUser(found);
    return {};
  }

  async function register(name: string, email: string, password: string) {
    const all = await loadAllUsers();
    if (all.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { error: 'An account with this email already exists.' };
    }
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      savedMachineIds: [],
      createdAt: new Date().toISOString(),
    };
    await saveAllUsers([...all, newUser]);
    await AsyncStorage.setItem(SESSION_KEY, newUser.id);
    setUser(newUser);
    return {};
  }

  async function logout() {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  async function updateUser(patch: Partial<UserProfile>) {
    if (!user) return;
    const updated = { ...user, ...patch };
    const all = await loadAllUsers();
    await saveAllUsers(all.map((u) => (u.id === updated.id ? updated : u)));
    setUser(updated);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
