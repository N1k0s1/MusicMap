import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView, Image} from 'react-native';
import {BlurView} from 'expo-blur';
import {emotionData} from './emotionData';
import {styles} from '../constants/mainstylesheet'

interface Emotion {
  name: string;
  emoji: string;
  color: string;
  group: string;
  broadgroup: string;
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
          <View style={styles.emotionheader}>
            <Text style={styles.emotiontitle}>How does this song make you feel?</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>x</Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.emotionsGrid}>
            <View style={styles.gridContainer}>
              {emotionData.map((emotion) => (
                <Pressable
                  key={emotion.name}
                  style={[styles.emotionemotionButton, { backgroundColor: emotion.color }]}
                  onPress={() => onSelectEmotion({
                    ...emotion,
                    broadgroup: emotion.broadGroup
                  })}
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



// todo - fix the rest of the emotions, maybe find a better way to have the interface for this working?