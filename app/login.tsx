import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { lastfmAuth } from '@/utils/firebase';

export default function LoginScreen() {
  const router = useRouter();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const onLogin = async () => {
    setLoading(true);

    try {
      const result = await lastfmAuth({ username: user, password: pwd });
      const { sessionKey } = result.data as { sessionKey: string };
      
      await AsyncStorage.setItem('lastfm_session_key', sessionKey);
      console.log('sessionKey:', sessionKey);
      router.replace('/(tabs)/home');
    } catch (err) {
      console.log('Login error:', err);
      Alert.alert('Oops!', "You c ouldn't be logged in, please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login through Last.fm</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Username/Email"
        value={user}
        onChangeText={setUser}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.inputField}
        placeholder="Password"
        value={pwd}
        onChangeText={setPwd}
        secureTextEntry={true}
      />

      <Pressable
        style={styles.loginBtn}
        onPress={onLogin}
        disabled={loading}
      >
        <Text style={styles.btnText}>
          {loading ? 'Authenticating...' : 'Login'}
        </Text>
      </Pressable>

      <Pressable onPress={toggleDescription}>
        <Text style={styles.hypertext}>What happens with my login information?</Text>
      </Pressable>

      {showDescription && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            You may be thinking that this seems a bit sketchy, but your login information is only used to authenticate with Last.fm, and to get your session key.{"\n\n"}After that is done, your data is deleted, and we only store your session key to associate your account with your emotions, listening history, and a few other metrics.{"\n\n"}We do not share your data with third parties.{"\n\n"}Enjoy!
          </Text>
        </View>
      )}
    </View>
  );
}
          // Maybe talk about the TOS once it's been made, mainly about what information we collect and store.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hypertext: {
    color: 'rgba(0, 0, 0, 0.94)',
    textDecorationLine: 'underline',
    marginTop: 10,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  descriptionText: {
    color: '#333',
    fontSize: 14,
  },
}); 