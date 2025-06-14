import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView, Image} from 'react-native';
import {emotionData} from './emotionData';
import {BlurView} from 'expo-blur';
import {styles} from '../constants/mainstylesheet'
import { createPlaylists } from '@/utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Playlist {
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
    const handleCreatePlaylist = async (playlist: Playlist) => {
        try {
            const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
            console.log("Session Key:", sessionKey);
            if (!sessionKey) {
                console.error("No session key found");
                return;
            }

            console.log("Creating playlist for group:", playlist.group);
            const response = await createPlaylists({
                sessionKey,
                group: playlist.group,
                emotions: [playlist.group],
            });
            console.log("Playlist created", response);
        } catch (error) {
            console.error("Error details", error);
        }
    };
    return (
        <Modal
            visible={visible}
            animationType="fade"
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
                        <Text style={styles.emotiontitle}>What emotion should this playlist feel like?</Text>
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                    </View>
                    <ScrollView style={styles.emotionsGrid}>
                        <View style={styles.gridContainer}>
                            {emotionData
                                .filter((emotion, index, self) =>
                                    index === self.findIndex((e) => e.group === emotion.group)
                                )
                                .map((emotion) => (
                                    <Pressable
                                        key={emotion.group}
                                        style={[styles.emotionemotionButton, { backgroundColor: emotion.color }]}
                                        onPress={() => handleCreatePlaylist({
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