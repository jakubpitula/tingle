import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TextInput
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import ButtonWithBackground from '../components/buttonWithBackground';

export default function PassowordReset() {

    const[email, setEmail] = useState(null);
    const [checkValidEmail, setCheckValidEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const onChangeEmailHandler = email => {
        setEmail(email);
      };

      const handleCheckEmail = email => {
        const re = /\S+@\S+\.\S+/;
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
        setEmail(email);
        if (re.test(email) || regex.test(email)) {
          setCheckValidEmail(false);
          onChangeEmailHandler(email);
        } else {
          setCheckValidEmail(true);
        }
      };
    
    const forgotPassword = async () => {
        
        try {
            await firebase.auth().sendPasswordResetEmail(email)
            console.log('Password reset email sent successfully')
            alert("Email to reset password has been sent!")
            navigation.navigate('Login')
          } catch (error) {
            console.error(error);
          }

}


return(
    <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                alignSelf: 'flex-start',
                left: 5,
                paddingTop: 20,
              }}>
              <Icon name={'arrow-left'} size={30} color={'#C73866'}/>
            </TouchableOpacity>
          </View>
    <View style={{paddingLeft: 8 }}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.smallerText}> Enter the email associated with your account and we'll send you an email
            with instructions to reset your password </Text>
        </View>

        <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email *"
              placeholderTextColor="#b1b1b1"
              value={email}
              editable={!isLoading}
              onChangeText={handleCheckEmail}
              
            />
            {checkValidEmail ? (
            <Text style={styles.textFailed}>Not a valid email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          </View>
          <View style={{alignSelf: 'center', paddingTop: 10, paddingBottom: 40}}>
            <TouchableOpacity >
              <ButtonWithBackground
                text="Confirm"
                onPress={forgotPassword}
              />
              </TouchableOpacity>
          </View>
    </View>


)

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1b1b1b',
      width: '100%',
      padding: 10,
    },

    TextInput: {
        height: 45,
        justifyContent: 'center',
        top: 20,
        marginLeft: 5,
        color: 'white'
      },
      
      smallerText: {
        color: 'white',
        fontFamily: 'Roboto-Italic',
        fontSize: 16,
        padding: 10,
        paddingBottom: 20,
        bottom: 20,
        right: 14,
        flexWrap: 'wrap'
        
        
      },
      textFailed: {
        color: 'red',
        alignSelf: 'flex-end',
        right: 30,
      },
    
      inputView: {
        borderBottomWidth: 2,
        marginHorizontal: 30,
        marginLeft: 10,
        bottom: 20,
        borderBottomColor: '#C73866',
      },
    
      title: {
        color: '#C73866',
        fontFamily: 'Roboto-Italic',
        fontSize: 35,
        constterSpacing: 1,
        marginBottom: 20,
        paddingTop: 40,
        
      },
    
      
    
})

