import React, {useEffect, useState} from 'react';
import {Button, View} from 'react-native';
import firebase from 'firebase';

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

let chatRoomID = '';
let friendId = '-NT9RSeOg3xWgjySVwxU';
const AddChatRoomButton = () => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState(null);
  
  



  useEffect(()=> {
    const user = auth.currentUser;
  if (user) {
    const uid = user.uid;
    setUid(uid);
    console.log('UID:', uid);
  } else {
    console.log('No user is currently logged in');
  }
  },[])



  const handlecreateChatRoom = async () => {
    setIsLoading(true);
    try {
      const chatRoomRef = firebase.database().ref('chatRooms').push();
      await chatRoomRef.set({
        person1: uid,
        person2: 'kLgl2trmG2WLGcAufwUJ3Rsz4GC2',
        messages: [[]],
      });
      chatRoomID = chatRoomRef.key;
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleAddChatRoom = async () => {
    firebase
      .database()
      .ref(
        `users/${uid}/friends/${friendId}`,
      )
      .update({
        chatRoom: chatRoomID,
      })
      .then(() => {
        console.log(
          `Added chatRoomID ${chatRoomID} to friend ${friendId}`,
        );
      })
      .catch(error => {
        console.error(`Error adding chatRoomID to friend: ${error}`);
      });
  };

  const runAsyncFunctions = async () => {
    await handlecreateChatRoom();
    await handleAddChatRoom();
  };

  const handleButtonPress = async () => {
    await runAsyncFunctions();
  };

  
  return (
    <View>
      <Button
        title="Add Chat Room"
        onPress={handleButtonPress}
        disabled={isLoading}
      />
    </View>
  );
};

export default AddChatRoomButton;
