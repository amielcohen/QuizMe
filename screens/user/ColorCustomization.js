import React, { useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useTheme } from '../../theme/useTheme';
import { PALETTES, DEFAULT_THEME_NAME } from '../../theme/palettes';
import ColorPalette from '../../components/ColorPalette';
import { updateUserTheme } from '../../services/userService';

import { setUserColorCustomization } from '../../store/redux/auth';

export default function ColorCustomization() {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const token = useSelector((state) => state.auth?.token);

  const currentThemeName = useSelector(
    (state) => state.auth?.user?.Color_Customization || DEFAULT_THEME_NAME,
  );

  const [selectedPalette, setSelectedPalette] = useState(currentThemeName);

  const data = useMemo(
    () =>
      Object.keys(PALETTES).map((name) => ({
        id: name,
        title: name,
        colors: PALETTES[name],
      })),
    [],
  );

  const hasChanges = selectedPalette !== currentThemeName;

  async function onSave() {
    console.log('Saving theme:', selectedPalette);

    const prevPalette = currentThemeName;
    dispatch(setUserColorCustomization(selectedPalette));

    try {
      const saved = await updateUserTheme(selectedPalette, token);
      dispatch(setUserColorCustomization(saved));
    } catch (e) {
      dispatch(setUserColorCustomization(prevPalette));
      console.error('Failed to update theme:', e);
    }
  }

  function renderColors({ item }) {
    function pressHandler() {
      setSelectedPalette(item.id);
      console.log('Selected palette:', item.id);
    }

    return (
      <ColorPalette
        title={item.title}
        colors={item.colors}
        onPress={pressHandler}
        isSelected={item.id === selectedPalette}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary400 }]}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderColors}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <View style={[styles.footer, { borderTopColor: colors.primary200 }]}>
        <Pressable
          onPress={onSave}
          disabled={!hasChanges}
          style={({ pressed }) => [
            styles.saveBtn,
            { backgroundColor: hasChanges ? colors.primary100 : '#94A3B8' },
            pressed && hasChanges && styles.pressed,
          ]}
        >
          <Text style={styles.saveBtnText}>{hasChanges ? 'Save theme' : 'Saved'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listContent: { padding: 14, paddingBottom: 110 },

  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 14,
    borderTopWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  saveBtn: {
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
