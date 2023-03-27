import { StyleSheet, View, TextInput  } from 'react-native';
import React, { useState } from 'react'
import ButtonWithBackground1 from '../components/buttonWithBackground';
import { SafeAreaView,ScrollView } from 'react-native';
import {Text,Appbar} from 'react-native-paper';
import { List } from 'react-native-paper';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";

const baseUrl = 'https://y2ylvp.deta.dev';





const InterestScreen = ({navigation}) => {
  const [selected, setSelected] = React.useState([]);
  const [hobbies, setHobbies] = useState('');
  const [about, setAbout] = useState('');
  const [zodiac, setZodiac] = useState('');
  const [communication, setCommunication] = useState('');
  const [workout, setWorkout] = useState('');
  const [drinking, setDrinking] = useState('');
  const [smoking, setSmoking] = useState('');

  const handleCheckAbout = about => {
    setAbout(about);
  };


  const hobbies_fields = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  const zodiac_fields = [
    {key:'1', value:'Aries'},
    {key:'2', value:'Taurus'},
    {key:'3', value:'Cancer'},
    {key:'4', value:'Leo'},
    {key:'5', value:'Virgo'},
    {key:'6', value:'Libra'},
    {key:'7', value:'Scorpius'},
    {key:'8', value:'Sagittarius'},
    {key:'9', value:'Capricon'},
    {key:'10', value:'Aquarius'},
    {key:'11', value:'Pisces'},
]
const communication_fields = [
  {key:'1', value:'Big time texter'},
  {key:'2', value:'Video chatter'},
  {key:'3', value:'Phone caller'},
  {key:'4', value:'Bad texter'},
  {key:'5', value:'Better in person'},
]

const workout_fields = [
  {key:'1', value:'Gym rat'},
  {key:'2', value:'Occasionally'},
  {key:'3', value:'Never'},
]

const drinking_fields = [
  {key:'1', value:'Wine'},
  {key:'2', value:'Beer'},
  {key:'3', value:'Cocktails'},
  {key:'4', value:'Coffee'},
  {key:'5', value:'Gin'},
  {key:'6', value:'Tea'},
  {key:'7', value:'Espresso martini'},
  {key:'8', value:'Shots'},
  {key:'9', value:'Newly sober'},
  {key:'10', value:'Dont drink'},
]

const smoking_fields = [
  {key:'1', value:'Social smoker'},
  {key:'2', value:'Smoker when drinking'},
  {key:'3', value:'Non-smoker'},
  {key:'4', value:'Smoker'},

]
const [expanded, setExpanded] = React.useState(true);

  const onSubmitFormHandler = async event => {
    const token = await EncryptedStorage.getItem('id_token');
    try {
      const response = await axios.post(`${baseUrl}/users/interests`, {
          hobbies,
          about,
          zodiac,
          communication,
          workout,
          drinking,
          smoking,
        },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          }
        });
      if (response.status == 200) {
        setHobbies('');
        setZodiac('');
        setAbout('');
        setCommunication('');
        setWorkout('');
        setDrinking('');
        setSmoking('');

        navigation.navigate('Home');
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      throw Error(error);
    }
  };
    return(

        <SafeAreaView>
            <ScrollView>

            <Appbar.Header>
                <Appbar.Action icon='arrow-left-thick'  onPress={() => navigation.navigate('Preference')}/>
                <Appbar.Content title="Interests" color='#FF356B' titleStyle={{fontWeight: 'bold'}}/>
            </Appbar.Header>


            <View style={styles.container}>
            <Text style={styles.smallText}> Hobbies </Text>
            <MultipleSelectList
            setSelected={(val) => setHobbies(val)}
            data={hobbies_fields}
            save="value"
            label="Categories"/>


            <Text style={styles.smallText}> About me </Text>
            <View style={styles.inputView}>
              <TextInput
              style={styles.TextInputAboutMe}
              placeholder="50000"
              placeholderTextColor='color'
              value={about}
              onChangeText={handleCheckAbout}
              />
            </View>

            <Text style={styles.smallText}> Lifestyle </Text>

            <Text style={styles.smallerText}> Zodiac Sign </Text>
            <SelectList
            setSelected={(val) => setZodiac(val)}
            data={zodiac_fields}
            save="value"
            label="Selected"
            />

          <Text style={styles.smallerText}> Communication style</Text>
          <MultipleSelectList
          setSelected={(val) => setCommunication(val)}
          data={communication_fields}
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Workout</Text>
          <MultipleSelectList
          setSelected={(val) => setWorkout(val)}
          data={workout_fields}
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Drinking</Text>
          <MultipleSelectList
          setSelected={(val) => setDrinking(val)}
          data={drinking_fields}
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Smoking</Text>
          <MultipleSelectList
          setSelected={(val) => setSmoking(val)}
          data={smoking_fields}
          save="value"
          label="Selected"
          />

          <View style={{paddingLeft: 180}}>
            <ButtonWithBackground1
              text="Next"
              onPress={onSubmitFormHandler}
            />
          </View>

              </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor:'#FFF1ED',
    paddingTop: 15,
    justifyContent: 'flex-end',
  },

TextInputAboutMe: {
    height:70,
    width: '100%',
    flex: 1,
    paddingBottom: 40,
    marginBottom:0,
    justifyContent: 'center',
    borderColor: 'grey',
  },

  inputView:{
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 15,
    width: '100%',
    marginBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
  },

  smallText: {
    fontWeight:'bold',
    color: 'black',
    fontSize: 20,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 10,
    justifyContent: 'center',
  },

  smallerText: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 15,
    marginTop: 0,
    marginLeft: 0,
    justifyContent: 'center',
  },

});


export default InterestScreen;
