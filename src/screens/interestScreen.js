import { StyleSheet, View, TextInput  } from 'react-native';
import React, { useState } from 'react'
import ButtonWithBackground from '../components/buttonWithBackground';
import SmallButton from '../components/smallButton';

import { SafeAreaView,ScrollView } from 'react-native';

import {Text,Appbar} from 'react-native-paper';
import { List } from 'react-native-paper';
import { MultipleSelectList } from 'react-native-dropdown-select-list'


 



const InterestScreen = ({navigation}) => {

  const [selected, setSelected] = React.useState([]);
  
  const data1 = [
      {key:'1', value:'Mobiles'},
      {key:'2', value:'Appliances'},
      {key:'3', value:'Cameras'},
      {key:'4', value:'Computers'},
      {key:'5', value:'Vegetables'},
      {key:'6', value:'Diary Products'},
      {key:'7', value:'Drinks'},
  ]

  const data_zodiac = [
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
const data_communication = [
  {key:'1', value:'Big time texter'},
  {key:'2', value:'Video chatter'},
  {key:'3', value:'Phone caller'},
  {key:'4', value:'Bad texter'},
  {key:'5', value:'Better in person'},
]

const data_workout = [
  {key:'1', value:'Gym rat'},
  {key:'2', value:'Occasionally'},
  {key:'3', value:'Never'},
]

const data_drinking = [
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

const data_smoking = [
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

            
            
            <Text style={styles.smallText}> Hobbies </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={data1} 
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
            data={data_zodiac} 
            save="value"
            label="Selected"
            />

          <Text style={styles.smallerText}> Communication style</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_communication} 
          save="value" 
          label="Selected"
          />

          <Text style={styles.smallerText}> Workout</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_workout} 
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Drinking</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_drinking} 
          save="value"
          label="Selected"
          />

          <Text style={styles.smallerText}> Smoking</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_smoking} 
          save="value"
          label="Selected"
          />




            </ScrollView>
        </SafeAreaView>
       
    )
}

const styles = StyleSheet.create({
TextInputAboutMe: {
    height:100,
    flex: 1,
    padding: 10,
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

  smallText: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    marginBottom:10,
    justifyContent: 'center',
    
  },

});


export default InterestScreen;