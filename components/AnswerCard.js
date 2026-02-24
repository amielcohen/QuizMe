import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme/useTheme';

function AnswerCard({ text, onPress, variant = 'default', disabled = false }) {
  const { colors } = useTheme();
  const dynamicColors = {
    selected: {
      borderColor: colors.primary300,
      shadowColor: colors.primary300,
      textColor: colors.primary300,
      dotColor: colors.primary300,
    },
    correct: { borderColor: '#22C55E', textColor: '#16A34A' },
    wrong: { borderColor: '#EF4444', textColor: '#DC2626' },
    default: { borderColor: 'rgba(226, 232, 240, 0.8)', textColor: '#475569' },
  };

  const currentTheme = dynamicColors[variant] || dynamicColors.default;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.pressable,
        pressed && !disabled && { transform: [{ scale: 0.96 }] },
      ]}
    >
      <View
        style={[
          styles.card,
          stylesByVariant[variant],
          { borderColor: currentTheme.borderColor, shadowColor: currentTheme.shadowColor },
        ]}
      >
        <Text style={[styles.text, textByVariant[variant], { color: currentTheme.textColor }]}>
          {text}
        </Text>

        {variant === 'selected' && (
          <View style={[styles.activeDot, { backgroundColor: currentTheme.dotColor }]} />
        )}
      </View>
    </Pressable>
  );
}

const stylesByVariant = StyleSheet.create({
  default: { backgroundColor: '#FFFFFF' },
  selected: {
    backgroundColor: '#FFFFFF',
    shadowOpacity: 0.2,
    elevation: 6,
  },
  correct: { backgroundColor: 'rgba(34, 197, 94, 0.10)' },
  wrong: { backgroundColor: 'rgba(239, 68, 68, 0.10)' },
  disabled: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(226, 232, 240, 0.8)',
    opacity: 0.6,
  },
});

const textByVariant = StyleSheet.create({
  default: { fontWeight: '700' },
  selected: { fontWeight: '800' },
  correct: { fontWeight: '800' },
  wrong: { fontWeight: '800' },
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
    textAlign: 'center',
  },
  activeDot: {
    position: 'absolute',
    right: 15,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});

export default AnswerCard;
