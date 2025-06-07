import React from "react";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  // could make dark/light mode later
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
    color: 'black',
    marginBottom: 6,
    marginTop: 40,
        ...(Platform.OS === 'ios' && {
      marginTop: 40,
    })
  },
  subHeader: {
    fontSize: 16,
    color: 'black',
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
    fontFamily: 'Encode Sans Semi Expanded',  // need to fix font later
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
});

// * to-dos
// - Better loading states
// - Pull to refresh?
// - add in the search function - kind of works but could be better
// - add in the playlist function - nothing there
// - add in the social function, nothing there
// - add in the settings menu, barebones
