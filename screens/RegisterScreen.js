import React, { useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { register } from '../services/authService';

export default function RegisterScreen({ navigation, route }) {
  const onRegisterSuccess =
    route?.params?.onRegisterSuccess ||
    (() => {
      if (navigation?.canGoBack?.()) navigation.goBack();
      else navigation?.replace?.('Login');
    });

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false); // shows loader after success
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // For focusing next input nicely
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const canSubmit = useMemo(() => {
    return (
      username.trim().length >= 3 &&
      email.trim().length >= 5 &&
      password.length >= 6 &&
      !isSubmitting &&
      !isRedirecting
    );
  }, [username, email, password, isSubmitting, isRedirecting]);

  function isValidEmail(v) {
    return /\S+@\S+\.\S+/.test(v);
  }

  async function onRegister() {
    setError('');
    setStatus('');

    const u = username.trim();
    const e = email.trim();

    if (u.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }
    if (!isValidEmail(e)) {
      setError('Please enter a valid email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      setStatus('Creating your account...');

      await register({ username: u, email: e, password });

      // Close keyboard and show "redirecting" loader with delay
      Keyboard.dismiss();
      setIsSubmitting(false);
      setError('');
      setStatus('Account created! Redirecting to login...');
      setIsRedirecting(true);

      setTimeout(() => {
        onRegisterSuccess();
      }, 1200); // adjust delay here
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      setError(msg);
      setStatus('');
    } finally {
      // If success, we already set isSubmitting false above
      // If failure, we want it false here
      setIsSubmitting(false);
    }
  }

  function goToLoginNow() {
    Keyboard.dismiss();
    if (navigation?.canGoBack?.()) navigation.goBack();
    else navigation?.navigate?.('Login');
  }

  const showOverlayLoader = isRedirecting;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* ScrollView fixes "keyboard covers fields" + keeps nice UX */}
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <View style={styles.logoWrap}>
              <View style={styles.logoCircle}>
                <Ionicons name="person-add" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Sign up to start using QuizMe</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>Username</Text>
              <View style={[styles.inputRow, !!error && styles.inputRowError]}>
                <Ionicons name="person-outline" size={18} color={MUTED} />
                <TextInput
                  value={username}
                  onChangeText={(t) => {
                    setUsername(t);
                    if (error) setError('');
                  }}
                  placeholder="At least 3 characters"
                  placeholderTextColor={PLACEHOLDER}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus?.()}
                />
                {!!username && (
                  <Pressable
                    onPress={() => setUsername('')}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Clear username"
                  >
                    <Ionicons name="close-circle" size={18} color={MUTED} />
                  </Pressable>
                )}
              </View>

              <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
              <View style={[styles.inputRow, !!error && styles.inputRowError]}>
                <Ionicons name="mail-outline" size={18} color={MUTED} />
                <TextInput
                  ref={emailRef}
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (error) setError('');
                  }}
                  placeholder="e.g. user@example.com"
                  placeholderTextColor={PLACEHOLDER}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus?.()}
                />
                {!!email && (
                  <Pressable
                    onPress={() => setEmail('')}
                    hitSlop={12}
                    accessibilityRole="button"
                    accessibilityLabel="Clear email"
                  >
                    <Ionicons name="close-circle" size={18} color={MUTED} />
                  </Pressable>
                )}
              </View>

              <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
              <View style={[styles.inputRow, !!error && styles.inputRowError]}>
                <Ionicons name="lock-closed-outline" size={18} color={MUTED} />
                <TextInput
                  ref={passwordRef}
                  value={password}
                  onChangeText={(t) => {
                    setPassword(t);
                    if (error) setError('');
                  }}
                  placeholder="At least 6 characters"
                  placeholderTextColor={PLACEHOLDER}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={styles.input}
                  returnKeyType="done"
                  onSubmitEditing={onRegister}
                />
                <Pressable
                  onPress={() => setShowPassword((s) => !s)}
                  hitSlop={12}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={MUTED}
                  />
                </Pressable>
              </View>

              {!!error && <Text style={styles.errorText}>{error}</Text>}
              {!!status && !error && <Text style={styles.statusText}>{status}</Text>}

              <Pressable
                onPress={onRegister}
                disabled={!canSubmit}
                style={({ pressed }) => [
                  styles.primaryButton,
                  !canSubmit && styles.primaryButtonDisabled,
                  pressed && canSubmit && styles.primaryButtonPressed,
                ]}
              >
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.primaryButtonText}>Register</Text>
                )}
              </Pressable>

              <Pressable onPress={goToLoginNow} style={styles.linkButton} disabled={isRedirecting}>
                <Text style={styles.linkText}>Already have an account? Log In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* Overlay loader AFTER success, to make transition feel intentional */}
        {showOverlayLoader && (
          <View style={styles.overlay}>
            <View style={styles.overlayCard}>
              <ActivityIndicator size="large" />
              <Text style={styles.overlayText}>Finalizing your account…</Text>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const FB_BLUE = '#1877F2';
const FB_BLUE_DARK = '#0B5ED7';
const BG = '#F0F4FF';
const CARD = '#FFFFFF';
const TEXT = '#0F172A';
const MUTED = '#5B6B87';
const BORDER = '#D8E2F5';
const PLACEHOLDER = '#8FA0BD';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  card: {
    backgroundColor: CARD,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 3,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logoCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: FB_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: MUTED,
    textAlign: 'center',
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: MUTED,
    marginBottom: 6,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#F7FAFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  inputRowError: {
    borderColor: '#FDA29B',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: TEXT,
  },
  errorText: {
    marginTop: 10,
    color: '#B42318',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusText: {
    marginTop: 10,
    color: MUTED,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  primaryButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 14,
    backgroundColor: FB_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.55,
  },
  primaryButtonPressed: {
    backgroundColor: FB_BLUE_DARK,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.2,
  },
  linkButton: {
    marginTop: 12,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  linkText: {
    color: FB_BLUE,
    fontWeight: '800',
    fontSize: 13,
  },

  // Overlay loader
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  overlayCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: CARD,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: 'center',
    gap: 10,
  },
  overlayText: {
    color: TEXT,
    fontWeight: '800',
    fontSize: 14,
  },
});
