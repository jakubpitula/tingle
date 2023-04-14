import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';
import axios from 'axios';
import {SafeAreaView, ScrollView} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from "react-native-linear-gradient";
import firebase from 'firebase';


const baseUrl = 'https://y2ylvp.deta.dev';
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyAH5m-W1aWKQpC9zwXXOX4C7tWQR3WAdUU",
    authDomain: "dating-app-3e0f5.firebaseapp.com",
    databaseURL: "https://dating-app-3e0f5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dating-app-3e0f5",
    storageBucket: "dating-app-3e0f5.appspot.com",
    messagingSenderId: "775458561795",
    appId: "1:775458561795:web:a5a0f059c513fb071d1336",
    measurementId: "G-1F93T08THP"
  });
}

const auth = firebase.auth();

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false)
  //   }, 2000);
  // },[]);

  const onChangePasswordHandler = password => {
    setPassword(password);
  };

  const onChangeEmailHandler = email => {
    setEmail(email);
  };

 

  const onSubmitFormHandler = async event => {
    
    if (!email.trim() || !password.trim()) {
      alert('email or passoword is invalid');
      return;
    }
    
    const formData = new FormData();

    formData.append('username', email);
    formData.append('password', password);



    setIsLoading(true);


    try {
      const response = await axios
        .post(`${baseUrl}/token`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(response => {
          if (response.status === 200) {
            setIsLoading(false)
            EncryptedStorage.setItem('id_token', response.data.access_token);
            this.textInput_email.clear();
            this.textInput_pass.clear();
            auth.signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User logged in successfully');
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
            navigation.navigate('Home');
            
          } else {
            throw new Error('Email or Password incorrect');
          }
        });
    } catch (error) {
      alert('Email or Password incorrect');
      setIsLoading(false);
    }
  };

  return (

  
    <SafeAreaView>
      <ScrollView>
        {isLoading? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator animating={true} color={'#C73866'} size={70} top={300} />
            </View>

        ):(
          
         <View style={styles.container}>
          <LinearGradient style={styles.topContainer} colors={['#ec0f5d','#b0234f','#f18a55',]} start={{ x: 0, y: 0}} end={{ x: 0.4, y: 0 }}/>
          <Text style={styles.title}>Tingle</Text>
          
          <View style={styles.inputView}>
          <Icon name={"at"} size={25} style={{top: 12}} color={"#b1b1b1"}/>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Email"
              placeholderTextColor="#b1b1b1"
              onChangeText={onChangeEmailHandler}
              ref={input => {
                this.textInput_email = input;
              }}
              editable={!isLoading}
            />
          </View>
          
          <View style={styles.inputView}>
            <Icon name={"lock"} size={25} style={{top: 12}} color={"#b1b1b1"}/>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              
              value={password}
              onChangeText={onChangePasswordHandler}
              editable={!isLoading}
              ref={input => {
                this.textInput_pass = input;
              }}
              placeholderTextColor="#b1b1b1"
              secureTextEntry
            />
          </View>

          <View style={{alignSelf:'center', paddingTop: 20}}>
            <ButtonWithBackground
              text="Login"
              color="black"
              onPress={onSubmitFormHandler}
              disabled={isLoading}
            />
          </View>

          <View
            alignItems="center"
            style={{
              marginBottom: 110,
              justifyContent: 'flex-end',
              marginTop: 30,
            }}>
            <SmallButton text="Forgot Password?" onPress={() => navigation.navigate('Password')} />
            <Text style={styles.smallText}> Don't have an account yet?</Text>
            <SmallButton
              text="Sign up"
              onPress={() => navigation.navigate('Registration')}
            />
          </View>
        </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#1b1b1b',
    elevation: 25,
    shadowOpacity: 100,
   
  },

  topContainer: {
    height: 230,
    width: 1000,
   bottom: 100,
    right: 50,
    
    
    transform: [{skewY: '-10deg'}],
   

  },

  loaderContainer: {
    width: '100%',
    height: 1000,
    flex: 1,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    
},

  TextInput: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    color: 'white',
    flex: 1,
    padding: 5,
  },

  inputView: {
    borderBottomWidth: 2,
    
    marginHorizontal: 30,
    marginLeft: 30,
    marginRight:35,
    borderBottomColor: '#C73866',
    flexDirection: 'row'
  },

  title: {
    fontSize: 60,
    color: "#C73866",
    letterSpacing: 1,
    paddingBottom: 50,
    paddingLeft: 20,
    
    fontFamily: "Archivo-VariableFont_wdth,wght",
    alignSelf: 'flex-start',
   
    

  },

  smallText: {
    color: '#6d6d6d',
    fontSize: 14,
    letterSpacing: 0,
    fontFamily: 'Gruppo'
  },

  textFailed: {
    alignSelf: 'center',
    color: 'red',
    bottom: 33,
    right: 70,
  },
});
