import React from 'react';
import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView} from 'react-native';
import {BlurView} from 'expo-blur';
import {signOut, deleteEmotionsHistory, deleteAccountMenu} from './settingsInteractions';
import {useNavigation} from '@react-navigation/native';
import {lastfmGetUserInfo} from '@/utils/firebase';
import ProfilePicture from '@/components/ProfilePicture';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountSettingsScreen } from '@/components/accountSettings';
import {styles} from '../constants/mainstylesheet'

type SettingsMenuProps = {
  visible: boolean;
  onClose: () => void;
};

interface LastFMUserResponse {
  user: {
    name: string;
    realname: string;
    image?: Array<{
      "#text": string;
    }>;
  };
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({visible, onClose}) => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    realname: '',
    profilePicture: '' as string | undefined,
  });
  const navigation = useNavigation();
  const [accountSettingsVisible, setAccountSettingsVisible] = useState(false);
  const [themeUpdated, setThemeUpdated] = useState(false);

  const fetchUserInfo = async (sessionKey: string) => {
    try {
      const result = await lastfmGetUserInfo({sessionKey});
      const data = result.data as LastFMUserResponse;
      
      if (data.user) {
        setUserInfo({
          name: data.user.name,
          realname: data.user.realname,
          profilePicture: data.user.image?.[3]?.["#text"] || '../assets/images/pfp.png',
        });
      }
    } catch (err) {
      console.error('Error fetching info', err);
    }
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
      if (sessionKey) {
        await fetchUserInfo(sessionKey);
      }
    };
    loadUserInfo();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <BlurView 
        intensity={12} 
        style={styles.modalContainer}
        experimentalBlurMethod="dimezisBlurView"
      >
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Settings</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
          <View style={styles.profileCard}>
            {userInfo?.profilePicture && (
              <View style={styles.settingsprofilePicture}>
                <ProfilePicture 
                  profilePicture={userInfo.profilePicture}
                  size={60}
                />
              </View>
            )}
            {userInfo?.name && (
              <Text style={styles.profileName}>{userInfo.realname || userInfo.name || 'No name'}</Text>
            )}
          </View>
          <ScrollView style={styles.menuContainer}>
          <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={() => setAccountSettingsVisible(true)}>
              <Text style={styles.menuText}>Account Settings</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>MusicMap Preferences</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable 
              style={styles.menuItem} 
              onPress={async () => {
                console.log('setting theme');
                const savedTheme = await AsyncStorage.getItem('theme');
                console.log(savedTheme);
                if (savedTheme === 'dark') {
                  await AsyncStorage.setItem('theme', '');
                } else {
                  await AsyncStorage.setItem('theme', 'dark');
                }
                setThemeUpdated(!themeUpdated);
              }}
            >
              <Text style={styles.menuText}>Toggle Theme</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable 
              style={styles.menuItem} 
              onPress={() => {
                // notification settings, open a seperate menu for it.
              }}
            >
              <Text style={styles.menuText}>Notifications</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={() => {
              onClose();
              deleteEmotionsHistory();
            }}>
              <Text style={styles.menuText}>Delete Emotion History</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={() => {
              onClose();
              signOut(navigation);
            }}>
              <Text style={styles.menuText}>Log Out</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={() => {
              onClose();
              deleteAccountMenu();
            }}>
              <Text style={styles.menuText}>Delete Account</Text>
            </Pressable>
            <View style={styles.divider} />
          </ScrollView>
          <AccountSettingsScreen 
            visible={accountSettingsVisible} 
            onClose={() => setAccountSettingsVisible(false)} 
          />
        </View>
      </BlurView>
    </Modal>
  );
};

export default SettingsMenu; 

//todo, most of it, login works and nothing else lol, need to put      the delete emotion funcction in on the backnd as well