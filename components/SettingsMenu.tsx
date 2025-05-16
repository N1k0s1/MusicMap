import React from 'react';
import {View, Text, StyleSheet, Pressable, Modal, ScrollView} from 'react-native';
import { BlurView } from 'expo-blur';
import {signOut} from './utilities';
import {useNavigation} from '@react-navigation/native';


type SettingsMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ visible, onClose }) => {
  const navigation = useNavigation();

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
            <Text style={styles.title}>Settings</Text>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.menuContainer}>
          <View style={styles.divider} />

            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Account Settings</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Preferences</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable 
              style={styles.menuItem} 
              onPress={() => {
                // need to make light/dark mode
              }}
            >
              <Text style={styles.menuText}>Toggle Theme</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable 
              style={styles.menuItem} 
              onPress={() => {
                // notification settings
              }}
            >
              <Text style={styles.menuText}>Notifications</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem} onPress={() => {
              onClose();
              signOut(navigation);
            }}>
              <Text style={styles.menuText}>Log Out</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.menuItem}>
              <Text style={styles.menuText}>Delete Account</Text>
            </Pressable>
            <View style={styles.divider} />
          </ScrollView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    marginVertical: 8,
  },
});

export default SettingsMenu; 

//todo, most of it, login works and nothing else lol