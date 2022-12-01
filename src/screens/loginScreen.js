import { StyleSheet, Text, View, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';
import axios from 'axios';
import { SafeAreaView,ScrollView } from 'react-native';

const baseUrl='https://y2ylvp.deta.dev';

export default function LoginScreen({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onSubmitFormHandler = async (event) => {
    if (!email.trim() || !password.trim() ) {
      alert("email or passoword is invalid");
      return;
    };


  setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/login`, {
       email,
       password,
      });
       if (response.status == 200) {
            navigation.navigate('Home');
          }
        else {
          throw new Error("Email or Password incorrect");
       }
           
        
      }catch(error) {
          alert("Email or Password incorrect")
          setIsLoading(false);
  }};
    
    





   
    return (
      <SafeAreaView>
        <ScrollView>
          
        <View style={styles.container}>
            
            <Text style={styles.title}>
              Tingle</Text>
           
            <View style={styles.inputView}>
                <TextInput 
                style={styles.TextInput}
                value={email}
                placeholder="Email or phone number"
                placeholderTextColor='color'
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
                placeholderTextColor="color"
                secureTextEntry
                />
            </View>
            
            
            {/* Login button*/}
            
            <ButtonWithBackground
             text="Login" 
             color='black' 
             onPress={onSubmitFormHandler}
             disabled={isLoading}
             />

            {/* Forgot Password Button*/} 
            <SmallButton text="Forgot Password?"/>
            
            <View style={styles.smallText}>
            <Text stlye={styles.smallText}> Don't have an account yet?</Text>
            <SmallButton 
            text="Sign up"
            
            onPress={() => navigation.navigate('Registration')}/>
            

            </View>
        </View>
        </ScrollView>
        </SafeAreaView>

    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 200
      
      
    },
    TextInput: {
      height:50,
      flex: 1,
      padding: 10,
      marginleft:20,
      justifyContent: 'center',
    },
    
      
    inputView:{
      borderColor: 'grey',
      borderWidth: 2,
      borderRadius: 3,
      width: '70%',
      marginBottom: 35,
     justifyContent: 'center',
  
    },
    title:{
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 50,
      fontWeight: 'bold', 
      letterSpacing: 1, 
      marginBottom: 50,
      marginTop: 100
    },
    
    smallText: {
      color: 'black',
      fontSize: 20,
      marginTop: 100,
      marginBottom:20,
      justifyContent: 'center',
    
      
  
    },
    textFailed: {
      alignSelf: 'center',
      color: 'red',
      bottom:33,
      right:70

    },
});
  
