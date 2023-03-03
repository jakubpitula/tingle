import { StyleSheet, View } from 'react-native';
import SmallButton from '../components/smallButton';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';
import { TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Modal, Portal, Provider } from 'react-native-paper';
import styles from '../css/main.css'



const SettingsScreen = ({navigation}) => {
  const [text, setText] = React.useState("");
  const [value, setValue] = React.useState('');

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);


    return (
        <SafeAreaView>
            <ScrollView>
                <Appbar.Header>
                <Appbar.Action
                    icon="arrow-left-thick"
                    onPress={() => navigation.navigate('Home')}
                />
                <Appbar.Content
                    title="Settings"
                    color="#FF356B"
                    titleStyle={{fontWeight: 'bold'}}
                />
                </Appbar.Header>

                <View style={styles.container}>
                <Text style={styles.bigText_settings}>Account Settings</Text>

                <TextInput
                    style={styles.inputView_settings}
                    label="Phone number"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>

                <TextInput
                    style={styles.inputView_settings}
                    label="Email"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>
                
                <Text style={styles.bigText_settings}>Discovery</Text>
                
                <Text style={styles.smallerText_settings}> Location </Text>

                <Provider>
                  <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                      <Text>Option to change location</Text>
                    </Modal>
                  </Portal>
                <SmallButton 
                onPress={showModal}
                text = "Change"/>
                </Provider>

                <Text style={styles.smallerText_settings}>
                Only show people in this range{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>

                <Text style={styles.smallerText_settings}>Sex preference</Text>

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

              <Text style={styles.smallerText_settings}>Age Preference</Text>
              <Text style={styles.smallerText_settings}>
                Only show people in this range{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>
                <Text style={styles.smallerText_settings}>
                Global{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>
                <Text style={styles.smallerText_settings}>
                  Going Global will allow you to see people nearby and from around the world.
                </Text>


                <Text style={styles.bigText_settings}>Contact us</Text>
                <TextInput
                    style={styles.inputView_settings}
                    label="Help & Support"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>


                  <TextInput
                    style={styles.inputView_settings}
                    label="Delete account"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>
                






                

                </View>
            </ScrollView>
        </SafeAreaView>
    );
  };




  export default SettingsScreen;

