import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Button
} from 'react-native';
import ButtonWithBackground from '../components/buttonWithBackground';
import ButtonWithBackground1 from '../components/buttonWithBackground1';
import InvalidButton from '../components/invalidButton';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import {ActivityIndicator, Appbar} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import EncryptedStorage from "react-native-encrypted-storage";
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import { Svg, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

// import "react-widgets/styles.css";
import { SelectList } from 'react-native-dropdown-select-list'

const baseUrl = 'https://y2ylvp.deta.dev';

export default function RegistrationScreen({navigation}) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conf_pass, setConf_pass] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkFirstName, setCheckFistName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkPasswordConf, setPasswordConf] = useState(false);
  const [checkDate, setCheckDate] = useState(false);
  const [checkGender, setCheckGender] = useState(false);
  const [image, setImage] = useState(null);
  const [datePicked, setDatePicked] = useState(false);
  // const [profilePicUrl, setProfilePicUrl] = useState("");

  const onChangeFirstNameHandler = first_name => {
    setFirstName(first_name);
  };

  const onChangeLastNameHandler = last_name => {
    setLastName(last_name);
  };

  const onChangePasswordHandler = password => {
    setPassword(password);
  };

  const onChangeEmailHandler = email => {
    setEmail(email);
  };

  const onChangeConf_PassHandler = conf_pass => {
    setConf_pass(conf_pass);
  };

  const onChangeDateHandler = date => {
    setDate(date);
  };

  const onChangeGenderHandler = gender => {
    setGender(gender);
  };

  const handleCheckFirstName = first_name => {
    setFirstName(first_name);
    if (!first_name.trim()) {
      setCheckFistName(true);
      onChangeFirstNameHandler(first_name);
    } else {
      setCheckFistName(false);
    }
  };

  const handleCheckLastName = last_name => {
    setLastName(last_name);
    if (!last_name.trim()) {
      setCheckLastName(true);
      onChangeLastNameHandler(last_name);
    } else {
      setCheckLastName(false);
    }
  };

  const handleCheckEmail = email => {
    const re = /\S+@\S+\.\S+/;
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(email);
    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(false);
      onChangeEmailHandler(email);
    } else {
      setCheckValidEmail(true);
    }
  };

  const checkPasswordValidity = password => {
    const isNonWhiteSpace = /^\S*$/;
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    const isValidLength = /^.{6,16}$/;
    const isContainsNumber = /^(?=.*[0-9]).*$/;

    setPassword(password);
    if (!isValidLength.test(password)) {
      setCheckPassword(true);
      onChangePasswordHandler(password);
    } else {
      setCheckPassword(false);
    }
  };

  // const checkPasswordValidity = password => {
  //   const isNonWhiteSpace = /^\S*$/;
  //   const isContainsUppercase = /^(?=.*[A-Z]).*$/;
  //   const isContainsLowercase = /^(?=.*[a-z]).*$/;
  //   const isValidLength = /^.{8,16}$/;
  //   const isContainsNumber = /^(?=.*[0-9]).*$/;

  //   setPassword(password);
  //   if (!isNonWhiteSpace.test(password) || !isValidLength.test(password) || !isContainsUppercase.test(password)
  //   || !isContainsLowercase.test(password) || !isContainsNumber.test(password)) {
  //     setCheckPassword(true)
  //     onChangePasswordHandler(password)
  //   } else{
  //     setCheckPassword(false)
  //   }
  // }

  const checkPasswordConfirm = conf_pass => {
    setConf_pass(conf_pass);
    if (conf_pass === password) {
      setPasswordConf(false);
      onChangeConf_PassHandler(conf_pass);
    } else {
      setPasswordConf(true);
    }
  };

  const checkGenderValid = gender => {
    setGender(gender);
    if (gender === 'm' || gender === 'f') {
      setCheckGender(false);
      onChangeGenderHandler(gender);
    } else {
      setCheckGender(true);
    }
  };

  const checkDateValid = date => {
    console.log(format(date, 'dd/MM/yyyy'))
    let formattedDate = format(date, 'dd/MM/yyyy')
    setDate(formattedDate);
    const ageDifMs = Date.now()-date;
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let age = Math.abs(ageDate.getUTCFullYear() - 1970)
    console.log(age);
    if (age >= 18) {
      setCheckDate(false);
      onChangeDateHandler(formattedDate);
    } else {
      setCheckDate(true);
    }
  };

  const selectImage = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setImage(res);
    } catch (err) {
      setImage(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const uploadImage = async () => {
    const uri = image[0]['fileCopyUri'];
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    await storage().ref(filename).putFile(uri);

    const profilePicRef = storage().ref(filename);
    const url = await profilePicRef.getDownloadURL();
    console.log(url);

    return url;
  };

  const onSubmitFormHandler = async event => {
    setIsLoading(true);
    try {
      uploadImage().then(async profilePicUrl => {
        const response = await axios.post(`${baseUrl}/signup`, {
          first_name,
          last_name,
          email,
          password,
          conf_pass,
          date,
          gender,
          profilePicUrl,
        });
        if (response.status == 200) {
          const formData = new FormData();

          formData.append('username', email);
          formData.append('password', password);

          setIsLoading(true);
            const res = await axios
              .post(`${baseUrl}/token`, formData, {
                headers: {'Content-Type': 'multipart/form-data'},
              })
              .then(res => {
                if (res.status === 200) {
                  setIsLoading(false)
                  EncryptedStorage.setItem('id_token', res.data.access_token);

                  navigation.navigate('Home');
                } else {
                  throw new Error('An error occurred');
                }
              });

          setIsLoading(false);
          setFirstName('');
          setLastName('');
          setEmail('');
          setDate('');
          setGender('');

          navigation.navigate('Preference');
        } else {
          setIsLoading(false);
          throw new Error('An error has occurred');
        }
      });
    } catch (error) {
      setIsLoading(false);
      throw Error(error);
    }
  };

  const valid =
    email === '' ||
    password === '' ||
    first_name === '' ||
    last_name === '' ||
    gender === '' ||
    date === '' ||
    checkFirstName === true ||
    checkLastName === true ||
    checkValidEmail === true ||
    checkPassword === true;
  return (
    <>
      <SafeAreaView>
        <ScrollView>
        <LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.9, y: 0 }}>
              <Svg style={{ top: 10, right: 15}}
                width={410}
                height={100}
                viewBox="0 0 1440 320">
                <Path
                  fill="#1b1b1b"
                  fill-opacity="1" d="M0,320L26.7,314.7C53.3,309,107,299,160,250.7C213.3,203,267,117,320,101.3C373.3,85,427,139,480,133.3C533.3,128,587,64,640,74.7C693.3,85,747,171,800,213.3C853.3,256,907,256,960,218.7C1013.3,181,1067,107,1120,74.7C1173.3,43,1227,53,1280,69.3C1333.3,85,1387,107,1413,117.3L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></Path>
              </Svg>
              </LinearGradient>



          <View style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={{
                alignSelf: 'flex-start',
                left: 5,
                paddingTop: 20,
              }}>
              <Icon name={'arrow-left'} size={30} color={'#C73866'}/>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.title}>Register</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name *"
              placeholderTextColor="#b1b1b1"
              value={first_name}
              editable={!isLoading}
              onChangeText={handleCheckFirstName}
            />
          </View>
          {checkFirstName ? (
            <Text style={styles.textFailed}>First name required</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Last Name *"
              value={last_name}
              placeholderTextColor="#b1b1b1"
              editable={!isLoading}
              onChangeText={handleCheckLastName}
            />
          </View>
          {checkLastName ? (
            <Text style={styles.textFailed}>Last name required</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Email *"
              placeholderTextColor="#b1b1b1"
              value={email}
              editable={!isLoading}
              onChangeText={handleCheckEmail}
            />
          </View>

          {checkValidEmail ? (
            <Text style={styles.textFailed}>Not a valid email</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password *"
              placeholderTextColor="#b1b1b1"
              secureTextEntry
              value={password}
              editable={!isLoading}
              onChangeText={checkPasswordValidity}
            />
          </View>
          {checkPassword ? (
            <Text style={styles.textFailed}>Not a valid password</Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Confirm Password *"
              placeholderTextColor="#b1b1b1"
              secureTextEntry
              value={conf_pass}
              editable={!isLoading}
              onChangeText={checkPasswordConfirm}
            />
          </View>
          {checkPasswordConf ? (
            <Text style={styles.textFailed}> Password does not match </Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          
          <View style={styles.genderView}>
            <SelectList
            
              placeholder="Select gender *"
              placeholderTextColor="#b1b1b1"
              search={false}
              inputStyles={{color:'#b1b1b1' }}
              boxStyles={{backgroundColor:'#1b1b1b', width: 150 }}
              dropdownStyles={{width: 150}}
              dropdownItemStyles={{backgroundColor:'#1b1b1b'}}
              dropdownTextStyles={{color: '#b1b1b1'}}
              save='key'
              setSelected={checkGenderValid}
              value={gender}
              data={[
                { key: 'm', value: "Male" },
                { key: 'f', value: "Female" },
              ]}
            />
          </View>
          {checkGender ? (
            <Text style={styles.textFailed}>please input "m" or "f" </Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

<View style= {styles.dobView}>
            {/*<TextInput*/}
            {/*  style={styles.TextInput}*/}
            {/*  placeholder="Date"*/}
            {/*  placeholderTextColor="#b1b1b1"*/}
            {/*  secureTextEntry*/}
            {/*  value={age}*/}
            {/*  editable={!isLoading}*/}
            {/*  onChangeText={checkDateValid}*/}
            {/*/>*/}
            <ButtonWithBackground1 text={"Date of Birth"} title= {datePicked ? "Birthdate - " + date.toString() : "Pick your birthdate"} onPress={() => setOpen(true)} />
            <DatePicker
              modal
              mode="date"
              open={open}
              date={new Date()}
              onConfirm={(date) => {
                setOpen(false)
                checkDateValid(date)
                setDatePicked(true)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
          {checkDate ? (
            <Text style={{ color: 'red',
            alignSelf: 'flex-start', left: 10}}>Must be over 18 </Text>
          ) : (
            <Text style={styles.textFailed}> </Text>
          )}

          <View style={{alignSelf: 'flex-start'}}>
            <ButtonWithBackground1
              text="Profile Picture"
              onPress={selectImage}
            />
            {image != null ? (
              <Text style={{color: 'white'}}>
                Image Uploaded!
              </Text>
            ) : null}
          </View>
          {isLoading? (
            <View style={{alignSelf: 'center', paddingTop: 10, paddingBottom: 40}}>

            <ActivityIndicator animating={true} color={'#FE676E'} size={20}  />

        </View>


          ) :(
          <View style={{alignSelf: 'center', paddingTop: 10, paddingBottom: 40}}>
            <TouchableOpacity disabled={!valid} >
              <ButtonWithBackground
                text="Confirm"

                onPress={onSubmitFormHandler}
                backgroundColor={valid ? 'blue' : 'grey'}
              />
              </TouchableOpacity>
          </View>
        )}
          </View>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    backgroundColor: '#1b1b1b',
    paddingTop: 10,
  },

  TextInput: {
    height: 45,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5,
    color: 'white'
  },

  inputView: {
    borderBottomWidth: 2,
    marginHorizontal: 30,
    marginLeft: 10,

    borderBottomColor: '#C73866',
  },

  title: {
    color: '#C73866',
    fontFamily: 'Roboto-Italic',
    fontSize: 40,

    constterSpacing: 1,
    marginBottom: 20,
    marginTop: 30,
    paddingLeft: 10,
  },
  dobView: {
    alignItems: 'flex-start',



  },
  genderView: {
    marginHorizontal: 30,
    marginLeft: 10,
  },
  regularText: {
    color: 'black',
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },

  textFailed: {
    color: 'red',
    alignSelf: 'flex-end',
    right: 30,
  },
  buttonDisable: {
    margin: 10,
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: 'grey',
    width: 180,
  },

  altTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 10,
    flex: 1,
  },
});
