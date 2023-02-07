import { StyleSheet, View, TextInput  } from 'react-native';
import SquareButton from '../components/squareButton';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';


const SettingsScreen = ({navigation}) => {
    const [value, setValue] = React.useState('');

    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

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

                <View style={styles.container}>
                <Text style={styles.bigText}>Account Settings</Text>
// vertical buttons
                <View style={{paddingLeft: 100, marginBottom: 100}}>
            	<SquareButton
                    text="Phone number"
                    onPress={() => navigation.navigate('')} //In brackets Phone number screen or pop up modal
                />
                <SquareButton
                    text="Connect accounts"
                    onPress={() => navigation.navigate('')} //In brackets Connect acocunts screen or pop up modal
                />
                <SquareButton
                    text="Email address"
                    onPress={() => navigation.navigate('')} // In brackets Email address screen or pop up modal
                />
                </View>
//end of buttons

//Discovery
                <Text style={styles.bigText}>Discovery</Text>

                <Text style={styles.smallerText}>Age range</Text>
                <MultiRangeSlider
                    min = {18}
                    max = {99}
                    onChange = {({min, max}) => console.log('min = ${min}, max = ${max}')} />
                <Text style={styles.smallerText}>
              	  Only show people in this range{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>

//Button for gender
                <Text style={styles.smallerText}>Sex preference</Text>
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


                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      paddingLeft: 30,
      paddingRight: 50,
      paddingTop: 30,
    },

    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,

      justifyContent: 'center',
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
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 20,
      justifyContent: 'center',
    },

    smallerText: {
      color: 'black',
      fontFamily: 'Roboto',
      fontSize: 15,
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 20,
      justifyContent: 'center',
    },

    inputView: {
      borderColor: 'grey',
      borderWidth: 2,
      borderRadius: 3,
      width: '90%',
      marginBottom: 35,
      alignContent: 'center',
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

  export default SettingsScreen;

