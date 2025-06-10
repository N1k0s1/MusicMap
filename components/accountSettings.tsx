import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {updateUserInfo} from '../utils/firebase';
import {fetchRealname} from '../utils/firebase';
import {styles} from '../constants/mainstylesheet'

type AccountSettingsScreenProps = {
  visible: boolean;
  onClose: () => void;
};

interface FetchRealnameResponse {
  data: {
    realname?: string;
  };
}

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({ visible, onClose }) => {
  const [sessionKey, setSessionKey] = React.useState<string | null>(null);
  const [realname, setRealname] = React.useState<string>('');

  React.useEffect(() => {
    const fetchSessionKey = async () => {
      const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
      setSessionKey(sessionKey);
    };
    fetchSessionKey();
  }, []);

  React.useEffect(() => {
    const fetchName = async () => {
      try {
        if (!sessionKey) return;
        console.log(sessionKey);
        const result = await fetchRealname({ data: {sessionKey}}) as FetchRealnameResponse;
        setRealname(result.data.realname || '');
      } catch (error) {
        console.error("Failed to fetch real name:", error);
      }
    };
    if (sessionKey) fetchName();
  }, [sessionKey]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.accountcontentContainer}>
          <View style={styles.accountheader}>
            <Pressable onPress={onClose} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <Text style={styles.accounttitle}>Account Settings</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.accounttitle}>Preferred Name</Text>
          <TextInput style={styles.input} placeholder="Preferred Name" 
          placeholderTextColor={styles.accounttitle.color} defaultValue={realname}/>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
          <Text style={styles.accounttitle}>Session Key</Text>
          <TextInput style={styles.input} placeholder="Session Key" defaultValue={sessionKey || 'INVALID'} />
        </View>
      </View>
    </Modal>
  );
};
          //HARDCODED FOR NOW, WILL CHANGE BEFORE SHIP

    