import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text, Appbar} from 'react-native-paper';
import {SegmentedButtons, Button, Switch} from 'react-native-paper';
import React, {useState} from 'react';
import EncryptedStorage from "react-native-encrypted-storage";
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';


const baseUrl = 'https://y2ylvp.deta.dev';

const PreferenceScreen = ({navigation}) => {
  const [value, setValue] = React.useState('');

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const [distance, setDistance] = useState('');
  const [sex, setSex] = useState('');
  const [age_min, setAgeMin] = useState('');
  const [age_max, setAgeMax] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [checkDistance, setCheckDistance] = useState(false);
  const [checkSex, setCheckSex] = useState(false);
  const [checkAgeMin, setCheckAgeMin] = useState(false);
  const [checkAgeMax, setCheckAgeMax] = useState(false);
  const [checkAgeDiff, setCheckAgeDiff] = useState(false);

  const onChangeDistanceHandler = distance => {
    setDistance(distance);
  };

  const onChangeSexHandler = sex => {
    setSex(sex);
  };

  const onChangeAgeMinHandler = age_min => {
    setAgeMin(age_min);
  };

  const onChangeAgeMaxHandler = age_max => {
    setAgeMax(age_max);
  };

  const handleCheckDistance = distance => {
    const pattern = /^(?:100|[1-9][0-9]?|0)$/;

    setDistance(distance);
    if (!pattern.test(distance)) {
      setCheckDistance(true);
      onChangeDistanceHandler(distance);
    } else {
      setCheckDistance(false);
    }
  };

  const handleCheckSex = sex => {
    setSex(sex);
    if (!sex.trim()) {
      setCheckSex(true);
      onChangeSexHandler(sex);
    } else {
      setCheckSex(false);
    }
  };

  const handleCheckAgeMin = age_min => {
    const pattern = /^(?:100|[1-9][0-9]?|0)$/;

    // Check if age_min is greater than age_max
    if (parseInt(age_min) > parseInt(age_max) && age_min && age_max) {
      setCheckAgeDiff(true)
    }
    else {
      setCheckAgeDiff(false)
    }

    setAgeMin(age_min);
    if (!pattern.test(age_min)) {
      setCheckAgeMin(true);
      onChangeAgeMinHandler(age_min);
    } else {
      setCheckAgeMin(false);
    }
  };

  const handleCheckAgeMax = age_max => {
    const pattern = /^(?:100|[1-9][0-9]?|0)$/;

    // Check if age_max is less than age_min
    if (parseInt(age_max) < parseInt(age_min)) {
      setCheckAgeDiff(true)
    }
    else {
      setCheckAgeDiff(false)
    }

    setAgeMax(age_max);
    if (!pattern.test(age_max)) {
      setCheckAgeMax(true);
      onChangeAgeMaxHandler(age_max);
    } else {
      setCheckAgeMax(false);
    }
  };

  const onSubmitFormHandler = async event => {
    setIsLoading(true);
    const token = await EncryptedStorage.getItem('id_token');
    try {
      const response = await axios.post(`${baseUrl}/users/preferences`, {
        distance,
        sex,
        age_min,
        age_max,
      },
        {
          headers: {
            Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
          }
        });
      if (response.status == 200) {
        setIsLoading(false);
        setDistance('');
        setSex('');
        setAgeMin('');
        setAgeMax('');

        navigation.navigate('Interests');
      } else {
        throw new Error('An error has occurred');
      }
    } catch (error) {
      setIsLoading(false);
      throw Error(error);
    }
  };

  const valid =
    distance === '' ||
    age_min === '' ||
    age_max === '' ||
    sex === '' ||
    checkDistance === true ||
    checkAgeMin === true ||
    checkAgeMax === true ||
    checkSex == true;

  return (
    <SafeAreaView>
      <ScrollView>
      <LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.8, y: -0.5 }}>
              <Svg style={{ top: 20 }}
                width={500}
                height={150}
                viewBox="0 0 1440 320">
                <Path
                  fill="#1b1b1b"
                  fill-opacity="1" d="M0,320L26.7,314.7C53.3,309,107,299,160,250.7C213.3,203,267,117,320,101.3C373.3,85,427,139,480,133.3C533.3,128,587,64,640,74.7C693.3,85,747,171,800,213.3C853.3,256,907,256,960,218.7C1013.3,181,1067,107,1120,74.7C1173.3,43,1227,53,1280,69.3C1333.3,85,1387,107,1413,117.3L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></Path>
              </Svg>
              </LinearGradient>
      <View style={styles.container}>
      <View>
            <Text style={styles.title}>Preferences</Text>
          </View>
            <Text style={styles.smallerText}>Select your matching preferences: </Text>

        <View style={styles.container}>
          <Text style={styles.smallText}>Distance </Text>


          <View style={styles.inputView}>
            <TextInput style={styles.TextInput}
            placeholder="Distance"
            value={distance}
            editable={!isLoading}
            placeholderTextColor= '#6d6d6d'
            onChangeText={handleCheckDistance}
             />
          </View>

          {/* <Text style={styles.smallerText}>
            Only show people in this range{' '}
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </Text> */}

          <View style={{paddingTop: 20}}>
            <Text style={styles.smallText}>Sex preference</Text>
          </View>

          <SegmentedButtons
            value={sex}
            onValueChange={setSex}
            style={styles.TextInput}
            buttons={[
              {
                value: 'm',
                label: 'Male',
                
              },
              {
                value: 'f',
                label: 'Female',
              },
            ]}
            
          />

          <View style={{paddingTop: 20}}>
            <Text style={styles.smallText}>Age Range</Text>
          </View>

            <View style={{flexDirection: 'row'}}>
          <View style={styles.inputView}>
            <TextInput style={styles.TextInput}
            placeholder="Min Age"
            value={age_min}
            placeholderTextColor= '#6d6d6d'
            editable={!isLoading}
            
            onChangeText={handleCheckAgeMin} />
          </View>

          <View style={styles.inputView}>
            <TextInput style={styles.TextInput}
            placeholder="Max Age"
            value={age_max}
            placeholderTextColor= '#6d6d6d'
            editable={!isLoading}
            onChangeText={handleCheckAgeMax}/>
          </View>
          </View>
          {checkAgeDiff ? (
            <Text style={styles.textFailed}>Maximum age must be higher than minimum age! </Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          {/* <Text style={styles.smallerText}>
            Only show people in this range{' '}
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          </Text> */}
          <View style={{ paddingLeft: 150}}>
            <ButtonWithBackground
              text="Next"
              onPress={onSubmitFormHandler}
            />
          </View>
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
    backgroundColor: '#1b1b1b',
    paddingTop: 15,
    height: 630,
  },
  TextInput: {
    color: 'white',
    
    justifyContent: 'center',
    
  },

  title: {
    color: '#C73866',
    fontFamily: 'Roboto-Italic',
    fontSize: 40,
    
    paddingBottom: 30,
    constterSpacing: 1,
    marginBottom: 20,
    marginTop: 30,
    paddingLeft: 10,
  },

  smallText: {
    color: 'white',
    fontFamily: 'Roboto-Italic',
    fontSize: 20,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 10,
    justifyContent: 'center',
  },
  textFailed: {
    color: 'red',
    alignSelf: 'flex-end',
    right: 30,
  },
  smallerText: {
    color: 'white',
    fontFamily: 'Roboto-Italic',
    fontSize: 14,
    bottom: 20,

    justifyContent: 'center',
  },

  inputView: {
    
    marginHorizontal: 30,
    marginLeft: 10,
    
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#C73866',
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
