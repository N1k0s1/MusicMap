import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";
import {InteractionManager} from 'react-native';
import {router} from "expo-router";
import {deleteEmotionHistory, deleteAccount} from "@/utils/firebase";

export const signOut = async (navigation: any) => {
    Alert.alert(
        'Log Out', 'Are you sure you\'d like to log out?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Log Out',
            style: 'destructive',
            onPress: async () => {
                try {
                    await AsyncStorage.clear();
                    await AsyncStorage.removeItem('user');
                    await AsyncStorage.removeItem('session');
                    await AsyncStorage.removeItem('token');
                    await AsyncStorage.removeItem('refreshToken');
                    await AsyncStorage.removeItem('expiresAt');
                    await AsyncStorage.removeItem('lastfm_session_key');
                    InteractionManager.runAfterInteractions(() => {
                        Alert.alert('Logged Out', 'You have successfully logged out');
                    });
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
                } catch (error) {
                    console.error('Error logging out', error);
                    Alert.alert('Error', 'Failed to log out');
                }
            },
          },
        ]
    );
}

// FUNCTION TO LOG OUT OF ACCOUNT, WORKS WELL, SHOULD CLEAR ALL LOCAL STORAGE
// AND THEN CHECKS IF THE SESSION KEY IS STILL VALID, IF NOT, IT REDIRECTS TO THE LOGIN SCREEN
// IF IT IS VALID, IT REDIRECTS TO THE HOME SCREEN, AND THE USER CAN TRY AGAIN.

export const deleteEmotionsHistory = async () => {
    Alert.alert(
        'Delete Emotion History', 'Are you sure you want to delete all emotion history? This cannot be undone.',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                try {
                    const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
                    console.log('Session Key:', sessionKey); // Debug log
                    if (!sessionKey) {
                        Alert.alert('Error', 'No session key found');
                        return;
                    }
                    await deleteEmotionHistory({ sessionKey });
                    await AsyncStorage.removeItem('emotion_history');
                    Alert.alert('Success', 'Emotion history has been deleted.');
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
                } catch (error) {
                    console.error('Error deleting emotions', error);
                    Alert.alert('Error', 'Failed to delete emotions');
                }
            },
        },
    ]
);
};

export const deleteAccountMenu = async () => {
    Alert.alert(
        'Delete Account', 'Are you sure you want to delete your account? This cannot be undone.',
        [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const sessionKey = await AsyncStorage.getItem('lastfm_session_key');
                        if (!sessionKey) {
                            Alert.alert('Error', 'No session key found');
                            return;
                        }
                        await deleteAccount({sessionKey});
                        await deleteEmotionHistory({sessionKey});
                        console.log('Account deleted from firebase');
                        await AsyncStorage.clear();
                        await AsyncStorage.removeItem('user');
                        await AsyncStorage.removeItem('session');
                        await AsyncStorage.removeItem('token');
                        await AsyncStorage.removeItem('refreshToken');
                        await AsyncStorage.removeItem('expiresAt');
                        await AsyncStorage.removeItem('lastfm_session_key');
                        InteractionManager.runAfterInteractions(() => {
                            Alert.alert('Account Deleted', 'Your account has been deleted');
                        });
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
                    } catch (error) {
                        console.error('Error deleting account', error);
                        Alert.alert('Error', 'Failed to delete account');
                    }
                },
            },
        ]
    );
};
// FUNCTION TO DELETE EMOTION HISTORY, WORKS WELL SHOWS SUCCESS ALERT, IF USER WANTS TO DELETE EMOTION HISTORY. I NEED TO ADD IT TO MY FIREBASE BACKEND SO IT ACTUALLLY DELETES EMOTIONS FROM THE DATABASE.
