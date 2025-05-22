import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AccountSettingsScreenProps = {
  visible: boolean;
  onClose: () => void;
};
const sessionKey = await AsyncStorage.getItem('lastfm_session_key');

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <Text style={styles.title}>Account Settings</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.title}>Preferred Name</Text>
          <TextInput style={styles.input} placeholder="Preferred Name" defaultValue="Niko" /> 
          //HARDCODED FOR NOW, WILL CHANGE BEFORE SHIP
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
          <Text style={styles.title}>Session Key</Text>
          //HARDCODED FOR NOW, WILL CHANGE BEFORE SHIP
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
    