import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';

export default function ColorPalette({ onPress, title, colors, isSelected = false }) {
  const c1 = colors?.primary100 ?? '#000000';
  const c2 = colors?.primary200 ?? '#000000';
  const c3 = colors?.primary300 ?? '#000000';
  const c4 = colors?.primary400 ?? '#000000';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.colorBox}>
        <View style={[styles.color, { backgroundColor: c1 }]} />
        <View style={[styles.color, { backgroundColor: c2 }]} />
        <View style={[styles.color, { backgroundColor: c3 }]} />
        <View style={[styles.color, { backgroundColor: c4 }]} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: '#0EA5E9',
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    alignSelf: 'center',
  },
  colorBox: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    overflow: 'hidden',
  },
  color: {
    height: 46,
    flex: 1,
  },
  selectedText: {
    marginTop: 8,
    fontWeight: '700',
    color: '#0F172A',
  },
});
