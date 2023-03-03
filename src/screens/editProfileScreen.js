import { StyleSheet, View, TextInput  } from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import styles from '../css/main.css'


const EditProfileScreen = ({navigation}) => {
  const [selected, setSelected] = React.useState([]);

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
  
    return (
        <SafeAreaView>
            <ScrollView>
                <Appbar.Header>
                <Appbar.Action
                    icon="arrow-left-thick"
                    onPress={() => navigation.navigate('HomeScreen')}
                />
                <Appbar.Content
                    title="Settings"
                    color="#FF356B"
                    titleStyle={{fontWeight: 'bold'}}
                />
                </Appbar.Header>

                <View style={styles.container_edit}>
                <Text style={styles.bigText_settings}>Account Info</Text>      


                <Text style={styles.bigText_settings}> Lifestyle </Text>

            <Text style={styles.bigText_settings}> Zodiac Sign </Text>
            <MultipleSelectList 
            setSelected={(val) => setSelected(val)} 
            data={data_zodiac} 
            save="value"
            label="Selected"
            />

          <Text style={styles.bigText_settings}> Communication style</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_communication} 
          save="value" 
          label="Selected"
          />

          <Text style={styles.bigText_settings}> Workout</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_workout} 
          save="value"
          label="Selected"
          />

          <Text style={styles.bigText_settings}> Drinking</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_drinking} 
          save="value"
          label="Selected"
          />

          <Text style={styles.bigText_settings}> Smoking</Text>
          <MultipleSelectList 
          setSelected={(val) => setSelected(val)} 
          data={data_smoking} 
          save="value"
          label="Selected"
          />
       
                </View>          

            </ScrollView>
        </SafeAreaView>
    );
};


  
  export default EditProfileScreen;
  
