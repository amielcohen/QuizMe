import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { TheColor } from '../constant/TheColor';

function AnswerCard({ text, onPress, variant = 'default', disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pressable,
        pressed && !disabled && { transform: [{ scale: 0.96 }] },
      ]}
    >
      <View style={[styles.card, stylesByVariant[variant]]}>
        <Text style={[styles.text, textByVariant[variant]]}>{text}</Text>
        {variant === 'selected' && <View style={styles.activeDot} />}
      </View>
    </Pressable>
  );
}

const stylesByVariant = StyleSheet.create({
  default: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  selected: {
    backgroundColor: '#FFFFFF',
    borderColor: TheColor.primary300,
    shadowColor: TheColor.primary300,
    shadowOpacity: 0.2,
    elevation: 6,
  },
  correct: {
    backgroundColor: 'rgba(34, 197, 94, 0.10)',
    borderColor: '#22C55E',
  },
  wrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.10)',
    borderColor: '#EF4444',
  },
  disabled: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(226, 232, 240, 0.8)',
    opacity: 0.6,
  },
});

const textByVariant = StyleSheet.create({
  default: { color: '#475569' },
  selected: { color: TheColor.primary300, fontWeight: '800' },
  correct: { color: '#16A34A', fontWeight: '800' },
  wrong: { color: '#DC2626', fontWeight: '800' },
  disabled: { color: '#64748B' },
});

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    height: 90,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeDot: {
    position: 'absolute',
    right: 15,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: TheColor.primary300,
  },
});

export default AnswerCard;
