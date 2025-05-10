import React, { useState } from 'react';
import { 
  View, Text, Platform, StyleSheet, FlatList, Pressable, ImageBackground, ActivityIndicator 
} from 'react-native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { getEmotions } from '@/utils/firebase';

interface EmotionEntry {
  id: string;
  trackId: string;
  trackTitle: string;
  artist: string;
  emotion: string;
  timestamp: number;
}

export default function EmotionsScreen() {
  const router = useRouter();
  const [emotions, setEmotions] = useState<EmotionEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadEmotions = async () => {
    try {
      const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
      if (!sessionKey) {
        router.replace('/login');
        return;
      }

      const result = await getEmotions({ sessionKey });
      const data = result.data as { emotions: EmotionEntry[] };
      setEmotions(data.emotions);
    } catch (error) {
      console.error('error loading emotions womp womp', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadEmotions();
    }, [])
  );

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderEmotion = ({ item }: { item: EmotionEntry }) => (
    <View style={styles.emotionContainer}>
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{item.trackTitle}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
        <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
      </View>
      <View style={styles.emotionTag}>
        <Text style={styles.emotionText}>{item.emotion}</Text>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d51007" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emotions History</Text>
      <FlatList
        data={emotions}
        renderItem={renderEmotion}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.emotionList}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No emotions recorded yet. Start by adding emotions to your tracks!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    ...(Platform.OS === 'ios' && {
      height: 2,
      paddingBottom: 10,
    })
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
    backgroundColor: 'white',
    ...(Platform.OS === 'ios' && {
      marginTop: 40,
    })
  },
  emotionList: {
    paddingBottom: 20,
  },
  emotionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  emotionTag: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  emotionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
});