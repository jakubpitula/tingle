import {StyleSheet, View, TextInput} from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';
import styles from '../css/main.css'

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

        <View style={styles.container_preference}>
          <Text style={styles.smallText}>Distance preference</Text>

          

          <Text style={styles.smallerText_preference}>
            Only show people in this range{' '}
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </Text>

          <View style={{paddingTop: 50,}}>
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

          <View style={{paddingTop: 50,}}>
          <Text style={styles.smallText}>Age preference</Text>
          </View>


          <Text style={styles.smallerText_preference}>
            Only show people in this range{' '}
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </Text>
          <View style={{paddingTop: 200, paddingLeft: 140}}>
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



export default PreferenceScreen;
