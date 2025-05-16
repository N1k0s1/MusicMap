import React, { useEffect, useState } from 'react';
import { 
  View, Platform, Text, StyleSheet, FlatList, Pressable, ImageBackground, ActivityIndicator, Alert, Image 
} from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { lastfmGetRecentTracks, lastfmGetUserInfo, storeEmotion, getEmotions } from '@/utils/firebase';
import EmotionSelector from '@/components/EmotionSelector';
import { useFocusEffect } from '@react-navigation/native';
import ProfilePicture from '@/components/ProfilePicture';
import SettingsMenu from '@/components/SettingsMenu';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
}

interface UserInfo {
  name: string;
  realname: string;
  profilePicture?: string;
}

interface Emotion {
  name: string;
  emoji: string;
  color: string;
}

interface LastFMUserResponse {
  user: {
    name: string;
    realname: string;
    image?: Array<{
      "#text": string;
    }>;
  };
}

interface LastFMRecentTracksResponse {
  recenttracks: {
    track: Array<{
      name: string;
      artist: {
        "#text": string;
      };
      image: Array<{
        "#text": string;
      }>;
      date?: {
        "#text": string;
      };
    }>;
  };
}

interface EmotionEntry {
  id: string;
  trackId: string;
  trackTitle: string;
  artist: string;
  emotion: string;
  timestamp: number;
}

//TODO add in album artwork on the left.
// home screen, displays recen tracks from last fm, has the ability to log emotions, they are now stored.Testing if any thing else will work better or if i need to change anything else or it if i made any 
export default function Home() {
  const router = useRouter();
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isEmotionSelectorVisible, setIsEmotionSelectorVisible] = useState(false);
  const [trackEmotions, setTrackEmotions] = useState<{[key: string]: string}>({});
  const [showSettings, setShowSettings] = useState(false);
  const [randomLyric, setRandomLyric] = useState<string>('');

  useEffect(() => {
    checkSessionAndLoadData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const loadEmotions = async () => {
        const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
        if (sessionKey) {
          await fetchEmotions(sessionKey);
        }
      };
      loadEmotions();
    }, [])
  );

  useEffect(() => {
    const lyrics = [
      "So I'll love you till my lungs give out, I ain't lyin'.",
      "Blame it on the black star. Blame it on the falling sky.",
      "This machine will not communicate. These thoughts.",
      "Comes like a comet, suckered you but not your friends.",
      "Don't leave me high, Don't leave me dry.",
      "I'll see you on the dark side of the moon.",
      "Before you're lost between the notes, the beat goes round and round.",
      "Ticking away, the moments that make up a dull day.",
      "This is ground control to Major Tom.",
      "Is this the real life? Is this just fantasy?",
    ];
    setRandomLyric(lyrics[Math.floor(Math.random() * lyrics.length)]);
  }, []);

