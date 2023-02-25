import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';
import axios from 'axios';
import style from '../css/loginScreen.css'
import {SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseUrl = 'https://y2ylvp.deta.dev';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);



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

    formData.append("username", email);
    formData.append("password", password);

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}/token`,
        formData,
        {headers: {'Content-Type': 'multipart/form-data'}}
        ).then((response) => {
          if (response.status === 200) {
            AsyncStorage.setItem("id_token", response.data.access_token);
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
        <View style={styles.container}>
         <Text style={styles.title}> Tingle</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={email}
              placeholder="Email o number"
              placeholderTextColor="black"
              onChangeText={onChangeEmailHandler}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              value={password}
              onChangeText={onChangePasswordHandler}
              editable={!isLoading}
              placeholderTextColor="black"
              secureTextEntry
            />
          </View>

          <View alignItems="center">
            <ButtonWithBackground
              text="Login"
              color="black"
              onPress={onSubmitFormHandler}
              disabled={isLoading}
            />
          </View>

          <View alignItems="center">
            <SmallButton text="Forgot Password?" />

            <View style={styles.smallText}>
              <Text color="black"> Don't have an account yet?</Text>
              </View>
              <SmallButton
                text="Sign up"

                onPress={() => navigation.navigate('Registration')}
              />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'#FFF1ED',

  },

  TextInput: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    color:'black'
  },

  inputView: {
    borderColor: 'grey',
    color: 'black',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 35,
    marginHorizontal: 20,
    marginVertical: 10,
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
