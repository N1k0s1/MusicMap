import React from 'react';
import { Image, StyleSheet, View, Pressable } from 'react-native';

interface ProfilePictureProps {
  profilePicture?: string;
  size?: number;
  onPress?: () => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profilePicture, size = 40, onPress }) => {
  if (!profilePicture) return null;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image 
        source={{ uri: profilePicture }}
        style={[styles.profilePicture, { width: size, height: size, borderRadius: size / 2 }]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 40,
  },
  profilePicture: {
    resizeMode: 'cover',
  },
});

export default ProfilePicture; 

// todo, should be good, may add in a custom profile picture option later through the settingsmenu