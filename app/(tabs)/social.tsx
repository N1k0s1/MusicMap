import {styles} from '../../constants/mainstylesheet'
import {Text, View} from '@/components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Social</Text>
      <Text style={styles.playlistsubHeader}>Check out what your friends are listening to!</Text>
    </View>
  );
}

// todo - everything