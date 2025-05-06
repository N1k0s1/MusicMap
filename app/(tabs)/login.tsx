import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// will move this to proper backend soon, just for testing
const API_KEY = '';
const API_SECRET = '';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false); // slightly shorter name

  const onLogin = async () => {
    setLoading(true);

    try {
      const key = await requestSessionKey(user, pwd);
      await storeSessionKey(key);

      navigation.replace('home', { sessionKey: key });
    } catch (err) {
      console.log('Login error:', err);
      Alert.alert('Oops!', "You couldn't be logged in, please check credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const requestSessionKey = async (username: string, password: string) => {
    const sig = await signRequest({
      method: 'auth.getMobileSession',
      username,
      password,
      api_key: API_KEY,
    });

    const body = new URLSearchParams();
    body.append('method', 'auth.getMobileSession');
    body.append('username', username);
    body.append('password', password);
    body.append('api_key', API_KEY);
    body.append('api_sig', sig);
    body.append('format', 'json');

    const res = await fetch('https://ws.audioscrobbler.com/2.0/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    const json = await res.json();
    console.debug('Response from Last.fm:', json);

    if (json.error) {
      throw new Error(json.message || 'Unknown error');
    }

    return json.session.key;
  };

  const signRequest = async (params: { [k: string]: string }) => {
    const sorted = Object.keys(params).sort();
    let rawSig = '';

    // Craft the base string (e.g., api_keyxxxmethodyyy...)
    for (let key of sorted) {
      rawSig += key + params[key];
    }

    rawSig += API_SECRET;

    // Generate the MD5 hash of it
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.MD5,
      rawSig
    );

    return digest;
  };

  const storeSessionKey = async (key: string) => {
    try {
      await AsyncStorage.setItem('lastfm_session_key', key);
      console.info('Saved session key.');
    } catch (e) {
      // Not fatal but annoying
      console.warn('Could not save session key:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login to Last.fm</Text>

      <TextInput
        style={styles.inputField}
        placeholder="Username"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
  },
  inputField: {
    width: '100%',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: '#d51007',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
