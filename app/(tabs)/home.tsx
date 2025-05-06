import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  ImageBackground, 
  ActivityIndicator 
} from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';

// home screen, displays recen tracks from last fm, will also have the ability to log emotions soon.
export default function Home() {
    // State stuff
    const [recentTracks, setRecentTracks] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
  
    useEffect(() => {
      fetchRecentTracks();
    }, []);
  
    // having issues with duplicate tracks, need to fix this later
    const fetchRecentTracks = async () => {
        if (isLoading || !hasMore) return;  
        setIsLoading(true);
      
        try {
          const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
          // will fix this later, just for testing
          const apiKey = '';
          
          let response = await fetch(
            `https://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&api_key=${apiKey}&sk=${sessionKey}&format=json&limit=10&page=${page}`
          );
          let data = await response.json();
      
          if (data.recenttracks?.track) {
            let tracks = data.recenttracks.track.map((track, idx) => ({
                id: track.mbid || `${track.url}-${page}-${idx}`,
                title: track.name,
                artist: track.artist['#text'],
                albumArt: track.image[3]['#text'],  // using largest image
              }));
            
            console.log(tracks.map((track) => track.id));
            
            setRecentTracks(prev => {
                const existingIds = new Set(prev.map(track => track.id));
                const newTracks = tracks.filter(track => !existingIds.has(track.id));
                return [...prev, ...newTracks];
              });            
            setPage(p => p + 1);
      
            if (tracks.length === 0) {
              setHasMore(false);
            }
          } else {
            setHasMore(false);
          }
        } catch (err) {
          console.error('Error fetching recent tracks:', err);
          // show error message later
        } finally {
          setIsLoading(false);
        }
      };

  // render songs in the list
  // need to fix the blur view bleeding into the text, later 
  const renderSong = ({ item }) => (
    <ImageBackground
      source={{ uri: item.albumArt }}
      style={styles.songContainer}
      imageStyle={styles.songBackgroundImage}
    >
      <BlurView 
        intensity={20} 
        style={styles.blurView}
        experimentalBlurMethod="dimezisBlurView"  // needed for android as it's not officially supported yet
      >
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
        data={recentTracks}
        renderItem={renderSong}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.songList}
        onEndReached={fetchRecentTracks}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={
            isLoading ? <ActivityIndicator size="large" color="#d51007" /> : null
        }
      />
    </View>
  );
}

// could move these to a separate file
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',  // could make this themeable later
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
    fontFamily: 'Encode Sans Semi Expanded',  // need to fix font later
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

// * to-dos
// - Better loading states
// - Pull to refresh?