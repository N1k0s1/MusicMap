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
              <View style={styles.profilePicture}>
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
              onPress={() => {
                // need to make light/dark mode & make a toggle for it.
              }}
            >
              <Text style={styles.menuText}>Themes</Text>
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

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '92%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 12,
  },
  closeButton: {
    position: 'absolute',
    right: 1,
    top: -5,
  },
  closeButtonText: {
    fontSize: 26,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  menuText: {
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 9,
  },
  profileCard: {
    backgroundColor: 'rgba(218, 218, 218, 0.7)',
    borderRadius: 8,
    width: '95%',
    height: 70,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  profilePicture: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    paddingBottom: 140,
    marginRight: 0,
  },
  profileName: {
    fontSize: 25,
    fontWeight: '400',
    color: '#000000',
    flex: 1,
    textAlign: 'right',
    marginLeft: 12,
  },
});

export default SettingsMenu; 

//todo, most of it, login works and nothing else lol, need to put      the delete emotion funcction in on the backnd as well