import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lastfmAuth } from '@/utils/firebase';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);

    try {
      const result = await lastfmAuth({ username: user, password: pwd });
      const { sessionKey } = result.data as { sessionKey: string };
      
      await AsyncStorage.setItem('lastfm_session_key', sessionKey);
      console.log('sessionKey:', sessionKey);
      navigation.replace('home', { sessionKey });
    } catch (err) {
      console.log('Login error:', err);
      Alert.alert('Oops!', "You couldn't be logged in, please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
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
    </View>
  );
}

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
});
