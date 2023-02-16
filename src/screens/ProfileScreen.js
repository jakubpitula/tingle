import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';


import {SafeAreaView, ScrollView} from 'react-native';

const baseUrl = 'https://y2ylvp.deta.dev';

export default function LoginScreen({navigation}) {
  

  return (
    <View style={styles.topContainer}>
      <SafeAreaView>
        <ScrollView>
          
          

          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#FFF1ED',
    height: '50%'
    //backgroundColor:'#FFF1ED',
  },

  TextInput: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    color: 'black',
  },

  inputView: {
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 25,
    marginHorizontal: 20,
  },
  title: {
    color: '#374B73',

    fontSize: 50,
    fontWeight: '800',
    letterSpacing: 1,
    paddingBottom: 50,
    paddingTop: 150,
    alignItems: 'center',
    paddingLeft: 110,
  },
  button: {
    backgroundColor: '#f586d4',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 55,
  },

  smallText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textFailed: {
    alignSelf: 'center',
    color: 'red',
    bottom: 33,
    right: 70,
  },
});
