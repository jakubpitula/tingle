import { StyleSheet, View, TextInput  } from 'react-native';
import React, { useState } from 'react'
import ButtonWithBackground1 from '../components/buttonWithBackground';
import { SafeAreaView,ScrollView } from 'react-native';
import {Text,Appbar} from 'react-native-paper';
import { List } from 'react-native-paper';
import { MultipleSelectList } from 'react-native-dropdown-select-list'

const baseUrl = 'https://y2ylvp.deta.dev';



const InterestScreen = ({navigation}) => {

  const [selected, setSelected] = React.useState([]);
  
  const hobbies = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  const zodiac = [
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
const communication = [
  {key:'1', value:'Big time texter'},
  {key:'2', value:'Video chatter'},
  {key:'3', value:'Phone caller'},
  {key:'4', value:'Bad texter'},
  {key:'5', value:'Better in person'},
]

const workout = [
  {key:'1', value:'Gym rat'},
  {key:'2', value:'Occasionally'},
  {key:'3', value:'Never'},
]

const drinking = [
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

const smoking = [
  {key:'1', value:'Social smoker'},
  {key:'2', value:'Smoker when drinking'},
  {key:'3', value:'Non-smoker'},
  {key:'4', value:'Smoker'},
  
]







    const [expanded, setExpanded] = React.useState(true);


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
            setSelected={(val) => setSelected(val)} 
            data={hobbies} 
            save="value"
            onSelect={() => alert(selected)} 
            label="Categories"/>
        

            <Text style={styles.smallText}> About me </Text>
            <View style={styles.inputView}>
              <TextInput 
              style={styles.TextInputAboutMe}
              placeholder="50000"
              placeholderTextColor='color'
              secureTextEntry/>
            </View>

            <Text style={styles.smallText}> Lifestyle </Text>

            <Text style={styles.smallerText}> Zodiac Sign </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={zodiac} 
            save="value"
            label="Selected"
            />

          <Text style={styles.smallerText}> Communication style</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={communication} 
          save="value" 
          label="Selected"
          />

          <Text style={styles.smallerText}> Workout</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={workout} 
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Drinking</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={drinking} 
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Smoking</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={smoking} 
          save="value"
          label="Selected"
          />

          <View style={{paddingLeft: 180}}>
            <ButtonWithBackground1
              text="Next"
              onPress={() => navigation.navigate('Home')}
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