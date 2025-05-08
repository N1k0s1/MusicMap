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
    height: '87%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    fontSize: 24,
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
    width: '48%',
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