import React, {useEffect, useState} from 'react';
import {Tabs} from 'expo-router';
import {Image} from 'react-native';
import {getCurrentTheme} from '@/constants/Colors';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const fetchTheme = async () => {
      const currentTheme = await getCurrentTheme();
      setTheme(currentTheme);
    };
    fetchTheme();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme === 'dark' ? '#007AFF' : '#007AFF',
        tabBarInactiveTintColor: theme === 'dark' ? '#FFFFFF' : '#000000',
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#000' : '#fff',
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => (
            <Image
              source={require('@/assets/tabs/home.png')}
              style={{width: 20.5, height: 20.5}}
            />                    ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({color}) => (
            <Image
              source={require('@/assets/tabs/social.png')}
              style={{width: 20.5, height: 20.5}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({color}) => (
            <Image
              source={require('@/assets/tabs/search.png')}
              style={{width: 20.5, height: 20.5}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: 'Playlists',
          tabBarIcon: ({color}) => (
            <Image
              source={require('@/assets/tabs/playlists.png')}
              style={{width: 20.5, height: 20.5}}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('@/assets/tabs/emotions.png')}
              style={{ width: 20.5, height: 20.5 }}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

// todo - nothing here