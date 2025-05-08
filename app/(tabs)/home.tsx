import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, Pressable, ImageBackground, ActivityIndicator 
} from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { lastfmGetRecentTracks, lastfmGetUserInfo } from '@/utils/firebase';
import EmotionSelector from '@/components/EmotionSelector';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
}

interface UserInfo {
  name: string;
  realname: string;
}

interface Emotion {
  name: string;
  emoji: string;
  color: string;
}
//TODO add in album artwork on the left.
// home screen, displays recen tracks from last fm, has the ability to log emotions, they aren't stored.
export default function Home() {
  const router = useRouter();
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isEmotionSelectorVisible, setIsEmotionSelectorVisible] = useState(false);

  useEffect(() => {
    checkSessionAndLoadData();
  }, []);

  const checkSessionAndLoadData = async () => {
    try {
      const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
      if (!sessionKey) {
        router.replace('/login');
        return;
      }

      await Promise.all([
        fetchUserInfo(sessionKey),
        fetchRecentTracks(sessionKey)
      ]);
    } catch (error) {
      console.error('Session check error:', error);
      router.replace('/login');
    }
  };

  const fetchUserInfo = async (sessionKey: string) => {
    try {
      const result = await lastfmGetUserInfo({ sessionKey });
      const data = result.data;
      
      if (data.user) {
        setUserInfo({
          name: data.user.name,
          realname: data.user.realname
        });
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
      router.replace('/login');
    }
  };

  const fetchRecentTracks = async (sessionKey: string) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const result = await lastfmGetRecentTracks({ 
        sessionKey,
        page,
        limit: 20
      });
      
      const data = result.data;

      if (data.recenttracks?.track) {
        const existingTracks = new Map(
          recentTracks.map(track => [`${track.title}-${track.artist}`, track])
        );
        
        let tracks = (data.recenttracks.track as any[])
          .map((track) => ({
            id: `${track.name}-${track.artist['#text']}-${track.date?.['#text'] || ''}`,
            title: track.name.length > 20 ? track.name.substring(0, 20) + '...' : track.name,
            artist: track.artist['#text'].split(/[&,]/)[0].trim(),
            albumArt: track.image[3]['#text'],
          }))
          .filter(track => !existingTracks.has(`${track.title}-${track.artist}`));
        
        if (tracks.length > 0) {
          setRecentTracks(prev => [...prev, ...tracks]);
          setPage(p => p + 1);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching recent tracks', err);
      router.replace('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmotionSelect = (emotion: Emotion) => {
    if (selectedTrack) {
      // TODO Save emotion to Firebase
      console.log(`Selected emotion ${emotion.name} for track ${selectedTrack.title}`);
    }
    setIsEmotionSelectorVisible(false);
  };

  // render songs in the list
  // need to fix the blur view bleeding into the text, later 
  const renderSong = ({ item }: { item: Track }) => (
    <ImageBackground
      source={{ uri: item.albumArt }}
      style={styles.songContainer}
      imageStyle={styles.songBackgroundImage}
    >
      <BlurView
        intensity={7}
        style={[styles.blurView, { backgroundColor: 'rgba(0,0,0,0.5)' }]} // Added more opacity to background
        experimentalBlurMethod="dimezisBlurView"
      >
        <View style={styles.songDetails}>
          <Text style={[styles.songTitle, { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }]}>
            {item.title}
          </Text>
          <Text style={[styles.songArtist, { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }]}>
            {item.artist}
          </Text>
          <Pressable 
            style={styles.emotionButton}
            onPress={() => {
              setSelectedTrack(item);
              setIsEmotionSelectorVisible(true);
            }}
          >
            <Text style={styles.emotionButtonText}>Add Emotion</Text>
          </Pressable>
        </View>
      </BlurView>
    </ImageBackground>
  );
// todo make better ones, these are all from songs in my playlist, possibly make it pull from user tracks using ai for the best lyrics for startup? would be cool
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi {userInfo?.realname || userInfo?.name || 'there'}!</Text>
      <Text style={styles.subHeader}>
        {[
          "Test i am tryin gout new song lyrics",
          "Let me learn the hard way and cut it close sometimes.",
          "So I'll love you till my lungs give out, I ain't lyin'.",
          "Blame it on th e black star. Blame it on the falling sky.",
          "This machine will not communicate. These thoughts.",
          "Comes like a comet, suckered you but not your friends.",
          "Don't leave me high, Don't leave me dry.",
          "I'll see you on the darrk side of the moon.",
          "Lost between the note s, the beat goes round and round.",
          "Ticking away, the moments that make up a dull day.",
          "And you're a good kid that need good leade rship.",
          "Do I look like him? Like him, Like him, Like him.",
          "I wake up to the sounds of the silence that allows.",
          "You ought to know that I think we're one and the same.",
          "This is ground control to Major Tom.",
          "Is this the real life? Is this just fantasy?"
        ][Math.floor(Math.random() * 16)]}
      </Text>
      
      <FlatList
        data={recentTracks.filter((track, index, self) => 
          index === self.findIndex((t) => 
            t.title === track.title && t.artist === track.artist
          )
        )}
        renderItem={renderSong}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.songList}
        onEndReached={async () => {
          const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
          if (sessionKey) {
            fetchRecentTracks(sessionKey);
          }
        }}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#d51007" /> : null
        }
      />

      <EmotionSelector
        visible={isEmotionSelectorVisible}
        onClose={() => setIsEmotionSelectorVisible(false)}
        onSelectEmotion={handleEmotionSelect}
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
    borderRadius: 0,
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