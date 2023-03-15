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

const baseUrl = 'https://y2ylvp.deta.dev';

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
            <ActivityIndicator animating={true} color={'#fe8196'} size={60} top={300} />
          </View>

        ):(
        <View style={styles.container}>
          <Image
            source={require('../assets/Tingle_logo_example.jpg')}
            style={{
              width: 300,
              height: 150,
              left: 43,
              top: 100,
              marginBottom: 150,
            }}></Image>
          
          <View style={styles.inputView}>
          <Icon name={"at"} size={25} style={{top: 12}}/>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Email"
              placeholderTextColor="black"
              onChangeText={onChangeEmailHandler}
              ref={input => {
                this.textInput_email = input;
              }}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputView}>
            <Icon name={"lock"} size={25} style={{top: 12}}/>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              value={password}
              onChangeText={onChangePasswordHandler}
              editable={!isLoading}
              ref={input => {
                this.textInput_pass = input;
              }}
              placeholderTextColor="black"
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
            <SmallButton text="Forgot Password?" />
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
    backgroundColor: '#FFF1ED',
  },
  loaderContainer: {
    width: '100%',
    height: 1000,
    flex: 1,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF1ED',
    
},

  TextInput: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    color: 'black',
    flex: 1,
    padding: 5,
  },

  inputView: {
    borderBottomWidth: 2,
    marginHorizontal: 30,
    marginLeft: 30,
    marginRight:35,
    borderBottomColor: 'grey',
    flexDirection: 'row'
  },

  title: {
    color: '#374B73',
    fontSize: 50,
    fontWeight: '800',
    letterSpacing: 1,
    paddingBottom: 100,
    paddingTop: 150,
    alignItems: 'center',
    paddingLeft: 110,
  },

  smallText: {
    color: 'grey',
    fontSize: 14,
    letterSpacing: 0,
  },

  textFailed: {
    alignSelf: 'center',
    color: 'red',
    bottom: 33,
    right: 70,
  },
});
