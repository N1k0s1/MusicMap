import {styles} from '../../constants/mainstylesheet'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import PlaylistSelector from '@/components/playlistselector';
import PlaylistViewer from '@/components/playlistViewer';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import { fetchPlaylistname, testSessionKey } from '@/utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, ActivityIndicator } from 'react-native';

interface PlaylistResponse {
  success: boolean;
  playlists: Array<{ id: string; name: string }>;
}

interface PlaylistEntry {
  id: string;
  name: string;
  timestamp?: number;
  color?: string;
  group?: string;
}

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function Playlist() {
  const router = useRouter();
  const [isPlaylistSelectorVisible, setIsPlaylistSelectorVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [playlistData, setPlaylistData] = useState<PlaylistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaylist, setSelectedPlaylist] = useState<{id: string, name: string} | null>(null);
  const [isPlaylistViewerVisible, setIsPlaylistViewerVisible] = useState(false);

  const loadPlaylists = async () => {
      try {
        const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
        if (!sessionKey) {
          console.error("No session key found.");
          return;
        }

        const response = (await fetchPlaylistname({sessionKey})).data as PlaylistResponse;
        console.log("Playlists", response.playlists);
        setPlaylistData(response.playlists);
      } catch (error) {
        console.error("Error fetching playlists", error);
    } finally {
      setIsLoading(false);
      }
    };

  useFocusEffect(
    React.useCallback(() => {
      loadPlaylists();
    }, [])
  );

  const renderPlaylist = ({ item }: { item: PlaylistEntry }) => {
    return (
      <View style={styles.emotionemotionContainer}>
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle}>{item.name}</Text>
          <Text style={styles.artist}>{item.id}</Text>
          <Text style={styles.timestamp}>
            {item.timestamp ?formatDate(item.timestamp): ''}
          </Text>
        </View>
            <View style={styles.emotionActions}>
          <View style={[styles.emotionTag, {backgroundColor: item.color} || styles.trackInfo]}>
            <Text style={styles.playlistEmotionText}>{item.group}</Text>
             </View>
              <Pressable 
                style={styles.deleteButton}
                onPress={() => {
                  setSelectedPlaylist({id: item.id, name: item.name});
                  setIsPlaylistViewerVisible(true);
                }}
              >
                <Text style={styles.deleteText}>→</Text>
              </Pressable>
            </View>
      </View>
    );
  };

  const handleSelectPlaylist = (playlist: {name: string}) => {
    setSelectedEmotion(playlist.name);
    setIsPlaylistSelectorVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading playlists....</Text>
        <ActivityIndicator size="large" color="#d51007" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlists</Text>
      <Text style={styles.playlistsubHeader}>Make a new playlist!</Text>
      <View style={styles.playlistemotionContainer}>
        <Pressable
          style={[styles.playlistCurrentEmotion, !selectedEmotion && styles.playlistAddEmotionButton]}
          onPress={() => setIsPlaylistSelectorVisible(true)}
        >
          <Text style={styles.searchEmotionText}>
            {'Create a new playlist!'}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={playlistData}
        renderItem={renderPlaylist}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.emotionList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No playlists found. Start by creating your first playlist!
          </Text>
        }
      />
      <PlaylistSelector
        visible={isPlaylistSelectorVisible}
        onClose={() => setIsPlaylistSelectorVisible(false)}
        onSelectPlaylist={handleSelectPlaylist}
      />

      {isPlaylistViewerVisible && selectedPlaylist && (
        <PlaylistViewer
          playlistId={selectedPlaylist.id}
          playlistName={selectedPlaylist.name}
          visible={isPlaylistViewerVisible}
          onClose={() => {
            setIsPlaylistViewerVisible(false);
            setSelectedPlaylist(null);
          }}
        />
      )}
    </View>
  );
}

// todo - everything