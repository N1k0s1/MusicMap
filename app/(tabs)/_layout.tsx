import React from 'react';
import {Tabs} from 'expo-router';
import {Image} from 'react-native';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import {useClientOnlyValue} from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
        },

      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:'Home', 
          tabBarIcon: ({color}) => (
            <Image 
            source={require('@/assets/tabs/home.png')} 
            style={{width: 20.5, height: 20.5}}
            />                 ),
          headerShown: false
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
          headerShown: false
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
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          tabBarIcon: ({color}) => (
          <Image 
          source={require('@/assets/tabs/emotions.png')} 
          style={{width: 20.5, height: 20.5}}
          />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  ); 
}

// todo - nothing here