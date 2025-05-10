import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Image } from 'react-native';
import { BlurView } from 'expo-blur';

interface Emotion {
  name: string;
  emoji: string;
  color: string;
}
//TODO add in proper grouping for things like playlists
const emotions: Emotion[] = [
    // joy/happy emotions
    { name: 'Happy', emoji: require('../assets/emotions/happy.png'), color: '#FFD700' },
    { name: 'Excited', emoji: require('../assets/emotions/excited.png'), color: '#FF69B4' },
    { name: 'Grateful', emoji: require('../assets/emotions/gratitude.png'), color: '#FAD02E' },
    { name: 'Proud', emoji: require('../assets/emotions/proud.png'), color: '#FFC107' },
    { name: 'Playful', emoji: require('../assets/emotions/playful.png'), color: '#FFB347' },
    { name: 'Hopeful', emoji: require('../assets/emotions/hopeful.png'), color: '#FFD1DC' },
    { name: 'Cheerful', emoji: require('../assets/emotions/cheerful.png'), color: '#FFE135' },
    { name: 'Content', emoji: require('../assets/emotions/content.png'), color: '#FAF884' },
  
    // sad/depressed emotions
    { name: 'Sad', emoji: require('../assets/emotions/sad.png'), color: '#4682B4' },
    { name: 'Lonely', emoji: require('../assets/emotions/lonely.png'), color: '#6CA0DC' },
    { name: 'Hopeless', emoji: require('../assets/emotions/hopeless.png'), color: '#5D8AA8' },
    { name: 'Depressed', emoji: require('../assets/emotions/depressed.png'), color: '#708090' },
    { name: 'Tired', emoji: require('../assets/emotions/tired.png'), color: '#A9A9A9' },
    { name: 'Nostalgic', emoji: '🥹', color: '#F0E68C' }, //TODO add in proper emoji
    { name: 'Disappointed', emoji: require('../assets/emotions/dissapointed.png'), color: '#B0C4DE' },
    { name: 'Heartbroken', emoji: require('../assets/emotions/heartbroken.png'), color: '#B22222' },
  
    // angr & bitter emotions
    { name: 'Angry', emoji: require('../assets/emotions/angry.png'), color: '#FF4500' },
    { name: 'Frustrated', emoji: require('../assets/emotions/frustrated.png'), color: '#E25822' },
    { name: 'Irritated', emoji: require('../assets/emotions/irritated.png'), color: '#CD5C5C' },
    { name: 'Annoyed', emoji: require('../assets/emotions/annoyed.png'), color: '#E9967A' },
    { name: 'Resentful', emoji: require('../assets/emotions/resentful.png'), color: '#C41E3A' },
    { name: 'Jealous', emoji: '🫤', color: '#9ACD32' }, //TODO add in proper emoji
    { name: 'Bitter', emoji: require('../assets/emotions/bitter.png'), color: '#C71585' },
    { name: 'Defensive', emoji: require('../assets/emotions/defensive.png'), color: '#A52A2A' },
  
    // fearful emotions, anxious
    { name: 'Anxious', emoji: require('../assets/emotions/anxious.png'), color: '#DDA0DD' },
    { name: 'Nervous', emoji: '😬', color: '#DA70D6' }, //TODO add in proper emoji
    { name: 'Fearful', emoji: require('../assets/emotions/fearful.png'), color: '#BA55D3' },
    { name: 'Insecure', emoji: require('../assets/emotions/insecure.png'), color: '#B0A8B9' },
    { name: 'Worried', emoji: '😟', color: '#D8BFD8' }, //TODO add in proper emoji
    { name: 'Overwhelmed', emoji: require('../assets/emotions/overwhelmed.png'), color: '#B497BD' },
    { name: 'Doubtful', emoji: require('../assets/emotions/doubtful.png'), color: '#BBA0CA' },
    { name: 'Embarrassed', emoji: require('../assets/emotions/embarrased.png'), color: '#FFB6C1' },
  
    // loving and affectionate emotions
    { name: 'Loving', emoji: require('../assets/emotions/loving.png'), color: '#FF6F61' },
    { name: 'Affectionate', emoji: require('../assets/emotions/affectionate.png'), color: '#FF85A1' }, //TODO add in proper emoji
    { name: 'Warm', emoji: require('../assets/emotions/warm.png'), color: '#FFC0CB' },
    { name: 'Trusting', emoji: require('../assets/emotions/trusting.png'), color: '#F4A460' },
    { name: 'Caring', emoji: require('../assets/emotions/caring.png'), color: '#F08080' },
    { name: 'Connected', emoji: require('../assets/emotions/connected.png'), color: '#FF69B4' },
    { name: 'Safe', emoji: require('../assets/emotions/safe.png'), color: '#FFDAB9' },
  
    // calm and relaxed emotions
    { name: 'Calm', emoji: require('../assets/emotions/calm.png'), color: '#98FB98' },
    { name: 'Relaxed', emoji: require('../assets/emotions/relaxed.png'), color: '#87CEEB' },
    { name: 'Peaceful', emoji: require('../assets/emotions/peaceful.png'), color: '#C1E1C1' },
    { name: 'Serene', emoji: require('../assets/emotions/serene.png'), color: '#E0FFF0' },
    { name: 'Balanced', emoji: require('../assets/emotions/balanced.png'), color: '#CFECEC' },
    { name: 'Mindful', emoji: '🧘', color: '#BFD8B8' },
    { name: 'Grounded', emoji: '🌳', color: '#90EE90' },
  
    // focused and motivated emotions
    { name: 'Focused', emoji: '🎯', color: '#9370DB' },
    { name: 'Motivated', emoji: '🔥', color: '#FF6347' },
    { name: 'Determined', emoji: '💪', color: '#FFA07A' },
    { name: 'Productive', emoji: '📈', color: '#8A2BE2' },
    { name: 'Confident', emoji: '😎', color: '#00CED1' },
    { name: 'Curious', emoji: '🧐', color: '#DAA520' },
    { name: 'Alert', emoji: '👀', color: '#00BFFF' },
  
    // suprised and shocked emotions
    { name: 'Surprised', emoji: '😮', color: '#FFDEAD' },
    { name: 'Amazed', emoji: '🤯', color: '#FFE4B5' },
    { name: 'Confused', emoji: '😕', color: '#C0C0C0' },
    { name: 'Shocked', emoji: '😳', color: '#FFB347' }  
]

