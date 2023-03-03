import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SettingsButton from '../components/settingsButton';
import {SafeAreaView, ScrollView,ActivityIndicator, FlatList} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import {Text, BottomNavigation} from 'react-native-paper';
import ButtonWithBackground from '../components/buttonWithBackground';
import styles from '../css/main.css'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen, {Login} from './loginScreen';
import {Preference} from './preferenceScreen';
import {Interest} from './interestScreen';
import VideoCallScreen, { videoCallScreen } from './videoCallScreen'
import ProfileScreen from './ProfileScreen'







///////////////////////////////////////////////////////////VIDEOSDK/////
function Call() {
  return (
    <VideoCallScreen />
  );
}

function Profile() {
  return (
   <ProfileScreen />
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications!</Text>
    </View>
  );
}
function Messeges() {
  return (
    <Text>Messages</Text>
 
  )
}

///////////////////////////////////////////////////////////VIDEOSDK/////


const Tab = createBottomTabNavigator();

export default function HomeScreen() {

  return (
    <Tab.Navigator
      initialRouteName="Call"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarLabel: 'Call',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="phone" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messeges}
        options={{
          tabBarLabel: 'Messeges',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="inbox" color={color} size={size} />
          ),
        }}  />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }} 
      />


     
    </Tab.Navigator>
  );
}




