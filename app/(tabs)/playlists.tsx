import {styles} from '../../constants/mainstylesheet'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Pressable } from 'react-native';
import PlaylistSelector from '@/components/playlistselector';
import React, {useState} from 'react';
import { useRouter } from 'expo-router';
import createPlaylists from ''

export default function Playlist() {
  const router = useRouter();
  const [isPlaylistSelectorVisible, setIsPlaylistSelectorVisible] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleSelectPlaylist = (playlist: { name: string }) => {
    setSelectedEmotion(playlist.name);
    setIsPlaylistSelectorVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlists</Text>
      <Text style={styles.playlistsubHeader}>Make a new playlist!</Text>
      <View style={styles.playlistemotionContainer}>
        <Pressable 
        // FIX AND MAKE PROPER STYLING, JUST FOR TESTING
          style={[styles.currentEmotion, !selectedEmotion && styles.searchaddEmotionButton]}
          onPress={() => setIsPlaylistSelectorVisible(true)}
        >
          <Text style={styles.searchEmotionText}>
            {selectedEmotion || 'Create a new playlist!'}
          </Text>
        </Pressable>
      </View>

      <PlaylistSelector
        visible={isPlaylistSelectorVisible}
        onClose={() => setIsPlaylistSelectorVisible(false)}
        onSelectPlaylist={handleSelectPlaylist}
      />
    </View>
  );
}

// todo - everything