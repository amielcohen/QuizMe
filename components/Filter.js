import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { TheColor } from '../constant/TheColor';

function Filter({ onPress }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  function handlePress() {
    onPress?.(text);
    setText('');
    inputRef.current?.blur();
  }

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        placeholder="Search..."
        style={styles.TextInput}
        value={text}
        onChangeText={setText}
      />
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.searchIcon, { opacity: pressed ? 0.5 : 1 }]}
      >
        <Ionicons name="search-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}

export default Filter;

const styles = StyleSheet.create({
  container: {
    height: 36,
    backgroundColor: TheColor.primary300,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  TextInput: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 6,
  },
});
