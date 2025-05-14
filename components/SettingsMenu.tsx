import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';

type SettingsMenuProps = {
  visible: boolean;
  onClose: () => void;
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      animationType="fade"
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.menuContainer}>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Account Settings</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Preferences</Text>
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Log Out</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 200,
    paddingVertical: 8,
  },
  menuItem: {
    padding: 12,
  },
  menuText: {
    fontSize: 16,
  },
});

export default SettingsMenu; 

//todo, pretty much everything, it's barebones and has no functionality