import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, Pressable, Image, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../constants/mainstylesheet';
import {BlurView} from 'expo-blur';

interface Track {
    id: string;
    title: string;
    artist: string;
    albumArt: string;
    emotion?: string;
}

interface PlaylistViewerProps {
    playlistId: string;
    playlistName: string;
    visible: boolean;
    onClose: () => void;
}

export default function PlaylistViewer({playlistId, playlistName, visible, onClose}: PlaylistViewerProps) {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
    const [trackEmotions, setTrackEmotions] = useState<{[key: string]: string}>({});

    // going to use mock data for now
    const mockPlaylistTracks: Track[] = [
        {
            id: '1',
            title: 'Bohemian Rhapsody',
            artist: 'Queen',
            albumArt: 'https://sfae.blob.core.windows.net/media/ecommercesite/media/sfae/sfae.artwork/342_1.jpg',
            emotion: 'Excited'
        },
        {
            id: '2',
            title: 'Hotel California',
            artist: 'Eagles',
            albumArt: 'https://upload.wikimedia.org/wikipedia/en/4/49/Hotelcalifornia.jpg',
            emotion: 'Nostalgic'
        },
        {
            id: '3',
            title: '28',
            artist: 'Zach Bryan',
            albumArt: 'https://i.scdn.co/image/ab67616d0000b273647ad18a07e9e939e399e5a1',
            emotion: 'Love'
        }
    ];

    useEffect(() => {
        if (visible && playlistId) {
            setTracks(mockPlaylistTracks);
            setIsLoading(false);
            // loadPlaylistTracks();
        }
    }, [visible, playlistId]);

    // const loadPlaylistTracks = async () => {
    //     setIsLoading(true);
    //     try {
    //         // need to make the backend function to fetch tracks and stuff first.
    //         const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
    //         const response = await fetchPlaylistTracks({sessionKey, playlistId});
    //     } catch (e) {
    //         // handle error
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const renderTrack = ({item}: {item: Track}) => (
        <View style={styles.trackItem}>
            {item.albumArt ? <Image source={{ uri: item.albumArt }} style={styles.SearchalbumArt} /> : null}
        <View style={styles.trackTextContainer}>
            <Text style={styles.searchtrackTitle}>{item.title}</Text>
            <Text style={styles.trackArtist}>{item.artist}</Text>
            <View style={styles.emotionContainer}>
                <Pressable
                    style={[
                        styles.currentEmotion,
                        !item.emotion && styles.noEmotion
                    ]}
                    onPress={() => {
                    }}
                >
               </Pressable>
             </View>
           </View>
         </View>
    );

    return (
        visible ? (
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
                            <Text style={styles.emotionheader}>{playlistName}</Text>
                            <Pressable onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>x</Text>
                            </Pressable>
                        </View>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : (
                            <FlatList
                                data={tracks}
                                keyExtractor={(item) => item.id}
                                renderItem={renderTrack}
                            />
                        )}
                    </View>
                </BlurView>
            </Modal>
        ) : null
    );
}