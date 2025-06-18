import {styles} from '../../constants/mainstylesheet'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import PlaylistSelector from '@/components/playlistselector';
import React, {useState, useEffect} from 'react';
import { useRouter } from 'expo-router';
import { fetchPlaylistname, testSessionKey } from '@/utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlaylistResponse {
  success: boolean;
  playlists: Array<{ id: string; name: string }>;
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

  useEffect(() => {
    const fetchPlaylistsOnMount = async () => {
      try {
        const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
        if (!sessionKey) {
          console.error("No session key found");
          return;
        }

        const response = (await fetchPlaylistname({sessionKey})).data as PlaylistResponse;
        console.log("Playlists", response.playlists);
        setPlaylistData(response.playlists);
      } catch (error) {
        console.error("Error fetching playlists", error);
      }
    };

    fetchPlaylistsOnMount();
  }, []);

  const renderPlaylists = () => {
    if (playlistData.length === 0) {
      return <Text style={styles.noPlaylistsText}>No playlist found</Text>;
    }

    return (
      <View style={styles.playlistList}>
        {playlistData.map((playlist) => (
          <View key={playlist.id} style={styles.playlistItem}>
            <Text style={styles.playlistName}>{playlist.name}</Text>
            <Text style={styles.playlistGroup}>{playlist.group}</Text>
            <Text style={styles.artist}>{playlist.id}</Text>
            <Text style={styles.timestamp}>{formatDate(playlist.timestamp)}</Text>
            <View style={styles.emotionActions}>
              <View style={[styles.emotionTag, { backgroundColor: playlist.color || '#000000' }]}>
                <Text style={styles.emotionText}>{playlist.emotion || 'No emotion'}</Text>
              </View>
              <Pressable 
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>×</Text>
              </Pressable>          
            </View>
          </View>
        ))}
      </View>
    );
  };

  const handleSelectPlaylist = (playlist: {name: string}) => {
    setSelectedEmotion(playlist.name);
    setIsPlaylistSelectorVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlists</Text>
      <Text style={styles.playlistsubHeader}>Make a new playlist!</Text>
      <View style={styles.playlistemotionContainer}>
        <Pressable 
          style={[styles.currentEmotion, !selectedEmotion && styles.searchaddEmotionButton]}
          onPress={() => setIsPlaylistSelectorVisible(true)}
        >
          <Text style={styles.searchEmotionText}>
            {selectedEmotion || 'Create a new playlist!'}
          </Text>
        </Pressable>
      </View>

      {/* Render the playlists */}
      {renderPlaylists()}

      <PlaylistSelector
        visible={isPlaylistSelectorVisible}
        onClose={() => setIsPlaylistSelectorVisible(false)}
        onSelectPlaylist={handleSelectPlaylist}
      />
    </View>
  );
}

// todo - everything