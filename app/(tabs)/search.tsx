import React, {useState} from 'react';
import {StyleSheet, TextInput, FlatList, ActivityIndicator, Alert, Text} from 'react-native';
import {View} from '@/components/Themed';
import {lastfmSearchforTracks} from '@/utils/firebase';

interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
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


const handleSearch = async () => {
  if (!searchQuery.trim()) return;
  setIsSearching(true);
  try {
    const result = await lastfmSearchforTracks({ query: searchQuery }) as { data: LastFMSearchResponse };
    const tracks = result.data?.results?.trackmatches?.track || [];
    setSearchResults(
      tracks.map((track: any) => ({
        id: `${track.name}-${track.artist}`,
        title: track.name,
        artist: track.artist,
        albumArt: track.image?.[3]?.['#text'] || '',
      }))
    );
  } catch (error) {
    console.error('Error searching tracks', error);
    Alert.alert('Error', 'Search Failed, Please try again');
  } finally {
    setIsSearching(false);
    
  }
};

const renderTrack = ({ item }: { item: Track }) => (
  <View style={styles.trackItem}>
    <Text style={styles.trackTitle}>{item.title}</Text>
    <Text style={styles.trackArtist}>{item.artist}</Text>
  </View>
);

return (
  <View style={styles.container}>
    <TextInput
      placeholder="Search for songs..."
      value={searchQuery}
      onChangeText={setSearchQuery}
      onSubmitEditing={handleSearch}
      style={styles.searchInput}
    />
    {isSearching ? (
      <ActivityIndicator size="large" color="#FFFFFF" />
    ) : (
      <FlatList
        data={searchResults}
        renderItem={renderTrack}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.resultsContainer}
      />
    )}
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultsContainer: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  trackItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  trackArtist: {
    fontSize: 14,
    color: '#000000',
  }
  })