import { View, Image, Pressable, StyleSheet } from 'react-native';
import defaultImage from '../constant/images/defualtImage.png';

function UserImage({ imageUrl, onPress }) {
  const imageSource = imageUrl && imageUrl.trim() !== '' ? { uri: imageUrl } : defaultImage;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
    </Pressable>
  );
}

export default UserImage;

const styles = StyleSheet.create({
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
