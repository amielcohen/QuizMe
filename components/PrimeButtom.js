import { View, Text, StyleSheet, Pressable, ActivityIndicator, Platform } from 'react-native';
import { TheColor } from '../constant/TheColor';

function PrimeButton({
  onPress,
  text,
  color = TheColor.primary100,
  textColor = 'white',
  disabled = false,
  loading = false,
  leftIcon = null,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <>
            {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
            <Text style={[styles.text, { color: textColor }]}>{text}</Text>
          </>
        )}
      </View>
    </Pressable>
  );
}

export default PrimeButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 18, // ⬆️ גובה
    paddingHorizontal: 28, // ⬆️ רוחב
    minHeight: 56, // ⬆️ סטנדרט כפתור גדול
    borderRadius: 16, // ⬆️ יותר "רך"

    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',

    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.55,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 18, // ⬆️ טקסט
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
});
