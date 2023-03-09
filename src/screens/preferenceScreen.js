import {StyleSheet, View, TextInput} from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';

const baseUrl = 'https://y2ylvp.deta.dev';


const PreferenceScreen = ({navigation}) => {
  const [value, setValue] = React.useState('');

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


  return (
    <SafeAreaView>
      <ScrollView>
        <Appbar.Header>
          <Appbar.Action
            icon="arrow-left-thick"
            onPress={() => navigation.navigate('Registration')}
          />
          <Appbar.Content
            title="Preferences"
            color="#FF356B"
            titleStyle={{fontWeight: 'bold'}}
          />
        </Appbar.Header>

        <View style={styles.container}>
          <Text style={styles.smallText}>Distance preference</Text>

         
          <View style={styles.inputView}>
          <TextInput
              style={styles.TextInput}
              placeholder="Distance"/></View>

          <Text style={styles.smallerText}>
            Only show people in this range {' '} 
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} /></Text>

          <View style={{paddingTop: 20,}}>
          <Text style={styles.smallText}>Sex preference</Text>
          </View>

          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: 'male',
                label: 'Male',
              },
              {
                value: 'female',
                label: 'Female',
              },
            ]}
            style={styles.group}
          />

          <View style={{paddingTop: 20,}}>
          <Text style={styles.smallText}>Age preference</Text>
          </View>

          <View style={styles.inputView}>
          <TextInput
              style={styles.TextInput}
              placeholder="Min Age"/></View>
          
          <View style={styles.inputView}>
          <TextInput
              style={styles.TextInput}
              placeholder="Max Age"/></View>


          <Text style={styles.smallerText}>
            Only show people in this range{' '}
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </Text>
          <View style={{paddingTop: 150, paddingLeft: 180}}>
          <ButtonWithBackground
            text="Next"
            onPress={() => navigation.navigate('Interest')}
          />
        </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    
    paddingLeft: 10,
    paddingRight:10,
    backgroundColor:'#FFF1ED',
    paddingTop: 15,

  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    marginLeft: 5,
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

  smallText: {
    fontWeight: 'bold',
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

  
  inputView: {
    borderColor: 'grey',
    color: 'black',
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 3,
    marginHorizontal: 10,
    marginLeft: 0,
    marginTop: 5,
  },
 

  altTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 10,
    flex: 1,
  },
});

export default PreferenceScreen;
