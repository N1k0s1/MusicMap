import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView, Image} from 'react-native';
import {BlurView} from 'expo-blur';
import {emotionData} from './emotionData';

interface Emotion {
  name: string;
  emoji: string;
  color: string;
}

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
              {emotionData.map((emotion) => (
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
    height: '90%',
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

// todo - fix the rest of the emotions, maybe find a better way to have the interface for this working?