import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import SettingsButton from '../components/settingsButton';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import {Text, BottomNavigation} from 'react-native-paper';
import ButtonWithBackground from '../components/buttonWithBackground';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome'
import LoginScreen, {Login} from './loginScreen';
import {Preference} from './preferenceScreen';
import {Interest} from './interestScreen';
import VideoCallScreen, {videoCallScreen} from './videoCallScreen';
import ProfileScreen from './ProfileScreen';

///////////////////////////////////////////////////////////VIDEOSDK/////
function Call() {
  return <VideoCallScreen />;
}

function Profile() {
  return <ProfileScreen />;
}

function Notifications() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications!</Text>
    </View>
  );
}
function Messeges() {
  return <Text>Messages</Text>;
}

///////////////////////////////////////////////////////////VIDEOSDK/////

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
  return (
    <Tab.Navigator
      initialRouteName="Call"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarStyle: {            
          position: "absolute",
          bottom: 5,
          left: 20,
          right: 20,
          elevation: 3,
          backgroundColor: "white",
          borderRadius: 15,
          height: 50,
        },

        headerStyle: {
          backgroundColor: 'White',
        },
        headerTintColor: '#e91e63',
        headerTintStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarLabel: 'Call',
          tabBarIcon: ({color, size}) => (
            <Icon name="phone" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messeges}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({color, size}) => (
            <Icon name="comment" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({color, size}) => (
            <Icon name="bell" color={color} size={size} />
          ),
          tabBarBadge: 69,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  title: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 50,
    marginTop: 100,
  },

  smallText: {
    color: 'black',
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputView: {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 3,
    width: '90%',
    marginBottom: 35,
    alignContent: 'center',
    justifyContent: 'center',
  },

  altTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 10,
  },
});
