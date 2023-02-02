import { StyleSheet, View, TextInput  } from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import React, { useState } from "react";
import { SafeAreaView,ScrollView } from 'react-native';
import axios from 'axios';
import {Appbar} from 'react-native-paper';


const baseUrl= 'https://y2ylvp.deta.dev';



export default function RegistrationScreen({navigation})  {

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conf_pass, setConf_pass] = useState("");
  const [age,setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeFirstNameHandler = (first_name) => {
    setFirstName(first_name);
  };

  const onChangeLastNameHandler = (last_name) => {
    setLastName(last_name);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

  const onChangeConf_PassHandler = (conf_pass) => {
    setConf_pass(conf_pass);
  };
  
  const onChangeAgeHandler = (age) => {
    setAge(age);
  }
  
  const onChangeGenderHandler = (gender) => {
    setGender(gender);
  }

  const onSubmitFormHandler = async (event) => {
    if (!first_name.trim() || !last_name.trim() || !email.trim() || !conf_pass.trim() ) {
      alert("Name or Email is invalid");
      return;
    };
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseUrl}/signup`, {
        first_name,
        last_name,
        email,
        password,
        conf_pass,
        age,
        gender

      });
      if (response.status == 200) {
        alert(` You have created: ${JSON.stringify(response.data)}`);
        setIsLoading(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setAge('');
        setGender('');
        
        navigation.navigate('Preference')
      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setIsLoading(false);
    }
  };



    return(
      
      <><Appbar.Header>
        <Appbar.Action icon='arrow-left-thick' onPress={() => navigation.navigate('Login')} />
        <Appbar.Content title="Registration" color='#FF356B' titleStyle={{ fontWeight: 'bold' }} />

      </Appbar.Header>
      <SafeAreaView>
          <ScrollView style={styles.container}>
          


            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="First Name *"
                placeholderTextColor='black'
                value={first_name}
                editable={!isLoading}
                onChangeText={onChangeFirstNameHandler}
                />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Last Name *"
                value={last_name}
                placeholderTextColor='black' 
                editable={!isLoading}
                onChangeText={onChangeLastNameHandler}/>
            </View>


            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email *"
                placeholderTextColor='black' 
                value={email}
                editable={!isLoading}
                onChangeText={onChangeEmailHandler}
                
                />
            </View>

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password *"
                placeholderTextColor='black'
                secureTextEntry 
                value={password}
                editable={!isLoading}
                onChangeText={onChangePasswordHandler}/>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password *"
                placeholderTextColor='black'
                secureTextEntry 
                value={conf_pass}
                editable={!isLoading}
                onChangeText={onChangeConf_PassHandler}
                />
            </View>
            
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Age"
                placeholderTextColor='black'
                secureTextEntry 
                value={age}
                editable={!isLoading}
                onChangeText={onChangeAgeHandler}
                />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Gender"
                placeholderTextColor='black'
                secureTextEntry 
                value={gender}
                editable={!isLoading}
                onChangeText={onChangeGenderHandler}
                />
            </View>
            <View style={{ paddingLeft: 140, bottom: 20}}>
              <ButtonWithBackground
                text='Confirm'
                onPress={onSubmitFormHandler}
                disabled={isLoading}/>
            </View>
            





          </ScrollView>
        </SafeAreaView></>

    )

        
        
    
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 10,
    paddingTop:5,
    paddingBottom:50,
    
  },
    
    TextInput: {
      height:50,
      flex: 1,
      padding: 10,
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
    inputView:{
      borderColor: 'grey',
      borderWidth: 2,
      borderRadius: 3,
      width: '90%',
      marginBottom: 35,
      alignContent: 'center',
     justifyContent: 'center',
    },

    altTitle:{
        fontFamily: 'Roboto',
        fontSize: 20,
        fontWeight: 'bold',
        borderWidth: 10,
        flex: 1,
    }
  
    
});


