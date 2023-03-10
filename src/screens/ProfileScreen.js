import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
import {useEffect} from 'react';
import {Avatar} from 'react-native-paper';
import ButtonWithBackground2 from '../components/buttonWithBackground2';
import { useNavigation } from "@react-navigation/native";
import storage from "@react-native-firebase/storage";
import DocumentPicker from "react-native-document-picker";

const ProfileScreen = () => {
  const baseUrl = 'https://y2ylvp.deta.dev/users';

  const navigation = useNavigation()


  const [age, setAge] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [gender, setGender] = useState([]);
  const [image, setImage] = useState(null);


  const selectImage = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory'
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setImage(res);
    } catch (err) {
      setImage(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const uploadImage = async () => {
    const uri = image[0]["fileCopyUri"];
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    await storage().ref(filename).putFile(uri);

    const profilePicRef = storage().ref(filename);
    const url = await profilePicRef.getDownloadURL()

    console.log(url)
    return url;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('id_token');

      const response = await fetch(`${baseUrl}/me`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      setName(res['name']);
      setEmail(res['email']);
      setAge(res['age']);

      if (res['gender'] === 'm') {
        setGender('Male');
      }
      if (res['gender'] === 'f') {
        setGender('Female');
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <View style={styles.container1}>
      <ScrollView>
        <View style={styles.topContainer}></View>
        <View style={{alignItems: 'center'}}>
          <View style={styles.circle}>
            <Avatar.Icon
              size={100}
              icon={'account'}
              backgroundColor={'black'}
              style={{
                width: 130,
                height: 130,
                left: 10,
                top: 80,
                borderRadius: 100,
                marginTop: -70,
              }}></Avatar.Icon>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>{name}</Text>
          <Text
            style={{
              bottom: 55,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'grey',
              paddingBottom:5,
            }}>
            {' '}
            {age}, {gender}
          </Text>
        </View>

        <View style={{paddingLeft: 110, paddingTop:0,}}>
            <ButtonWithBackground2
              text="Change Photo"
              onPress={async()=>{
                const token = await AsyncStorage.getItem('id_token');
                selectImage().then(()=>{
                  if(image) {
                    try {
                      uploadImage().then(async (profilePicUrl) => {
                        const response = await axios.put(`${baseUrl}/update`, {
                            profilePicUrl
                          },
                          {
                            headers: {
                              Authorization: 'Bearer ' + token,
                              'Content-Type': 'application/json',
                            },
                          });
                        if (response.status == 200) {
                          alert('Profile picture changed successfully.')
                        } else {
                          throw new Error('An error has occurred');
                        }
                      });
                    } catch (error) {
                      throw Error(error)
                    }
                  }
                })
              }}
            />
          </View>

          <View style={{paddingLeft: 110,paddingTop:10,}}>
            <ButtonWithBackground2
              text="Preference"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>

          <View style={{paddingLeft: 110,paddingTop:10,}}>
            <ButtonWithBackground2
              text="Interests"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>

          <View style={{paddingLeft: 110,paddingTop:10,}}>
            <ButtonWithBackground2
              text="Settings"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>

          <View style={{paddingLeft: 110,paddingTop:10}}>
            <ButtonWithBackground2
              text="Log out"
              onPress={async() => {
                const token = await AsyncStorage.getItem("id_token");
                await fetch(`https://y2ylvp.deta.dev/delete_from_pool`, {
                  method: "POST",
                  headers: {
                    'Authorization': 'Bearer ' + token,
                    "Content-Type": "application/json",
                  },
                });
                await AsyncStorage.setItem('id_token', '');
                navigation.navigate('Login')
              }}
            />
          </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fe8196',
    height: 150,
    width: '100%',
    padding: 10,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'white',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
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
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    alignItems: 'center',
    bottom: 70,
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
    color:'black',
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

export default ProfileScreen;
