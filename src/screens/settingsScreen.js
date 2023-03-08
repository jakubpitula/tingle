import { StyleSheet, View } from 'react-native';
import SmallButton from '../components/smallButton';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';
import { TouchableOpacity, Image} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Modal, Portal, Provider } from 'react-native-paper';





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
                <Text style={styles.bigText}>Account Settings</Text>

                <TextInput
                    style={styles.inputView}
                    label="Phone number"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>

                <TextInput
                    style={styles.inputView}
                    label="Email"
                    placeholderTextColor="black"
                    value={text}
                    onChangeText={text => setText(text)}/>

                <Text style={styles.bigText}>Discovery</Text>

                <Text style={styles.smallerText}> Location </Text>

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

                <Text style={styles.smallerText}>
                Only show people in this range{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>

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

              <Text style={styles.smallerText}>Age Preference</Text>
              <Text style={styles.smallerText}>
                Only show people in this range{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>
                <Text style={styles.smallerText}>
                Global{' '}
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                </Text>
                <Text style={styles.smallerText}>
                  Going Global will allow you to see people nearby and from around the world.
                </Text>


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
      backgroundColor: 'white',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
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
      fontSize: 17,
      marginTop: 0,
      marginLeft: 0,
      marginBottom: 20,
      justifyContent: 'center',
    },

    inputView: {
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 2,
      width: '100%',
      marginBottom: 0,
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

