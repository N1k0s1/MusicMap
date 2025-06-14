import {getFunctions, httpsCallable} from "firebase/functions";
import {initializeApp} from "firebase/app";
import googleServices from "../google-services.json";

const firebaseConfig = {
  apiKey: googleServices.client[0].api_key[0].current_key,
  authDomain: `${googleServices.project_info.project_id}.firebaseapp.com`,
  projectId: googleServices.project_info.project_id,
  storageBucket: `${googleServices.project_info.project_id}.appspot.com`,
  messagingSenderId: googleServices.client[0].client_info.mobilesdk_app_id,
  appId: googleServices.client[0].client_info.mobilesdk_app_id
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'us-central1');

export const lastfmAuth = httpsCallable(functions, "lastfmAuth");
export const lastfmGetRecentTracks = httpsCallable(functions, "lastfmGetRecentTracks");
export const lastfmGetUserInfo = httpsCallable(functions, "lastfmGetUserInfo");
export const storeEmotion = httpsCallable(functions, "storeEmotion");
export const getEmotions = httpsCallable(functions, "getEmotions"); 
export const lastfmSearchforTracks = httpsCallable(functions, "lastfmSearchforTracks")
export const deleteEmotion = httpsCallable(functions, "deleteEmotion");
export const deleteEmotionHistory = httpsCallable(functions, "deleteEmotionHistory");
export const deleteAccount = httpsCallable(functions, "deleteAccount");
export const firstLogin = httpsCallable(functions, "firstLogin");
export const updateUserInfo = httpsCallable(functions, "updateUserInfo");
export const fetchRealname = httpsCallable(functions, "fetchRealname");
export const createPlaylists = httpsCallable(functions, "createPlaylists")