import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../../constants/mainstylesheet';

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
    const [isEmotionSelectorVisible, setIsEmotionSelectorVisible] = useState(false);
    const [trackEmotions, setTrackEmotions] = useState<{[key: string]: string}>({});
}