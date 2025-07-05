import React from "react";
import { StyleSheet, Platform } from "react-native";
import { getCurrentTheme, ColorThemes } from "./Colors";

let styles;
let themeListeners: Array<() => void> = [];

// Helper to create styles for a given color theme
const createStyles = (colors: typeof ColorThemes.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
      ...(Platform.OS === 'ios' && {
        height: 2,
        paddingBottom: 10,
      })
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 6,
      marginTop: 40,
      ...(Platform.OS === 'ios' && {
        marginTop: 55,
      })
    },
    subHeader: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 25,
      flexWrap: 'wrap',
      flexShrink: 0,
    },
    songList: {
      paddingBottom: 20,
    },
    songContainer: {
      marginBottom: 15,
      borderRadius: 10,
      overflow: 'hidden',
      height: 120,
    },
    songBackgroundImage: {
      borderRadius: 0,
    },
    blurView: {
      flex: 1,
      justifyContent: 'center',
      padding: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    songContent: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },
    albumArtContainer: {
      width: 121,
      height: 121,
      marginLeft: 0,
      borderRadius: 13,
      overflow: 'hidden',
      position: 'relative',
    },
    albumArt: {
      width: '100%',
      height: '100%',
    },
    albumArtImage: {
      borderRadius: 13,
    },
    albumArtBlur: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    songDetails: {
      flex: 1,
      justifyContent: 'center',
      paddingRight: 15,
    },
    songTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      alignSelf: 'flex-start',
      color: 'white',
      backgroundColor: 'rgba(52, 52, 52, 0.04)',
      fontFamily: 'Encode Sans Semi Expanded',
    },
    songArtist: {
      fontSize: 14,
      color: 'lightgray',
      alignSelf: 'flex-start',
      marginBottom: 10,
      fontFamily: 'Encode Sans Semi Expanded',
    },
    emotionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    currentEmotion: {
      backgroundColor: '#d51007',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      alignSelf: 'flex-end',
    },
    addEmotionButton: {
      backgroundColor: '#000000',
    },
    currentEmotionText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '500',
    },
    profilePicture: {
      width: 40,
      height: 40,
      alignSelf: 'flex-end',
    },
    // EMOTION.TSX SPECIFIC
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    loadingText: {
      fontSize: 18,
      color: colors.text,
      marginBottom: 20,
    },
    emotionList: {
      paddingBottom: 20,
    },
    emotionemotionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: colors.container,
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
      marginTop: 6,
    },
    trackInfo: {
      flex: 1,
      marginRight: 10,
      backgroundColor: colors.container,
    },
    trackTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 4,
    },
    artist: {
      fontSize: 14,
      color: colors.text,
      marginBottom: 4,
    },
    timestamp: {
      fontSize: 12,
      color: '#999',
    },
    emotionTag: {
      backgroundColor: '#000000',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
    },
    emptyText: {
      textAlign: 'center',
      color: '#666',
      fontSize: 16,
      marginTop: 20,
    },
    emotionActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 11,
      backgroundColor: colors.container,
    },
    deleteButton: {
      backgroundColor: '#c70000',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 20,
    },
    emotionText: {
      color: 'black',
      fontSize: 14,
      fontWeight: '500',
    },
    // SEARCH.TSX SPECIFIC
    searchInput: {
      height: 40,
      borderColor: colors.text,
      color: colors.text,
      borderWidth: 0.5,
      borderRadius: 5,
      marginBottom: 20,
      marginTop: 8,
      paddingHorizontal: 10,
      borderRadius: 12,
    },
    resultsContainer: {
      paddingBottom: 0,
      borderBottomWidth: 1,
      backgroundColor: colors.background,
    },
    trackItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#FFFFFF',
      backgroundColor: colors.background,
    },
    SearchalbumArt: {
      width: 50,
      height: 50,
      marginRight: 15,
      borderRadius: 5,
    },
    trackTextContainer: {
      backgroundColor: colors.background,
      flex: 1,
    },
    trackArtist: {
      fontSize: 14,
      color: colors.text,
    },
    SearchemotionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: colors.background,
      color: colors.text,
    },
    searchtrackTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 5,
    },
    searchaddEmotionButton: {
      backgroundColor: colors.text,
    },
    searchEmotionText: {
      color: colors.background,
      fontSize: 14,
      fontWeight: '500',
    },
    searchcurrentEmotion: {
      backgroundColor: colors.text,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      alignSelf: 'flex-end',
    },
    // SETTINGS.TSX SPECIFIC
    textinput: {
      color: colors.text,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: colors.background,
    },
    contentContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      height: '92%',
      padding: 20,
    },
    settingsheader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: colors.text,
      paddingHorizontal: 12,
    },
    closeButton: {
      position: 'absolute',
      right: 1,
      top: 5,
      color: colors.text,
    },
    closeButtonText: {
      fontSize: 26,
      color: colors.text,
    },
    menuContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },
    menuItem: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      color: colors.text,
    },
    menuText: {
      color: colors.text,
      fontSize: 16,
    },
    divider: {
      height: 1,
      backgroundColor: colors.text,
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
    settingsprofilePicture: {
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
    // ACCOUNTSETTINGS
    accountcontentContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
      height: '80%',
    },
    accountheader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      color: colors.text,
    },
    backButton: {
      marginRight: 10,
    },
    backButtonText: {
      fontSize: 24,
      color: colors.text,
    },
    accounttitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    accountdivider: {
      height: 1,
      backgroundColor: 'black',
      marginVertical: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      color: colors.text,
      padding: 10,
      marginVertical: 10,
    },
    saveButton: {
      color: colors.background,
      backgroundColor: colors.text,
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
      textAlign: 'center',
    },
    saveButtonText: {
      color: colors.background,
      textAlign: 'center',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    playlistsubHeader: {
      fontSize: 16,
      color: colors.text,
      marginBottom: 17,
      marginTop: 4,
      flexWrap: 'wrap',
      flexShrink: 0,
    },
    // Emotionselector.tsx -
    emotionheader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    emotiontitle: {
      fontSize: 20,
      fontWeight: 'normal',
      color: colors.text,
    },
    emotionsGrid: {
      flex: 1,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    emotionemotionButton: {
      width: '31.8%',
      aspectRatio: 1,
      marginBottom: 15,
      borderRadius: 15,
      padding: 15,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    emoji: {
      fontSize: 40,
      marginBottom: 10,
    },
    emojiImage: {
      width: 40,
      height: 40,
      marginBottom: 10,
      resizeMode: 'contain',
    },
    emotionName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#000',
    },
    playlistemotionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
    },
    playlistemotiontitle: {
      fontSize: 24,
      paddingBottom: 12,
      fontWeight: 'normal',
      color: colors.text,
    },
    playlistItem: {
      padding: 10,
      marginBottom: 10,
      backgroundColor: colors.background,
      borderRadius: 8,
      borderColor: colors.background,
      borderWidth: 2,
    },
    playlistList: {
      marginTop: 22,
      backgroundColor: colors.background,
    },
    playlistName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    playlistGroup: {
      fontSize: 13,
      color: '#666',
    },
    noPlaylistsText: {
      textAlign: 'center',
      marginTop: 20,
      color: colors.text,
    },
    playlistEmotionText: {
      color: colors.background,
      fontSize: 14.5,
      fontWeight: '500',
    },
    playlistAddEmotionButton: {
      backgroundColor: colors.text,
    },
    playlistCurrentEmotion: {
      backgroundColor: '#d51007',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 15,
      alignSelf: 'flex-end',
      marginBottom: 17,
    },
    playlistheader: {
      fontSize: 34,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 6,
      marginTop: 15,
    },
  });

// Initialize styles synchronously with default theme (light)
styles = createStyles(ColorThemes.light);

export const reloadTheme = async () => {
  const theme = await getCurrentTheme();
  const colors = ColorThemes[theme];
  styles = createStyles(colors);
  themeListeners.forEach(listener => listener());
};

export const subscribeToThemeChanges = (listener: () => void) => {
  themeListeners.push(listener);
  return () => {
    themeListeners = themeListeners.filter(l => l !== listener);
  };
};

// Initial load (will update styles if theme is not light)
reloadTheme();

export { styles };

//   to-dos
// - Better loading states
// - Pull to refresh?
// - add in the playlist function, functional kinda
// - add in the social function, nothing there
// - add in the settings menu, barebones