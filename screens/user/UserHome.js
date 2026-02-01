import { Text, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import UserImage from '../../components/UserImage';
import ImageModal from '../../components/ImageModal';
import TrophyIcon from '../../components/TrophyIcon';
import StatItem from '../../components/StatItem';
import { TheColor } from '../../constant/TheColor';
import { dummyUser } from '../../data/dummy-user';
import { Ionicons } from '@expo/vector-icons';

function UserHome() {
  const user = dummyUser; // remove this line when integrating with real data
  const [isOpen, setIsOpen] = useState(false);

  const userTrophyUrls = [
    'https://images.emojiterra.com/google/noto-emoji/unicode-16.0/color/512px/1f3c6.png',
    'https://cdn-icons-png.flaticon.com/512/2784/2784439.png',
    'https://icons.veryicon.com/png/o/business/classic-icon/trophy-20.png',
  ];

  const stats = [
    { label: 'Trophies earned', value: 20, icon: 'trophy-outline' },
    { label: 'Quizzes created', value: 8, icon: 'create-outline' },
    { label: 'Quizzes played', value: 8, icon: 'game-controller-outline' },
    { label: 'Favorite quizzes', value: 5, icon: 'heart-outline' },
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openMessages() {
    alert('Messages pressed');
  }

  function openSettings() {
    alert('Settings pressed');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Colorful hero instead of an empty/top-heavy header */}
      <View style={styles.heroWrap}>
        <LinearGradient
          colors={[TheColor.primary200, TheColor.primary100, TheColor.primary300]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          {/* Decorative bubbles */}
          <View style={[styles.bubble, styles.bubbleA]} />
          <View style={[styles.bubble, styles.bubbleB]} />
          <View style={[styles.bubble, styles.bubbleC]} />

          <Pressable
            onPress={openMessages}
            style={({ pressed }) => [
              styles.iconBtn,
              styles.iconBtnRight,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="mail-outline" size={22} color="white" />
          </Pressable>

          <Pressable
            onPress={openSettings}
            style={({ pressed }) => [styles.iconBtn, styles.iconBtnLeft, pressed && styles.pressed]}
          >
            <Ionicons name="settings-outline" size={22} color="white" />
          </Pressable>

          <View style={styles.heroCenter}>
            <View>
              <UserImage imageUrl={user.imageUrl} onPress={openModal} />
            </View>

            <Text style={styles.name}>{user.name}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* Featured trophies */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured trophies</Text>
        </View>

        <View style={styles.trophyRow}>
          {userTrophyUrls.map((url, index) => (
            <View key={index} style={styles.trophyItem}>
              <TrophyIcon tropyUrl={url} />
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.card}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your stats</Text>
        </View>

        <View style={styles.statsList}>
          {stats.map((s) => (
            <StatItem key={s.label} label={s.label} value={s.value} icon={s.icon} />
          ))}
        </View>
      </View>

      <ImageModal visible={isOpen} imageUrl={user.imageUrl} onClose={closeModal} />
    </ScrollView>
  );
}

export default UserHome;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: TheColor.primary400,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 18,
  },

  heroWrap: {
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  hero: {
    minHeight: 170,
    padding: 14,
  },

  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 999,
  },
  bubbleA: { width: 140, height: 140, top: -55, right: -45 },
  bubbleB: { width: 90, height: 90, bottom: -35, left: -25 },
  bubbleC: { width: 70, height: 70, top: 55, left: 30, opacity: 0.14 },

  heroCenter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
  },

  name: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
  },

  iconBtn: {
    position: 'absolute',
    top: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  iconBtnRight: { right: 12 },
  iconBtnLeft: { left: 12 },

  card: {
    backgroundColor: TheColor.primary300,
    borderRadius: 12,
    marginHorizontal: 14,
    marginTop: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: TheColor.primary200,
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
  },

  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#083344',
  },

  trophyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    paddingHorizontal: 25,
  },
  trophyItem: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },

  statsList: {
    gap: 10,
  },

  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
});
