import {styles} from '../../constants/mainstylesheet'
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playlists</Text>
      <Text style={styles.playlistsubHeader}>Make a new playlist!</Text>
    </View>
  );
}

// todo - everything 