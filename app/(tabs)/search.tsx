import React, {useState} from 'react';
import {StyleSheet, TextInput, FlatList, ActivityIndicator, Alert, Text, Image, Pressable, Platform} from 'react-native';
import {View} from '@/components/Themed';
import {lastfmSearchforTracks, storeEmotion} from '@/utils/firebase';
import EmotionSelector from '@/components/EmotionSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  emotion?: string;
}
interface LastFMSearchResponse {
  results?: {
    trackmatches?: {
      track?: Array<{
        name: string;
        artist: string;
        image?: Array<{ '#text': string }>;
      }>;
    };
  };
}

export default function TabTwoScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isEmotionSelectorVisible, setIsEmotionSelectorVisible] = useState(false);
  const [trackEmotions, setTrackEmotions] = useState<{[key: string]: string}>({});

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await lastfmSearchforTracks({ query: searchQuery }) as { data: LastFMSearchResponse };
      const tracks = result.data?.results?.trackmatches?.track || [];
      setSearchResults(
        tracks.map((track: any) => {
          let albumArt = track.image?.find((img: any) => img.size === "small")?.['#text'] || '';
          if (albumArt === '') {
            albumArt = 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png';
          }
          return {
            id: `${track.name}-${track.artist}`,
            title: track.name,
            artist: track.artist,
            albumArt,
          };
        })
      );
    } catch (error) {
      console.error('Error searching tracks', error);
      Alert.alert('Error', 'Search Failed, Please try again');
    } finally {
      setIsSearching(false);
    }
  };

  const handleEmotionSelect = async (emotion: any) => {
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

        setTrackEmotions(prev => {
          const newEmotions = {
            ...prev,
            [selectedTrack.id]: emotion.name
          };
          return newEmotions;
        });

        Alert.alert('Success', `Added ${emotion.name} to ${selectedTrack.title} by ${selectedTrack.artist}`);
      } catch (error) {
        console.error('Error storing emotion:', error);
        Alert.alert('Error', 'Failed to store emotion. Please try again.');
      }
    }
    setIsEmotionSelectorVisible(false);
  };

  const renderTrack = ({ item }: { item: Track }) => (
    <View style={styles.trackItem}>
      {item.albumArt ? <Image source={{ uri: item.albumArt }} style={styles.albumArt} /> : null}
      <View style={styles.trackTextContainer}>
        <Text style={styles.trackTitle}>{item.title}</Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
        <View style={styles.emotionContainer}>
          <Pressable 
            style={[styles.currentEmotion, !item.emotion && styles.addEmotionButton]}
            onPress={() => {
              setSelectedTrack(item);
              setIsEmotionSelectorVisible(true);
            }}
          >
            <Text style={styles.currentEmotionText}>
              {item.emotion ? item.emotion : 'Add Emotion'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search</Text>
      <TextInput
        placeholder="Search for your next emotion :=D"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchInput}
      />
      {isSearching ? (
        <ActivityIndicator size="large" color="#d51007" />
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderTrack}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.resultsContainer}
        />
      )}
      <EmotionSelector
        visible={isEmotionSelectorVisible}
        onClose={() => setIsEmotionSelectorVisible(false)}
        onSelectEmotion={handleEmotionSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    color: 'black',
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
  searchInput: {
    height: 40,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    marginTop: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  resultsContainer: {
    paddingBottom: 0,
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
  albumArt: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 5,
  },
  trackTextContainer: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  trackArtist: {
    fontSize: 14,
    color: '#000000',
  },
  emotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#FFFFFF',
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
  }
})
// todo - add in profile pictures, need to fix the search function some more, especially the main user ui when opening it, maybe show popular songs?