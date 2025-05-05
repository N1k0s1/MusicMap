import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

const mockSongs = [
  {
    id: '1',
    title: 'Shake the Frost',
    artist: 'Tyler Childers',
    albumArt: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/16297c2b72d989241d4f1d73a21e06929bac7358_image.png',
  },
  {
    id: '2',
    title: 'Just',
    artist: 'Radiohead',
    albumArt: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/428fb7584532060380a993a6d6d689ef411e3da6_image.png',
  },
  {
    id: '3',
    title: 'What Have They Done To Us',
    artist: 'Mako, Grey',
    albumArt: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/6464953115891ac6d88f2d439971b2c46b7021d3_image.png',
  },
];

export default function Home() {
  const renderSong = ({ item }) => (
    <ImageBackground
      source={{ uri: item.albumArt }}
      style={styles.songContainer}
      imageStyle={styles.songBackgroundImage}
    >
      <BlurView 
      intensity={20}
      style={styles.blurView}
      experimentalBlurMethod="dimezisBlurView">
        <View style={styles.songDetails}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
          <Pressable style={styles.emotionButton}>
            <Text style={styles.emotionButtonText}>Add Emotion</Text>
          </Pressable>
        </View>
      </BlurView>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi Niko!</Text>
      <Text style={styles.subHeader}>Log the mood. Share the music.</Text>
      <FlatList
        data={mockSongs}
        renderItem={renderSong}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.songList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  subHeader: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  songList: {
    paddingBottom: 20,
  },
  songContainer: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    height: 120,
  },
  songBackgroundImage: {
    borderRadius: 10,
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  songDetails: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-end',
    color: 'white',
    fontFamily: 'Encode Sans Semi Expanded',
  },
  songArtist: {
    fontSize: 14,
    color: 'lightgray',
    alignSelf: 'flex-end',
    marginBottom: 10,
    fontFamily: 'Encode Sans Semi Expanded',
  },
  emotionButton: {
    backgroundColor: '#000000',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  emotionButtonText: {
    color: 'white',
    fontFamily: 'Encode Sans Semi Expanded',
    fontSize: 14,
  },
});