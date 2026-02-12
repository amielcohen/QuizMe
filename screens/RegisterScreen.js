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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { register } from '../services/authService';
import { uploadImageToCloudinary } from '../utils/cloudinary';

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
  const [profilePicUri, setProfilePicUri] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

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

  async function pickProfileImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setProfilePicUri(result.assets[0].uri);
    }
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

      let profilePic = null;

      if (profilePicUri) {
        profilePic = await uploadImageToCloudinary(profilePicUri);
      }

      await register({
        username: u,
        email: e,
        password,
        profilePic, // 🔑 זה השדה שציינת
      });

      Keyboard.dismiss();
      setIsSubmitting(false);
      setStatus('Account created! Redirecting...');
      setIsRedirecting(true);

      setTimeout(onRegisterSuccess, 1200);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || 'Registration failed. Please try again.';
      setError(msg);
      setStatus('');
      setIsSubmitting(false);
    }
  }

  function goToLoginNow() {
    Keyboard.dismiss();
    if (navigation?.canGoBack?.()) navigation.goBack();
    else navigation?.navigate?.('Login');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            {/* PROFILE IMAGE */}
            <Pressable style={styles.avatarWrap} onPress={pickProfileImage}>
              {profilePicUri ? (
                <Image source={{ uri: profilePicUri }} style={styles.avatar} />
              ) : (
                <Ionicons name="camera-outline" size={26} color={MUTED} />
              )}
            </Pressable>

            <Text style={styles.avatarHint}>Add profile picture (optional)</Text>

            {/* FORM */}
            <View style={styles.form}>
              {/* Username */}
              <Text style={styles.label}>Username</Text>
              <View style={styles.inputRow}>
                <Ionicons name="person-outline" size={18} color={MUTED} />
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder="At least 3 characters"
                  placeholderTextColor={PLACEHOLDER}
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => emailRef.current?.focus?.()}
                />
              </View>

              {/* Email */}
              <Text style={[styles.label, { marginTop: 12 }]}>Email</Text>
              <View style={styles.inputRow}>
                <Ionicons name="mail-outline" size={18} color={MUTED} />
                <TextInput
                  ref={emailRef}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="user@example.com"
                  placeholderTextColor={PLACEHOLDER}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current?.focus?.()}
                />
              </View>

              {/* Password */}
              <Text style={[styles.label, { marginTop: 12 }]}>Password</Text>
              <View style={styles.inputRow}>
                <Ionicons name="lock-closed-outline" size={18} color={MUTED} />
                <TextInput
                  ref={passwordRef}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor={PLACEHOLDER}
                  secureTextEntry={!showPassword}
                  style={styles.input}
                />
                <Pressable onPress={() => setShowPassword((s) => !s)}>
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
                style={[styles.primaryButton, !canSubmit && styles.primaryButtonDisabled]}
              >
                {isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.primaryButtonText}>Register</Text>
                )}
              </Pressable>

              <Pressable onPress={goToLoginNow} style={styles.linkButton}>
                <Text style={styles.linkText}>Already have an account? Log In</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {isRedirecting && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" />
          </View>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const BG = '#F0F4FF';
const CARD = '#FFFFFF';
const TEXT = '#0F172A';
const MUTED = '#5B6B87';
const BORDER = '#D8E2F5';
const PLACEHOLDER = '#8FA0BD';
const PRIMARY = '#1877F2';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: CARD, borderRadius: 20, padding: 18 },
  avatarWrap: {
    alignSelf: 'center',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: { width: 96, height: 96, borderRadius: 48 },
  avatarHint: {
    textAlign: 'center',
    marginTop: 8,
    color: MUTED,
    fontSize: 12,
  },
  form: { marginTop: 16 },
  label: { fontSize: 12, fontWeight: '700', color: MUTED, marginBottom: 6 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#F7FAFF',
  },
  input: { flex: 1, fontSize: 15, color: TEXT },
  errorText: { marginTop: 10, color: '#B42318', textAlign: 'center' },
  statusText: { marginTop: 10, color: MUTED, textAlign: 'center' },
  primaryButton: {
    marginTop: 16,
    height: 48,
    borderRadius: 14,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: { opacity: 0.6 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  linkButton: { marginTop: 12, alignSelf: 'center' },
  linkText: { color: PRIMARY, fontWeight: '800' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
