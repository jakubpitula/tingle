import { StyleSheet, View, TextInput  } from 'react-native';
import React, { useState } from 'react'
import ButtonWithBackground1 from '../components/buttonWithBackground';
import { SafeAreaView,ScrollView } from 'react-native';
import {Text,Appbar} from 'react-native-paper';
import { List } from 'react-native-paper';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list'
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "axios";
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';

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
      {key:'1', value:'Sports'},
      {key:'2', value:'Music'},
      {key:'3', value:'Photography'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Gaming'},
      {key:'6', value:'Nature'},
      {key:'7', value:'Socializing'},
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
            <LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.9, y: -0.6 }}>
    <Svg style={{ top: 20}}
      width={500}
      height={130}
      viewBox="0 0 1440 320">
      <Path
        fill="#1b1b1b"
        fill-opacity="1" d="M0,64L12.6,101.3C25.3,139,51,213,76,213.3C101.1,213,126,139,152,112C176.8,85,202,107,227,128C252.6,149,278,171,303,176C328.4,181,354,171,379,154.7C404.2,139,429,117,455,96C480,75,505,53,531,48C555.8,43,581,53,606,90.7C631.6,128,657,192,682,208C707.4,224,733,192,758,197.3C783.2,203,808,245,834,250.7C858.9,256,884,224,909,208C934.7,192,960,192,985,208C1010.5,224,1036,256,1061,272C1086.3,288,1112,288,1137,272C1162.1,256,1187,224,1213,192C1237.9,160,1263,128,1288,122.7C1313.7,117,1339,139,1364,133.3C1389.5,128,1415,96,1427,80L1440,64L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"></Path>
    </Svg>
  </LinearGradient>
           


            <View style={styles.container}>
              <Text style={styles.title}> Interests</Text>
              <Text style={styles.headerText}>Select a few of the interests that apply to you: </Text>
            <Text style={styles.smallText}> Hobbies </Text>
            
            <MultipleSelectList
            setSelected={(val) => setHobbies(val)}
            data={hobbies_fields}
            save="value"
            boxStyles={{backgroundColor:'#6d6d6d'}}
            dropdownItemStyles={{backgroundColor:'#6d6d6d'}}
            label="Categories"/>
            


            <Text style={styles.smallText}> About me </Text>
            <View style={styles.inputView}>
              <TextInput
              style={styles.TextInputAboutMe}
              placeholder="50000"
              placeholderTextColor='#b1b1b1'
              value={about}
              onChangeText={handleCheckAbout}
              />
            </View>

            <Text style={styles.smallText}> Lifestyle </Text>

            <Text style={styles.smallerText}> Zodiac Sign </Text>
            <SelectList
            setSelected={(val) => setZodiac(val)}
            data={zodiac_fields}
            boxStyles={{backgroundColor:'#6d6d6d'}}
            dropdownItemStyles={{backgroundColor:'#6d6d6d'}}
            save="value"
            label="Selected"
            />

          <Text style={styles.smallerText}> Communication style</Text>
          <MultipleSelectList
          setSelected={(val) => setCommunication(val)}
          data={communication_fields}
          save="value"
          boxStyles={{backgroundColor:'#6d6d6d'}}
          dropdownItemStyles={{backgroundColor:'#6d6d6d'}}
          label="Selected"
          />
        
        {/* <View>
          <Text style={styles.smallerText}> Workout</Text>
          <MultipleSelectList
          setSelected={(val) => setWorkout(val)}
          data={workout_fields}
          boxStyles={{backgroundColor:'#6d6d6d'}}
          dropdownItemStyles={{backgroundColor:'#6d6d6d'}}
          save="value"
          label="Selected"
          />
          </View> */}

          <Text style={styles.smallerText}> Drinking</Text>
          <MultipleSelectList
          setSelected={(val) => setDrinking(val)}
          data={drinking_fields}
          boxStyles={{backgroundColor:'#6d6d6d'}}
          dropdownItemStyles={{backgroundColor:'#6d6d6d'}}
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Smoking</Text>
         
          <MultipleSelectList
         backgroundColor={'white'}
          setSelected={(val) => setSmoking(val)}
          data={smoking_fields}
          boxStyles={{backgroundColor:'#6d6d6d'}}
          dropdownItemStyles={{backgroundColor:'#6d6d6d'}}
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
    backgroundColor: '#1b1b1b',
    
  },

  smallerText: {
    color: 'white',
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    justifyContent: 'center',
  },

  headerText: {
    color: 'white',
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    bottom: 20,

    justifyContent: 'center',
  },

  title: {
    color: '#C73866',
    fontFamily: 'Roboto-Italic',
    fontSize: 40,
    
    constterSpacing: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },

TextInputAboutMe: {
    height:70,
    width: '100%',
    flex: 1,
    paddingBottom: 40,
    marginBottom:0,
    justifyContent: 'center',
    
  },

  inputView:{
    borderWidth: 2,
    borderRadius: 15,
    width: '100%',
    marginBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor:'#6d6d6d'
  },

  smallText: {
    fontWeight:'bold',
    color: 'white',
    fontSize: 20,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 10,
    justifyContent: 'center',
  },

 

});


export default InterestScreen;
