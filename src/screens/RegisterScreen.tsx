import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../navigation/types';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, Typography, Spacing, BorderRadius, PageContainer } from '../theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const { colors: C } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    setError('');
    const result = await register(name.trim(), email.trim(), password);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      navigation.popToTop();
    }
  }

  const styles = React.useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: C.background },
    scroll: { ...PageContainer, flexGrow: 1, paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
    hero: { alignItems: 'center', paddingTop: Spacing.xxl, paddingBottom: Spacing.xl },
    logo: { fontSize: 56, marginBottom: Spacing.md },
    title: { ...Typography.h1, color: C.textPrimary, textAlign: 'center' },
    subtitle: { ...Typography.body, color: C.textSecondary, marginTop: Spacing.sm, textAlign: 'center' },
    form: { gap: Spacing.xs },
    errorBox: {
      backgroundColor: 'rgba(239,68,68,0.15)',
      borderRadius: BorderRadius.sm,
      padding: Spacing.md,
      marginBottom: Spacing.sm,
    },
    errorText: { ...Typography.bodySmall, color: C.error },
    label: { ...Typography.label, color: C.textSecondary, marginTop: Spacing.md, marginBottom: Spacing.xs },
    input: {
      backgroundColor: C.surface,
      borderWidth: 1,
      borderColor: C.border,
      borderRadius: BorderRadius.md,
      paddingHorizontal: Spacing.md,
      height: 52,
      ...Typography.body,
      color: C.textPrimary,
    },
    btn: {
      backgroundColor: C.primary,
      borderRadius: 12,
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.lg,
      shadowColor: C.glow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 6,
    },
    btnDisabled: { opacity: 0.6 },
    btnText: { ...Typography.button, color: C.textOnPrimary },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
    footerText: { ...Typography.body, color: C.textSecondary },
    footerLink: { ...Typography.body, color: C.primary, fontWeight: '600' },
  }), [C]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <Text style={styles.logo}>{'\uD83D\uDCAA'}</Text>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>Start your confident gym journey today</Text>
          </View>

          <View style={styles.form}>
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Your name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g. Alex"
              placeholderTextColor={C.textDisabled}
              autoCapitalize="words"
              autoCorrect={false}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={C.textDisabled}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Min. 6 characters"
              placeholderTextColor={C.textDisabled}
              secureTextEntry
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={[styles.btn, loading && styles.btnDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={C.textOnPrimary} />
              ) : (
                <Text style={styles.btnText}>Create account</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
