import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView, Image} from 'react-native';
import {emotionData} from './emotionData';
import {BlurView} from 'expo-blur';
import {styles} from '../constants/mainstylesheet'

interface Playlist {
    name: string;
    emoji: string;
    color: string;
    group: string;
    broadgroup: string;
}

interface PlaylistSelectorProps {
    visible: boolean;
    onClose: () => void;
    onSelectPlaylist: (playlist: Playlist) => void;
}

export default function PlaylistSelector({visible, onClose, onSelectPlaylist}: PlaylistSelectorProps) {
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
      experimentalBlurMethod='dimezisBlurView'
    >
    <View style={styles.contentContainer}>
        <View style={styles.emotionheader}>
        <Text style={styles.emotiontitle}>What emotion do you want this playlist to feel like?</Text>
        <Pressable onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
        </Pressable>
        </View>
        <ScrollView style={styles}
        </View>
      </BlurView>
    </Modal>
    )
}