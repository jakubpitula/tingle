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
  const [profile, setProfilePic] = useState('');
  const [friendUid, setFriendUid] = useState(friendId);

  const [myUid, setMyUid] = useState(null);
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
    fetchData();
  }, [profile]);

  const fetchData = async () => {
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
      setProfilePic(res['profilePicUrl']);
      console.log('My pic ' + profile);
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
      await handlecreateChatRoom();
      await handleAddChatRoom();
    }
    else{
      navigation.navigate('Home');
    }
  };

  

  return (
    <LinearGradient
      style={styles.topContainer}
      colors={['#fa2f77', '#fe8196', '#f9d0de', '#FFFFFF']}
      start={{x: 0, y: 0}}
      end={{x: 0.1, y: 1.25}}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.title}>
            <Text style={styles.largeText}>Do you want to</Text>
            <Text style={styles.largeText}>match with</Text>
            <Text style={styles.nameText}>{name}</Text>
          </View>

          <View style={{alignItems: 'center'}}>
            <View style={styles.LargeCircle}>
              <Image style={styles.image} source={{uri: profile}} />
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{paddingLeft: 60, paddingTop: 70}}>
              <TouchableOpacity
                style={styles.smallCirlceNo}
                onPress={() => navigation.navigate('Home')}>
                <Icon name={'times'} size={65} style={{top: 15, left: 24}} />
              </TouchableOpacity>
            </View>
            <View style={{paddingTop: 70, paddingLeft: 60}}>
              <TouchableOpacity
                style={styles.smallCirlceYes}
                onPress={runAsyncFunctions}>
                <Icon name={'check'} size={65} style={{top: 17, left: 19}} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </LinearGradient>
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
    bottom: 120,
  },
  image: {
    width: 200,
    height: 200,
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
    paddingTop: 70,
  },
  largeText: {
    fontSize: 28,
    fontFamily: 'Roboto-Black',
  },
  nameText: {
    fontSize: 34,
    paddingTop:20,
    fontFamily: 'Roboto-Italic',

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
