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
import Icon from 'react-native-vector-icons/FontAwesome';




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
            <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                alignSelf: 'flex-start',
                left: 5,
                paddingTop: 20,
              }}>
              <Icon name={'arrow-left'} size={30} color={'#C73866'}/>
            </TouchableOpacity>
          </View>
      <View>
            <Text style={styles.title}>Settings</Text>
          </View>

             
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
    height: 800,
    backgroundColor: '#1b1b1b',
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
    color: '#C73866',
    fontFamily: 'Roboto-Italic',
    fontSize: 30,
    constterSpacing: 1,
    marginBottom: 20,
    marginTop: 30,
    paddingLeft: 10,
  },
    bigText: {
      color: '#b1b1b1',
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



