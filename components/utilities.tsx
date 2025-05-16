import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {InteractionManager} from 'react-native';
import {router} from "expo-router";

export const signOut = async (navigation: any) => {
    Alert.alert(
        'Log Out', 'Are you sure you\'d like to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: async () => {
                await AsyncStorage.clear();
                await AsyncStorage.removeItem('user');
                await AsyncStorage.removeItem('session');
                await AsyncStorage.removeItem('token');
                await AsyncStorage.removeItem('refreshToken');
                await AsyncStorage.removeItem('expiresAt');
                await AsyncStorage.removeItem('lastfm_session_key');
                InteractionManager.runAfterInteractions(() => {
                const checkSessionAndLoadData = async () => {
                    try {
                        const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
                        if (!sessionKey) {
                        router.replace('/login');
                        return;
                        }
                        } catch (error) {
                            console.error('error with the session key, please try again later!!', error);
                        }
                    };
                    checkSessionAndLoadData();
                });
            },
          },
        ]
    );
}

// FUNCTION TO LOG OUT OF ACCOUNT, WORKS WELL, SHOULD CLEAR ALL LOCAL STORAGE
// AND THEN CHECKS IF THE SESSION KEY IS STILL VALID, IF NOT, IT REDIRECTS TO THE LOGIN SCREEN
// IF IT IS VALID, IT REDIRECTS TO THE HOME SCREEN, AND THE USER CAN TRY AGAIN.

export const deleteEmotionHistory = async () => {
    Alert.alert(
        'Delete Emotion History','Are you sure you want to delete all emotion history? This cannot be undone.',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem('emotion_history');
                    Alert.alert('Success', 'Emotion history has been deleted.');
                },
            },
        ]
    );
};

// FUNCTION TO DELETE EMOTION HISTORY, WORKS WELL SHOWS SUCCESS ALERT, IF USER WANTS TO DELETE EMOTION HISTORY. I NEED TO ADD IT TO MY FIREBASE BACKEND SO IT ACTUALLLY DELETES EMOTIONS FROM THE DATABASE.
