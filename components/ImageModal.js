import { Modal, View, Image, Pressable, StyleSheet } from 'react-native';

function ImageModal({ visible, imageUrl, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* Pressable fullscreen overlay closes when clicking outside */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* Stop closing when pressing the image itself */}
        <Pressable onPress={() => {}} style={styles.imageWrapper}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="contain" />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export default ImageModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  imageWrapper: {
    width: '100%',
    maxWidth: 420,
    aspectRatio: 1,
    borderRadius: 30,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