interface EmotionSelectorProps {
  visible: boolean;
  onClose: () => void;
  onSelectEmotion: (emotion: Emotion) => void;
}

export default function EmotionSelector({ visible, onClose, onSelectEmotion }: EmotionSelectorProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView 
      intensity={16} 
      style={styles.modalContainer}
      experimentalBlurMethod="dimezisBlurView"
>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>How does this song make you feel?</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.emotionsGrid}>
            <View style={styles.gridContainer}>
              {emotions.map((emotion) => (
                <Pressable
                  key={emotion.name}
                  style={[styles.emotionButton, { backgroundColor: emotion.color }]}
                  onPress={() => onSelectEmotion(emotion)}
                >
                  {typeof emotion.emoji === 'string' ? (
                    <Text style={styles.emoji}>{emotion.emoji}</Text>
                  ) : (
                    <Image 
                      source={emotion.emoji} 
                      style={styles.emojiImage}
                    />
                  )}
                  <Text style={styles.emotionName}>{emotion.name}</Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#000000',
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: -5
  },
  closeButtonText: {
    fontSize: 26,
    color: '#666',
  },
  emotionsGrid: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  emotionButton: {
    width: '31.8%',
    aspectRatio: 1,
    marginBottom: 15,
    borderRadius: 15,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  emojiImage: {
    width: 40,
    height: 40,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  emotionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
}); 