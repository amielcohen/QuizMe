import React, { useMemo, useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { login } from '../store/redux/auth';

export default function LoginScreen({ navigation }) {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dispatch = useDispatch();

  const canSubmit = useMemo(() => {
    return identifier.trim().length >= 3 && password.length >= 6 && !isSubmitting;
  }, [identifier, password, isSubmitting]);

  async function handleLogin() {
    setError('');

    if (!identifier.trim() || password.length < 6) {
      setError('Please enter a valid email/username and a password (6+ chars).');
      return;
    }

    try {
      setIsSubmitting(true);

      // Simulated request (replace with your API call)
      await new Promise((res) => setTimeout(res, 700));

      dispatch(login({ token: 'dummy-token' }));

      // Example navigation after login:
      // navigation.replace('BottomTabsNavigator');
    } catch (e) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleForgotPassword() {
    // Placeholder: navigate to your ForgotPassword screen if you add one
    // navigation.navigate('ForgotPassword');
    setError('Forgot password is not implemented yet.');
  }

  function handleGoToRegister() {
    // Placeholder: navigate to Register screen if you add one
    // navigation.navigate('Register');
    setError('Register screen is not implemented yet.');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <View style={styles.logoWrap}>
            <View style={styles.logoCircle}>
              <Ionicons name="help-circle" size={34} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>QuizMe</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email or Username</Text>
            <View style={styles.inputRow}>
              <Ionicons name="mail-outline" size={18} color="#5B6B87" />
              <TextInput
                value={identifier}
                onChangeText={setIdentifier}
                placeholder="e.g. amiel@example.com"
                placeholderTextColor="#8FA0BD"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.input}
                returnKeyType="next"
              />
            </View>

            <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
            <View style={styles.inputRow}>
              <Ionicons name="lock-closed-outline" size={18} color="#5B6B87" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Your password"
                placeholderTextColor="#8FA0BD"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            {!!error && <Text style={styles.errorText}>{error}</Text>}

            <Pressable
              onPress={handleLogin}
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
                <Text style={styles.primaryButtonText}>Log In</Text>
              )}
            </Pressable>

            <Pressable onPress={handleForgotPassword} style={styles.linkButton}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <Pressable onPress={handleGoToRegister} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Create new account</Text>
            </Pressable>

            <Text style={styles.footerNote}>
              By continuing, you agree to the app’s Terms and Privacy Policy.
            </Text>
          </View>
        </View>
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

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
    justifyContent: 'center',
    paddingHorizontal: 16,
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
    fontSize: 28,
    fontWeight: '800',
    color: TEXT,
    letterSpacing: 0.2,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: MUTED,
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
  input: {
    flex: 1,
    fontSize: 15,
    color: TEXT,
  },
  errorText: {
    marginTop: 10,
    color: '#B42318',
    fontSize: 13,
    fontWeight: '600',
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
    marginTop: 10,
    alignSelf: 'center',
    paddingVertical: 8,
  },
  linkText: {
    color: FB_BLUE,
    fontWeight: '800',
    fontSize: 13,
  },
  dividerRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: BORDER,
  },
  dividerText: {
    color: MUTED,
    fontWeight: '800',
    fontSize: 12,
  },
  secondaryButton: {
    marginTop: 12,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: TEXT,
    fontWeight: '800',
    fontSize: 15,
  },
  footerNote: {
    marginTop: 14,
    fontSize: 11,
    color: MUTED,
    textAlign: 'center',
    lineHeight: 16,
  },
});
