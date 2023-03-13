import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function MatchScreen() {
  const [name, setName] = useState([]);
  const navigation = useNavigation();

  const onSubmitFormHandler = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.topContainer}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.title}>
            <Text style={styles.largeText}>Do you want to</Text>
            <Text style={styles.largeText}>match with</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.LargeCircle}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingLeft: 60, paddingTop: 70}}>
              <TouchableOpacity
                style={styles.smallCirlceNo}
                onPress={() => navigation.navigate('Home')}></TouchableOpacity>
            </View>
            <View style={{paddingTop: 70, paddingLeft: 60}}>
              <TouchableOpacity
                style={styles.smallCirlceYes}
                onPress={onSubmitFormHandler}></TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fe8196',
    height: '100%',
    width: '100%',
    padding: 10,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden', // clip the image to the container
  },
  image: {
    width: 200,
    height: 200,
  },
  LargeCircle: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    backgroundColor: 'white',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },

  smallCirlceNo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },
  smallCirlceYes: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'green',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },
  container1: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    color: 'black',
  },

  inputView: {
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
    marginBottom: 25,
    marginHorizontal: 20,
  },
  title: {
    paddingBottom: 150,
    alignItems: 'center',
    paddingTop: 70,
  },
  largeText: {
    fontSize: 30,
  },
  button: {
    backgroundColor: '#fff',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'white',
    borderWidth: 2,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 55,
    elevation: 15,
    shadowOpacity: 80,
    width: '70%',
    color: 'black',
  },

  smallText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  textFailed: {
    alignSelf: 'center',
    color: 'red',
    bottom: 33,
    right: 70,
  },
});
