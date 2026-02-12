export const uploadImageToCloudinary = async (imageUri) => {
  if (!imageUri) return null;

  const filename = imageUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename);
  const ext = match ? match[1].toLowerCase() : 'jpg';

  const mimeType = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;

  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    name: filename,
    type: mimeType,
  });

  // 🔴 החלף רק אם יצרת preset אחר
  formData.append('upload_preset', 'QuizMe-Images');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/drlrtt5dz/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!data.secure_url) {
      console.error('Cloudinary error:', data);
      return null;
    }

    return data.secure_url;
  } catch (error) {
    console.error('Image upload failed:', error);
    return null;
  }
};
