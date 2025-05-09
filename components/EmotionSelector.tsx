import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

interface Emotion {
  name: string;
  emoji: string;
  color: string;
}
//TODO add in proper grouping for things like playlists
const emotions: Emotion[] = [
    // joy/happy emotions
    { name: 'Happy', emoji: '😊', color: '#FFD700' },
    { name: 'Excited', emoji: '🤩', color: '#FF69B4' },
    { name: 'Grateful', emoji: '🙏', color: '#FAD02E' },
    { name: 'Proud', emoji: '😌', color: '#FFC107' },
    { name: 'Playful', emoji: '😜', color: '#FFB347' },
    { name: 'Hopeful', emoji: '🤞', color: '#FFD1DC' },
    { name: 'Cheerful', emoji: '😁', color: '#FFE135' },
    { name: 'Content', emoji: '🙂', color: '#FAF884' },
  
    // sad/depressed emotions
    { name: 'Sad', emoji: '😢', color: '#4682B4' },
    { name: 'Lonely', emoji: '😔', color: '#6CA0DC' },
    { name: 'Hopeless', emoji: '💧', color: '#5D8AA8' },
    { name: 'Depressed', emoji: '😞', color: '#708090' },
    { name: 'Tired', emoji: '😴', color: '#A9A9A9' },
    { name: 'Nostalgic', emoji: '🥹', color: '#F0E68C' },
    { name: 'Disappointed', emoji: '😕', color: '#B0C4DE' },
    { name: 'Heartbroken', emoji: '💔', color: '#B22222' },
  
    // angr & bitter emotions
    { name: 'Angry', emoji: '😠', color: '#FF4500' },
    { name: 'Frustrated', emoji: '😤', color: '#E25822' },
    { name: 'Irritated', emoji: '😒', color: '#CD5C5C' },
    { name: 'Annoyed', emoji: '😑', color: '#E9967A' },
    { name: 'Resentful', emoji: '😡', color: '#C41E3A' },
    { name: 'Jealous', emoji: '🫤', color: '#9ACD32' },
    { name: 'Bitter', emoji: '😬', color: '#C71585' },
    { name: 'Defensive', emoji: '🛡️', color: '#A52A2A' },
  
    // fearful emotions, anxious
    { name: 'Anxious', emoji: '😰', color: '#DDA0DD' },
    { name: 'Nervous', emoji: '😬', color: '#DA70D6' },
    { name: 'Fearful', emoji: '😱', color: '#BA55D3' },
    { name: 'Insecure', emoji: '😟', color: '#B0A8B9' },
    { name: 'Worried', emoji: '😟', color: '#D8BFD8' },
    { name: 'Overwhelmed', emoji: '🥴', color: '#B497BD' },
    { name: 'Doubtful', emoji: '🤨', color: '#BBA0CA' },
    { name: 'Embarrassed', emoji: '😳', color: '#FFB6C1' },
  
    // loving and affectionate emotions
    { name: 'Loving', emoji: '❤️', color: '#FF6F61' },
    { name: 'Affectionate', emoji: '🥰', color: '#FF85A1' },
    { name: 'Warm', emoji: '🤗', color: '#FFC0CB' },
    { name: 'Trusting', emoji: '🤝', color: '#F4A460' },
    { name: 'Caring', emoji: '💞', color: '#F08080' },
    { name: 'Connected', emoji: '🔗', color: '#FF69B4' },
    { name: 'Safe', emoji: '🛏️', color: '#FFDAB9' },
  
    // calm and relaxed emotions
    { name: 'Calm', emoji: '😌', color: '#98FB98' },
    { name: 'Relaxed', emoji: '😎', color: '#87CEEB' },
    { name: 'Peaceful', emoji: '🕊️', color: '#C1E1C1' },
    { name: 'Serene', emoji: '🌿', color: '#E0FFF0' },
    { name: 'Balanced', emoji: '⚖️', color: '#CFECEC' },
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
                  <Text style={styles.emoji}>{emotion.emoji}</Text>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 3
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
    width: '28%',
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
  emotionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
}); 