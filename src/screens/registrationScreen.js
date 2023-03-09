import { StyleSheet, View, TextInput, Text, TouchableOpacity, Image } from "react-native";
import ButtonWithBackground from '../components/buttonWithBackground';
import ButtonWithBackground1 from '../components/buttonWithBackground1';
import InvalidButton from '../components/invalidButton';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import axios from 'axios';
import {Appbar} from 'react-native-paper';
import storage from '@react-native-firebase/storage';
import DocumentPicker from 'react-native-document-picker';

const baseUrl = 'https://y2ylvp.deta.dev';

export default function RegistrationScreen({navigation}) {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conf_pass, setConf_pass] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checkFirstName, setCheckFistName] = useState(false);
  const [checkLastName, setCheckLastName] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkPasswordConf, setPasswordConf] = useState(false);
  const [checkAge, setCheckAge] = useState(false);
  const [checkGender, setCheckGender] = useState(false);
  const [image, setImage] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);


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

  const onChangeAgeHandler = age => {
    setAge(age);
  };

  const onChangeGenderHandler = gender => {
    setGender(gender);
  };

  const handleCheckFirstName = (first_name) => {
    setFirstName(first_name);
    if (!first_name.trim()) {
      setCheckFistName(true)
      onChangeFirstNameHandler(first_name)
    } else{
      setCheckFistName(false)
    }
  }

  const handleCheckLastName = (last_name) => {
    setLastName(last_name);
    if (!last_name.trim()) {
      setCheckLastName(true)
      onChangeLastNameHandler(last_name)
    } else{
      setCheckLastName(false)
    }
  }

  const handleCheckEmail = email => {
    const re = /\S+@\S+\.\S+/;
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setEmail(email);
    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(false);
      onChangeEmailHandler(email)
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
      setCheckPassword(true)
      onChangePasswordHandler(password)
    } else{
      setCheckPassword(false)
    }
  }

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
    if (conf_pass === password){
      setPasswordConf(false);
      onChangeConf_PassHandler(conf_pass)
    }else{
      setPasswordConf(true)
    }
  }

  const checkGenderValid = gender => {
    setGender(gender);
    if (gender === "m" || gender === "f"){
      setCheckGender(false);
      onChangeGenderHandler(gender)
    } else{
      setCheckGender(true);
    }
  }

  const checkAgeValid = age => {
    setAge(age);
    if (age >= 18){
      setCheckAge(false);
      onChangeAgeHandler(age);
    }else{
      setCheckAge(true)
    }
  }

  // const selectImage = () => {
  //   const options = {
  //     maxWidth: 2000,
  //     maxHeight: 2000,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images'
  //     }
  //   };
  //   ImagePicker.showImagePicker(options, response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log(source);
  //       setImage(source);
  //     }
  //   });
  // };

  const selectImage = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory'
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
    const uri = image[0]["fileCopyUri"];
    const filename = uri.substring(uri.lastIndexOf('/') + 1);

    await storage().ref(filename).putFile(uri);

    const profilePicRef = storage().ref(filename);
    const url = await profilePicRef.getDownloadURL();
    console.log(url)

    setProfilePicUrl(url);
    console.log('set '+ profilePicUrl)
    return profilePicUrl;
  };

  const onSubmitFormHandler = async event => {
    setIsLoading(true);
    try {
     uploadImage().then(async(profilePicUrl)=>{
       const response = await axios.post(`${baseUrl}/signup`, {
         first_name,
         last_name,
         email,
         password,
         conf_pass,
         age,
         gender,
         profilePicUrl
       });
       if (response.status == 200) {

         setIsLoading(false);
         setFirstName('');
         setLastName('');
         setEmail('');
         setAge('');
         setGender('');

         navigation.navigate('Preference');
       } else {
         throw new Error('An error has occurred');
       }
     });
    } catch (error) {
      setIsLoading(false);
      throw Error(error)
    }
  };

  const valid = (email === '' || password === '' || first_name === '' || last_name === '' || gender === '' || age === '' ||
    checkFirstName === true || checkLastName === true || checkValidEmail === true || checkPassword === true);
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon="arrow-left-thick"
          onPress={() => navigation.navigate('Login')}
        />
        <Appbar.Content
          title="Registration"
          titleStyle={{fontWeight: 'bold'}}

        />
      </Appbar.Header>
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="First Name *"
              placeholderTextColor="black"
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
              placeholderTextColor="black"
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
              placeholderTextColor="black"
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
              placeholderTextColor="black"
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
              placeholderTextColor="black"
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

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Age"
              placeholderTextColor="black"
              secureTextEntry
              value={age}
              editable={!isLoading}
              onChangeText={checkAgeValid}
            />
          </View>
          {checkAge? (
              <Text style={styles.textFailed}>Must be over 18  </Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Gender"
              placeholderTextColor="black"
              secureTextEntry
              value={gender}
              editable={!isLoading}
              onChangeText={checkGenderValid}
            />
          </View>
          {checkGender? (
              <Text style={styles.textFailed}>please input "m" or "f" </Text>
            ) : (
              <Text style={styles.textFailed}> </Text>
            )}
          <View style={{paddingLeft: 90}}>
          <ButtonWithBackground1
            text="Choose Profile Picture"
            onPress={selectImage}
          />
          {image != null ? (
            <Text>
              File Name: {image[0].name ? image[0].name : ''}
              {'\n'}
            </Text>
          ) : null}
          </View>

          <View style={{paddingLeft: 180}}>
          <ButtonWithBackground
            text="Confirm"
            onPress={onSubmitFormHandler}
            backgroundColor={valid ? "blue" : "grey"}
          />
          {/*DECLARING TWO BUTTONS THIS WAY FOR SOME MAGIC REASON MAKE ONE OF THEM WORK. I CAN'T BE ARSED*/}
          { <ButtonWithBackground
            text="Confirm"
            onPress={onSubmitFormHandler}
            backgroundColor={valid ? "blue" : "grey"}
          />}
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

  title: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 'bold',
    constterSpacing: 1,
    marginBottom: 50,
    marginTop: 100,
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
    alignSelf:'flex-end',
    right: 30




  },
  buttonDisable: {

        margin: 10,
        padding:10,
        borderRadius: 25,
        alignItems: 'center',
        backgroundColor:'grey',
        width:180,



  },

  altTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    borderWidth: 10,
    flex: 1,
  },
});
