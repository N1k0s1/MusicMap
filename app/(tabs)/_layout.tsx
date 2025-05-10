import React from 'react';
import { Tabs } from 'expo-router';
import { Text, Platform } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),

      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title:'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🏠</Text>
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🗣️</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🔍︎</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: 'Playlists',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🎵</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="emotions"
        options={{
          title: 'Emotions',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 20, color }}>🤩</Text>
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
}