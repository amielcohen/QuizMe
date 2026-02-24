import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import UserImage from '../../components/UserImage';
import ImageModal from '../../components/ImageModal';
import TrophyIcon from '../../components/TrophyIcon';
import StatItem from '../../components/StatItem';
import { useTheme } from '../../theme/useTheme';
import { PALETTES } from '../../theme/palettes';

function UserHome({ navigation }) {
  const [isOpen, setIsOpen] = useState(false); // למודל התמונה
  const [settingsVisible, setSettingsVisible] = useState(false); // למודל ההגדרות

  const user = useSelector((state) => state.auth?.user);
  const { colors } = useTheme();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleSettings = () => setSettingsVisible(!settingsVisible);

  const handleEditProfile = () => {
    setSettingsVisible(false);
    console.log(PALETTES['Aqua Mint']);
  };

  const handleEditColors = () => {
    setSettingsVisible(false);
    navigation.navigate('Color Customization');
  };

  const heroGradient = [colors.primary200, colors.primary100, colors.primary300];
  const username = user?.username ?? 'User';
  const profilePic = user?.profilePic ?? '';

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

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: colors.primary400 }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.heroWrap}>
        <LinearGradient
          colors={heroGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={[styles.bubble, styles.bubbleA]} />
          <View style={[styles.bubble, styles.bubbleB]} />
          <View style={[styles.bubble, styles.bubbleC]} />

          <Pressable
            style={({ pressed }) => [
              styles.iconBtn,
              styles.iconBtnRight,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="mail-outline" size={22} color="#FFFFFF" />
          </Pressable>

          {/* כפתור הגדרות פותח את המודל */}
          <Pressable
            onPress={toggleSettings}
            style={({ pressed }) => [styles.iconBtn, styles.iconBtnLeft, pressed && styles.pressed]}
          >
            <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
          </Pressable>

          <View style={styles.heroCenter}>
            <UserImage imageUrl={profilePic} onPress={openModal} />
            <Text style={styles.name}>{username}</Text>
          </View>
        </LinearGradient>
      </View>

      {/* מודל הגדרות */}
      <Modal
        visible={settingsVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleSettings}
      >
        <TouchableWithoutFeedback onPress={toggleSettings}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.settingsModal,
                  { backgroundColor: colors.primary400, borderColor: colors.primary200 },
                ]}
              >
                <Text style={[styles.modalTitle, { color: colors.primary100 }]}>Settings</Text>

                <Pressable
                  onPress={handleEditProfile}
                  style={({ pressed }) => [
                    styles.settingsOption,
                    pressed && { backgroundColor: 'rgba(0,0,0,0.05)' },
                  ]}
                >
                  <Ionicons name="person-outline" size={20} color={colors.primary100} />
                  <Text style={[styles.optionText, { color: colors.primary100 }]}>
                    Edit Profile
                  </Text>
                </Pressable>

                <View
                  style={[styles.separator, { backgroundColor: colors.primary200, opacity: 0.3 }]}
                />

                <Pressable
                  onPress={handleEditColors}
                  style={({ pressed }) => [
                    styles.settingsOption,
                    pressed && { backgroundColor: 'rgba(0,0,0,0.05)' },
                  ]}
                >
                  <Ionicons name="color-palette-outline" size={20} color={colors.primary100} />
                  <Text style={[styles.optionText, { color: colors.primary100 }]}>
                    Customize Colors
                  </Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Featured trophies */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.primary300, borderColor: colors.primary200 },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primary200 }]}>Featured trophies</Text>
        <View style={styles.trophyRow}>
          {userTrophyUrls.map((url, index) => (
            <View key={String(index)} style={styles.trophyItem}>
              <TrophyIcon tropyUrl={url} />
            </View>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.primary300, borderColor: colors.primary200 },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.primary200 }]}>Your stats</Text>
        <View style={styles.statsList}>
          {stats.map((s) => (
            <StatItem key={s.label} label={s.label} value={s.value} icon={s.icon} />
          ))}
        </View>
      </View>

      <ImageModal visible={isOpen} imageUrl={profilePic} onClose={closeModal} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... הסטייל הקיים שלך ...
  screen: { flex: 1 },
  content: { paddingTop: 10, paddingBottom: 18 },
  heroWrap: {
    marginHorizontal: 14,
    marginTop: 12,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  hero: { minHeight: 170, padding: 14 },
  bubble: { position: 'absolute', backgroundColor: 'rgba(255,255,255,0.18)', borderRadius: 999 },
  bubbleA: { width: 140, height: 140, top: -55, right: -45 },
  bubbleB: { width: 90, height: 90, bottom: -35, left: -25 },
  bubbleC: { width: 70, height: 70, top: 55, left: 30, opacity: 0.14 },
  heroCenter: { alignItems: 'center', justifyContent: 'center', paddingTop: 18 },
  name: { marginTop: 10, fontSize: 22, fontWeight: '900', color: '#FFFFFF' },
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
    borderRadius: 12,
    marginHorizontal: 14,
    marginTop: 12,
    padding: 14,
    borderWidth: 2,
    elevation: 4,
  },
  sectionTitle: { fontSize: 16, fontWeight: '900', marginBottom: 10 },
  trophyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 },
  trophyItem: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsList: { gap: 10 },
  pressed: { opacity: 0.85 },

  // סטיילים חדשים למודל
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsModal: {
    width: '80%',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 15,
  },
  separator: {
    height: 1,
    width: '100%',
    marginVertical: 5,
  },
});

export default UserHome;
