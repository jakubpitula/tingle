import {StyleSheet, View, TextInput, TouchableOpacity, Image} from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { calledId } from './homeScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const baseUrl = "https://y2ylvp.deta.dev/users"

export default function MatchScreen() {
  const [name, setName] = useState('');
  const [profile, setProfilePic] = useState('')
  const [uid, setUid] = useState(calledId)
  const [isLoading, setIsLoading] = useState(false);



  const navigation = useNavigation();
  

  const onSubmitFormHandler = async event => {
    setIsLoading(true);
    const token = await EncryptedStorage.getItem('id_token');
    
    try{
      const response = await fetch(`${baseUrl}/friends`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid
        }),
      });

      if (response.status === 200){
        setIsLoading(false);
        setUid('');
        navigation.navigate('Home')
        } else{
          throw new Error('An error has occured');
        }

    }
    catch (error) {
      setIsLoading(false);
      throw Error(error);
    }
    
  };

  useEffect(()=>{
    fetchData();
    
  }, [profile]);

  const fetchData = async () => {
    try {
      
      const token = uid;
      console.log("Token " + uid)
     
      const response = await fetch(`https://y2ylvp.deta.dev/users/`+ uid, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      setName(res['name']);
      setProfilePic(res['profilePicUrl'])
      console.log("My pic " + profile)

    } catch (error) {
      console.error(error);
    }
  };




 

  return (
    <LinearGradient style={styles.topContainer} colors={['#fa2f77','#fe8196','#f9d0de','#FFFFFF']} start={{x: 0,y: 0}} end={{x: 0.1, y: 1.25}}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.title}>
            <Text style={styles.largeText}>Do you want to</Text>
            <Text style={styles.largeText}>match with</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.LargeCircle}>
            <Image style={styles.image} source={{ uri: profile }}/>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingLeft: 60, paddingTop: 70}}>
              <TouchableOpacity
                style={styles.smallCirlceNo}
                onPress={() => navigation.navigate('Home')}>
                  <Icon name={"times"} size={65} style={{top: 15, left: 24}} />
                </TouchableOpacity>
            </View>
            <View style={{paddingTop: 70, paddingLeft: 60}}>
              <TouchableOpacity
                style={styles.smallCirlceYes}
                onPress={onSubmitFormHandler}>
                  <Icon name={"check"} size={65} style={{top: 17, left: 19}} />
                </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fe8196',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden', // clip the image to the container
  },
  image: {
    width: 200,
    height: 200,
  },
  LargeCircle: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    backgroundColor: 'white',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
    bottom:120
  },
  image: {
    width: 200,
    height: 200,
  },
  smallCirlceNo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },
  smallCirlceYes: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'green',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },
  container1: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
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
    paddingBottom: 150,
    alignItems: 'center',
    paddingTop: 70,
    
  },
  largeText: {
    fontSize: 28,
  },
  nameText:{
    fontSize: 34,
    paddingTop:20,
    
  },
  button: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 55,
    elevation: 15,
    shadowOpacity: 80,
    width: '70%',
    color: 'black',
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
