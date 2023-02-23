import {StyleSheet, Text, View, TextInput, Image} from 'react-native';
import React, {useState} from 'react';
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';
import axios from 'axios';
import style from '../css/loginScreen.css';

import {SafeAreaView, ScrollView} from 'react-native';

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
        );
      if (response.status == 200) {
        navigation.navigate('Home');
      } else {
        throw new Error('Email or Password incorrect');
      }
    } catch (error) {
      alert('Email or Password incorrect');
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={style.container}>
         <Text style={style.title}> Tingle</Text>

          <View style={style.inputView}>
            <TextInput
              style={style.TextInput}
              value={email}
              placeholder="Email o number"
              placeholderTextColor="black"
              onChangeText={onChangeEmailHandler}
              editable={!isLoading}
            />
          </View>

          <View style={style.inputView}>
            <TextInput
              style={style.TextInput}
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

            <View style={style.smallText}>
              <Text color="black"> Don't have an account yet?</Text>
              </View>
              <SmallButton
                text="Sign up"
                
                onPress={() => navigation.navigate('Registration')}
              />
<SmallButton
                text="preferences "
                
                onPress={() => navigation.navigate('Preference')}
              />

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


