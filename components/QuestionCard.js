import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TheColor } from '../constant/TheColor';

const { width } = Dimensions.get('window');

function QuestionCard({ question }) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[TheColor.primary200, TheColor.primary300]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* אלמנט עיצובי ברקע */}
        <View style={styles.circleDecoration} />

        <View style={styles.content}>
          <Text style={styles.label}>QUESTION</Text>
          <Text style={styles.text}>{question}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
  },
  card: {
    width: '100%',
    minHeight: 220,
    borderRadius: 30,
    padding: 24,
    justifyContent: 'center',
    overflow: 'hidden',
    elevation: 12,
    shadowColor: TheColor.primary300,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 8 },
  },
  circleDecoration: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  content: {
    alignItems: 'center',
    zIndex: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '900',
    color: 'rgba(14, 27, 42, 0.35)',
    letterSpacing: 2,
    marginBottom: 15,
  },
  text: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 30,
    color: '#0E1B2A',
  },
});

export default QuestionCard;
