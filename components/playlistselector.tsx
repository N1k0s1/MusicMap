import React, { useState } from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView, Image, TextInput, Alert} from 'react-native';
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
    const [playlistName, setPlaylistName] = useState('');
    const [selectedEmotion, setSelectedEmotion] = useState<Playlist | null>(null);
    const [showNameInput, setShowNameInput] = useState(false);

    const handleCreatePlaylist = async (playlist: Playlist) => {
        setSelectedEmotion(playlist);
        setShowNameInput(true);
    };

    const confirmPlaylistName = async () => {
        if (!playlistName.trim()) {
            Alert.alert('Error, please enter a name');
            return;
        }

        try {
            const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
            console.log("Session Key:", sessionKey);
            if (!sessionKey) {
                console.error("No session key found");
                return;
            }

            console.log("Creating playlist for group:", selectedEmotion!.group);
            const response = await createPlaylists({
                sessionKey,
                group: selectedEmotion!.group,
                emotions: [selectedEmotion!.group],
                name: playlistName.trim(),
            });
            console.log("Playlist created", response);
            setShowNameInput(false);
            setPlaylistName('');
            onClose();
        } catch (error) {
            console.error("Error details", error);
            Alert.alert('Error creating playlist, add some emotions!');
        }
    };
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
                                        style={[styles.emotionemotionButton, {backgroundColor: emotion.color}]}
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
            <Modal
                visible={showNameInput}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowNameInput(false)}
            >
                <BlurView
                    intensity={16}
                    style={styles.modalContainer}
                    experimentalBlurMethod='dimezisBlurView'
                >
                    <View style={styles.contentContainer}>
                        <Text style={styles.playlistemotiontitle}>Choose a playlist name!</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Playlist Name"
                            value={playlistName}
                            onChangeText={setPlaylistName}
                        />
                        <Pressable onPress={confirmPlaylistName} style={styles.saveButton}>
                            <Text style={styles.saveButtonText}>Create Playlist</Text>
                        </Pressable>
                        <Pressable onPress={() => setShowNameInput(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </Pressable>
                    </View>
                </BlurView>
            </Modal>
        </Modal>
    );
}