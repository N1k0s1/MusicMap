import React from "react";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: 'white',
    ...(Platform.OS === 'ios' && {
      height: 2,
      paddingBottom: 10,
    })
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    marginBottom: 20,
    marginTop: 20,
    ...(Platform.OS === 'ios' && {
      marginTop: 55,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  trackInfo: {
    flex: 1,
    marginRight: 10,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  artist: {
    fontSize: 14,
    color: '#666',
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
  emotionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
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
    gap: 10,
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
  emotionList: {
    paddingBottom: 20,
  },

});

// * to-dos
// - Better loading states
// - Pull to refresh?
// - add in the search function - kind of works but could be better
// - add in the playlist function - nothing there
// - add in the social function, nothing there
// - add in the settings menu, barebones 





  emotionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
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
    gap: 10,
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
  }
});