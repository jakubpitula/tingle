
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SafeAreaView, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {friendId} from './homeScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import { Svg, Path } from 'react-native-svg';
const baseUrl = 'https://y2ylvp.deta.dev';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAH5m-W1aWKQpC9zwXXOX4C7tWQR3WAdUU',
    authDomain: 'dating-app-3e0f5.firebaseapp.com',
    databaseURL:
      'https://dating-app-3e0f5-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'dating-app-3e0f5',
    storageBucket: 'dating-app-3e0f5.appspot.com',
    messagingSenderId: '775458561795',
    appId: '1:775458561795:web:a5a0f059c513fb071d1336',
    measurementId: 'G-1F93T08THP',
  });
}
const auth = firebase.auth();
let otherUid = '';
let chatRoomId = '';
let myFriendsListId = '';
let theirFriendsListId = '';
let matchedFlag = false;

export default function MatchScreen() {
  const [name, setName] = useState('');
  const [friendProfile, setFriendProfilePic] = useState('');
  const [friendUid, setFriendUid] = useState(friendId);

  const [myUid, setMyUid] = useState(null);
  const [myProfile, setMyProfilePic] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  console.log('Friends/called id ' + friendUid);

  const onSubmitFormHandler = async event => {
    setIsLoading(true);
    const token = await EncryptedStorage.getItem('id_token');
    console.log('data in match screen: ', name, friendUid, myUid)

    const otherPersonMatched = await fetch(`${baseUrl}/did_match`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        friendUid: friendUid,
        myUid: myUid
      }),
    });

    const matchedRes = await otherPersonMatched.json();
    const matched = matchedRes["matched"];
    matchedFlag = matched

    if(matched) {
      try {
        const response = await fetch(`${baseUrl}/users/friends`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uid1: myUid,
            uid2: friendUid          }),
        });

        if (response.status === 200) {
          setIsLoading(false);
          setFriendUid('');
          navigation.navigate('Home');
        } else {
          throw new Error('An error has occured');
        }
      } catch (error) {
        setIsLoading(false);
        throw Error(error);
      }
    }
  };

  useEffect(() => {
    fetchFriendData();
    fetchMyData();
  }, [friendProfile]);

  const fetchFriendData = async () => {
    try {
      console.log('Token friend ' + friendUid);
      const token = await EncryptedStorage.getItem('id_token');

      const response = await fetch(
        `https://y2ylvp.deta.dev/users/` + friendUid,
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        },
      );
      const res = await response.json();

      setName(res['name']);
      setFriendProfilePic(res['profilePicUrl']);
     
    } catch (error) {
      console.error(error);
    }
  };
  const fetchMyData = async () => {
    try {
      const token = await EncryptedStorage.getItem('id_token');

      const response = await fetch(`${baseUrl}/me`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      
      setMyProfilePic(res['profilePicUrl']);

    
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      setMyUid(uid);
      console.log('UID:', uid);
    } else {
      console.log('No user is currently logged in');
    }
  }, []);

  const handlecreateChatRoom = async () => {
    setIsLoading(true);
    try {
      const chatRoomRef = firebase.database().ref('chatRooms').push();
      await chatRoomRef.set({
        person1: myUid,
        person2: friendUid,
        messages: [[]],
      });
      chatRoomId = chatRoomRef.key;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddChatRoom = async () => {
     //Get the current users friends friendUID using their userUID
    const friendsRef_me = firebase
      .database()
      .ref('users')
      .child(myUid)
      .child('friends')
      .orderByChild('uid')
      .equalTo(friendUid);
    friendsRef_me.on('child_added', snapshot => {
      const friend = snapshot.key;
      myFriendsListId = friend;
      console.log('Friend UID:', myFriendsListId);

    });
//Get my friendID for the other person using myUID 
    const friendsRef_friend = firebase
    .database()
    .ref('users')
    .child(friendUid)
    .child('friends')
    .orderByChild('uid')
    .equalTo(myUid);
  friendsRef_friend.on('child_added', snapshot => {
    const friend = snapshot.key;
    theirFriendsListId = friend;
    console.log('Friend UID:', theirFriendsListId);

  });
  
//Add the chatroom to my friends list
    firebase
      .database()
      .ref(`users/${myUid}/friends/${myFriendsListId}`)
      .update({
        chatRoom: chatRoomId,
      })
      .then(() => {
        console.log(
          `Added chatRoomID ${chatRoomId} to friend ${myFriendsListId}`,
        );
      })
      .catch(error => {
        console.error(`Error adding chatRoomID to friend: ${error}`);
      });
  ;
//Add the chatroom to their friends list 
  firebase
  .database()
  .ref(`users/${friendUid}/friends/${theirFriendsListId}`)
  .update({
    chatRoom: chatRoomId,
  })
  .then(() => {
    console.log(
      `Added chatRoomID ${chatRoomId} to friend ${theirFriendsListId}`,
    );
  })
  .catch(error => {
    console.error(`Error adding chatRoomID to friend: ${error}`);
  });
};



  const runAsyncFunctions = async () => {
    await onSubmitFormHandler();
    console.log('Matched flag: ', matchedFlag);
    if(matchedFlag) {
      
          handlecreateChatRoom();
   
      
      setTimeout(() => {
      handleAddChatRoom();
    }, 2000);
      
    }
    else{
      navigation.navigate('Home');
    }
  };

  

  return (

      <ScrollView>
        <SafeAreaView style={styles.topContainer}>
        <LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.9, y: -0.6 }}>
    <Svg style={{ top: 30, marginBottom: 20 }}
      width={500}
      height={130}
      viewBox="0 0 1440 320">
      <Path
        fill="#1b1b1b"
        fill-opacity="1" d="M0,64L12.6,101.3C25.3,139,51,213,76,213.3C101.1,213,126,139,152,112C176.8,85,202,107,227,128C252.6,149,278,171,303,176C328.4,181,354,171,379,154.7C404.2,139,429,117,455,96C480,75,505,53,531,48C555.8,43,581,53,606,90.7C631.6,128,657,192,682,208C707.4,224,733,192,758,197.3C783.2,203,808,245,834,250.7C858.9,256,884,224,909,208C934.7,192,960,192,985,208C1010.5,224,1036,256,1061,272C1086.3,288,1112,288,1137,272C1162.1,256,1187,224,1213,192C1237.9,160,1263,128,1288,122.7C1313.7,117,1339,139,1364,133.3C1389.5,128,1415,96,1427,80L1440,64L1440,320L1427.4,320C1414.7,320,1389,320,1364,320C1338.9,320,1314,320,1288,320C1263.2,320,1238,320,1213,320C1187.4,320,1162,320,1137,320C1111.6,320,1086,320,1061,320C1035.8,320,1011,320,985,320C960,320,935,320,909,320C884.2,320,859,320,834,320C808.4,320,783,320,758,320C732.6,320,707,320,682,320C656.8,320,632,320,606,320C581.1,320,556,320,531,320C505.3,320,480,320,455,320C429.5,320,404,320,379,320C353.7,320,328,320,303,320C277.9,320,253,320,227,320C202.1,320,177,320,152,320C126.3,320,101,320,76,320C50.5,320,25,320,13,320L0,320Z"></Path>
    </Svg>
  </LinearGradient>
          <View style={styles.title}>
            <Text style={styles.largeText}>Do you want to</Text>
            <Text style={styles.largeText}>match with</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>

          <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{left:30}}>
            <LinearGradient style={styles.LargeCircle}colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 1.5, y: 0 }}>
              <Image style={{alignSelf: 'center',  width: 175,height: 175,borderRadius: 175 / 2, }} source={{uri: myProfile}} />
            </LinearGradient>
            </View>
            <View style={{right:30}}>
            <LinearGradient style={styles.LargeCircle}colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.7, y: 0 }}>
              <Image style={{alignSelf: 'center',  width: 175,height: 175,borderRadius: 175 / 2, }} source={{uri: friendProfile }} />
            </LinearGradient>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingLeft: 60, paddingTop: 70, bottom: 20}}>
              <TouchableOpacity
                style={styles.smallCirlceNo}
                onPress={() => navigation.navigate('Home')}>
                <Icon name={'times'} size={65} style={{top: 15, left: 24}} />
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 70, paddingLeft: 60, bottom: 20}}>
              <TouchableOpacity
                style={styles.smallCirlceYes}
                onPress={runAsyncFunctions}>
                   <LinearGradient style={{height: 100}} colors={['#FE676E', '#C73866']}>
                <Icon name={'heart'} size={65} style={{top: 19, left: 19}} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1b1b1b',
    height: 800,
    
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden', // clip the image to the container
  },
  
  LargeCircle: {
    width: 180,
    height: 180,
    borderRadius: 180 / 2,
    backgroundColor: 'white', // half of the width and height to make it circular
    overflow: 'hidden',
    bottom: 120,
    justifyContent: 'center'
     
    
  },
  smallCirlceNo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: 'rgba(60,60,60,0.8)',
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
    bottom: 80,


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
    color: 'white',
   paddingTop: 10
  },
  largeText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'Roboto-Black',
  },
  nameText: {
    fontSize: 34,
    paddingTop:20,
    fontFamily: 'Roboto-Italic',
    color: 'white',

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