{/*                 {[
          "So I'll love you till my lungs give out, I ain't lyin'.",
          "Blame it on the black star. Blame it on the falling sky.",
          "This machine will not communicate. These thoughts.",
          "Comes like a comet, suckered you but not your friends.",
          "Don't leave me high, Don't leave me dry.",
          "I'll see you on the dark side of the moon.",
          "Before you're lost between the notes, the beat goes round and round.",
          "Ticking away, the moments that make up a dull day.",
          "And you're a good kid that need good leadership.",
          "Do I look like him? Like him, Like him, Like him.",
          "I wake up to the sounds of the silence that allows.",
          "You ought to know that I think we're one and the same.",
          "This is ground control to Major Tom.",
          "Is this the real life? Is this just fantasy?",
          "Can you feel the light inside? Can you feel that fire?",
          "Your first name is Free, last name is Dom.",
          "Mais ma meilleure ennemie c'est toi.",
          "My heart is yours, it's you that I hold on to.",
          "Forget about your house of cards, and I'll do mine"
        ][Math.floor(Math.random() * 17)]} */}

  const checkSessionAndLoadData = async () => {
    try {
      const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
      if (!sessionKey) {
        router.replace('/login');
        return; 
      }

      // First fetch user info and emotions
      await Promise.all([
        fetchUserInfo(sessionKey),
        fetchEmotions(sessionKey)
      ]);

      // Then fetch tracks after emotions are loaded
      await fetchRecentTracks(sessionKey);
    } catch (error) {
      console.error('error with the session key, please try again later!!', error);
      router.replace('/login');
    }
  };

  const fetchUserInfo = async (sessionKey: string) => {
    try {
      const result = await lastfmGetUserInfo({ sessionKey });
      const data = result.data as LastFMUserResponse;
      
      if (data.user) {
        setUserInfo({
          name: data.user.name,
          realname: data.user.realname,
          profilePicture: data.user.image?.[3]?.["#text"]
        });
      }
    } catch (err) {
      console.error('Error fetching user info', err);
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
      
      const data = result.data as LastFMRecentTracksResponse;

      if (data.recenttracks?.track) {
        const existingTracks = new Map(
          recentTracks.map(track => [`${track.title}-${track.artist}`, track])
        );
        
        let tracks = data.recenttracks.track
          .map((track) => ({
            id: `${track.name}-${track.artist['#text']}`,
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
      console.error('error fetching recent tracks', err);
      router.replace('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmotions = async (sessionKey: string) => {
    try {
      const result = await getEmotions({ sessionKey });
      const data = result.data as { emotions: EmotionEntry[] };
      
      const emotionsMap: {[key: string]: string} = {};
      
      data.emotions.forEach(entry => {
        // Create a consistent track ID format
        const trackId = `${entry.trackTitle}-${entry.artist}`;
        emotionsMap[trackId] = entry.emotion;
      });
      
      setTrackEmotions(emotionsMap);
    } catch (error) {
      console.error('Error fetching emotions:', error);
    }
  };

  const handleEmotionSelect = async (emotion: Emotion) => {
    if (selectedTrack) {
      try {
        const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
        if (!sessionKey) {
          console.error('No session key found');
          return;
        }

        await storeEmotion({
          sessionKey,
          trackId: selectedTrack.id,
          trackTitle: selectedTrack.title,
          artist: selectedTrack.artist,
          emotion: emotion.name
        });

        // update locally immediately with the new emotion
        setTrackEmotions(prev => {
          const newEmotions = {
            ...prev,
            [selectedTrack.id]: emotion.name
          };
          return newEmotions;
        });

        // show success feedback
        Alert.alert('Success', `Added ${emotion.name} to ${selectedTrack.title} by ${selectedTrack.artist}`);
      } catch (error) {
        console.error('Error storing emotion:', error);
        Alert.alert('Error', 'Failed to store emotion. Please try again.');
      }
    }
    setIsEmotionSelectorVisible(false);
  };

  // render songs in the list
  const renderSong = ({ item }: { item: Track }) => {
    const trackId = `${item.title}-${item.artist}`;
    const hasEmotion = trackEmotions[trackId];
    
    return (
      <ImageBackground
        source={{ uri: item.albumArt }}
        style={styles.songContainer}
        imageStyle={styles.songBackgroundImage}
      >
        <BlurView
          intensity={7}
          style={[styles.blurView, { backgroundColor: 'rgba(0,0,0,0.5)' }]}
          experimentalBlurMethod="dimezisBlurView"
        >
          <View style={styles.songContent}>
            <View style={styles.albumArtContainer}>
              <ImageBackground
                source={{ uri: item.albumArt }}
                style={styles.albumArt}
                imageStyle={styles.albumArtImage}
              />
              <BlurView
                intensity={0}
                style={styles.albumArtBlur}
                experimentalBlurMethod="dimezisBlurView"
              />
            </View>
            <View style={styles.songDetails}>
              <Text style={[styles.songTitle, { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }]}>
                {item.title}
              </Text>
              <Text style={[styles.songArtist, { textShadowColor: 'rgba(0,0,0,0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10 }]}>
                {item.artist}
              </Text>
              <View style={styles.emotionContainer}>
                <Pressable 
                  style={[styles.currentEmotion, !hasEmotion && styles.addEmotionButton]}
                  onPress={() => {
                    setSelectedTrack(item);
                    setIsEmotionSelectorVisible(true);
                  }}
                >
                  <Text style={styles.currentEmotionText}>
                    {hasEmotion ? hasEmotion : 'Add Emotion'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    );
  };
// todo make better ones, these are all from songs in my playlist, possibly make it pull from user tracks using ai for the best lyrics for startup? would be cool
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Hi {userInfo?.realname || userInfo?.name || 'there'}!</Text>
        {userInfo?.profilePicture && (
          <ProfilePicture 
            profilePicture={userInfo.profilePicture}
            size={40}
            onPress={() => setShowSettings(true)}
          />
        )}
      </View>
      <Text style={styles.subHeader}>
        {randomLyric}
      </Text>
      
      <SettingsMenu 
        visible={showSettings} 
        onClose={() => setShowSettings(false)} 
      />

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
    backgroundColor: 'white',
  // could make dark/light mode later
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 6,
        ...(Platform.OS === 'ios' && {
      marginTop: 40,
    })
  },
  subHeader: {
    fontSize: 16,
    color: 'black',
    marginBottom: 25,
    flexWrap: 'wrap',
    flexShrink: 0,
  },
  songList: {
    paddingBottom: 19,
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
    padding: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  songContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  albumArtContainer: {
    width: 121,
    height: 121,
    marginLeft: 0,
    borderRadius: 13,
    overflow: 'hidden',
    position: 'relative',
  },
  albumArt: {
    width: '100%',
    height: '100%',
  },
  albumArtImage: {
    borderRadius: 13,
  },
  albumArtBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  songDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 15,
  },
  songTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    color: 'white',
    backgroundColor: 'rgba(52, 52, 52, 0.04)',
    fontFamily: 'Encode Sans Semi Expanded',  // need to fix font later
  },
  songArtist: {
    fontSize: 14,
    color: 'lightgray',
    alignSelf: 'flex-start',
    marginBottom: 10,
    fontFamily: 'Encode Sans Semi Expanded',
  },
  emotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  currentEmotion: {
    backgroundColor: '#d51007',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-end',
  },
  addEmotionButton: {
    backgroundColor: '#000000',
  },
  currentEmotionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  profilePicture: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
  },
});

// * to-dos
// - Better loading states
// - Pull to refresh?
// - add in the search function - kind of works but could be better
// - add in the playlist function - nothing there
// - add in the social function, nothing there
// - add in the settings menu, barebones