import { StyleSheet, View,} from 'react-native';
import SmallButton from '../components/smallButton';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState, useEffect} from 'react';
import { TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Modal, Portal, Provider } from 'react-native-paper';
import EncryptedStorage from 'react-native-encrypted-storage';
import ButtonWithBackground3 from '../components/buttonWithBackground3';
import { useNavigation } from '@react-navigation/native';





const baseUrl = 'https://y2ylvp.deta.dev/users';





export default function SettingsScreen () {
  const [text, setText] = React.useState("");
  const [value, setValue] = React.useState('');

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);



  const [age, setAge] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState([]);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const fetchData = async () => {
    try {
      const token = await EncryptedStorage.getItem('id_token');

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
      setProfile(res['profilePicUrl']);

      console.log(profile)


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

  useEffect(() => {
    fetchData();
  }, [])

  const navigation=useNavigation();

    return (
        <SafeAreaView>
            <ScrollView>
                <Appbar.Header>
                <Appbar.Action
                    icon="arrow-left-thick"
                    onPress={() => navigation.goBack()}
                />
                <Appbar.Content
                    title="Settings"
                    color="#FF356B"
                    titleStyle={{fontWeight: 'bold'}}
                />
                </Appbar.Header>

                <View style={styles.container}>
                <Text style={styles.bigText}>Account Settings</Text>
                
               
                <TextInput
                  
                  style={styles.inputView}
                  placeholder= {`Name     ${name}`}
                  placeholderTextColor="black"
                  editable={false} />
                
                <TextInput
                    style={styles.inputView}
                    placeholder= {`Email     ${email}`}
                    placeholderTextColor="black"
                    editable={false}/>

                




                






                <Text style={styles.bigText}>Contact us</Text>
                <TextInput
                    style={styles.inputView}
                    label="Help & Support"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>


                  <TextInput
                    style={styles.inputView}
                    label="Delete account"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  };


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    backgroundColor: '#FFF1ED',
    paddingTop: 15,
    flex: 1,
  },

  TextInput: {
    height: 35,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
  },

  inputView: {
    borderBottomWidth: 2,
    marginHorizontal: 30,
    marginLeft: 10,
    borderBottomColor: 'grey',
    backgroundColor: '#FFF1ED',
  },

    
    title: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 50,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginBottom: 50,
      marginTop: 100,
    },

    bigText: {
      color: 'black',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      fontSize: 20,
      marginTop: 10,
      marginLeft: 0,
      marginBottom: 5,
      justifyContent: 'center',
    },

    smallerText: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 17,
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 20,
      justifyContent: 'center',
    },

   

    altTitle: {
      fontFamily: 'Roboto',
      fontSize: 20,
      fontWeight: 'bold',
      borderWidth: 10,
      flex: 1,
    },
  });



