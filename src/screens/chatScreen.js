import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import firebase from 'firebase';
import EncryptedStorage from 'react-native-encrypted-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


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

const baseUrl = 'https://y2ylvp.deta.dev/users';
let myUid = '';
let otherUid = '';
let chatRoomId = '';
export default function ChatScreen({route}) {
  const {friendUid} = route.params;

  const [name, setName] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [profilePic, setProfilePicUrl] = useState(null)
  

  useEffect(() => {
    fetchData();
    //Get the currently logged in users UID
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      myUid = uid;
      console.log('UID:', uid);
    } else {
      console.log('No user is currently logged in');
    }
    console.log('FriendUid: ' + friendUid);
    
    //Get the friends friendUID using their userUID
    const friendsRef = firebase.database()
  .ref('users')
  .child(myUid)
  .child('friends')
  .orderByChild('uid')
  .equalTo(friendUid);
friendsRef.on('child_added', snapshot => {
  const friend = snapshot.key;
  otherUid = friend
  console.log('Friend UID:', otherUid);
  console.log('Friendooooo UID:', friendUid);
});

  // Get the chatRoom UID for the two users 
    const chatRoomRef = firebase
      .database()
      .ref(`users/${myUid}/friends/${otherUid}/chatRoom`);
    chatRoomRef.on('value', snapshot => {
      const chatRoom = snapshot.val();
      chatRoomId = chatRoom
      console.log('Chat room value:', chatRoom);
    });
 
      const messagesRef = firebase.database().ref(`chatRooms/${chatRoomId}/messages`);
      messagesRef.on('value', snapshot => {
        const chatMessages = [];
        snapshot.forEach(childSnapshot => {
          const message = childSnapshot.val();
          chatMessages.push({
            _id: message._id,
            text: message.text,
            
            createdAt: new Date(),
            user: {
              _id: message.user._id === myUid
                ? myUid
                : friendUid,
              name: message.user === myUid
              ? friendUid
              : myUid,
            }
          });
        });
        setMessages(chatMessages.reverse());
      });
      return () => {
        messagesRef.off('value');
      };
    }, [chatRoomId]);



  

  const handleSend = useCallback((newMessages = []) => {
    const messagesRef = firebase.database().ref(`chatRooms/${chatRoomId}/messages`);
    messagesRef.push().set(newMessages[0]);
  }, [chatRoomId]);


  const fetchData = async () => {
    try {
      const response = await fetch(`https://y2ylvp.deta.dev/users/`+ friendUid, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + friendUid,
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      setName(res['name']);
      
      setProfilePicUrl(res['profilePicUrl'])
      

    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, backgroundColor: '#1b1b1b'}}>
       <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#1b1b1b',
          alignItems: 'flex-start',
          borderBottomColor: "#686868",
          borderBottomWidth: 1,
          paddingLeft: 10,
          paddingTop: 25
         
        }}>
          <TouchableOpacity
              onPress={() => navigation.navigate('Messege')}
              style={{
                alignSelf: 'flex-start',
                top: 3
              }}>
              <Icon name={'arrow-left'} size={30} color={'#C73866'}/>
            </TouchableOpacity>

            <View style={styles.container}>
        <Image source={{uri: profilePic}} style={styles.image}/>         
        <Text style={styles.name}>{name}</Text>
     
    </View>
        </View>

      
      <GiftedChat
      
        messages={messages}
        placeholder={"Message..."}
        onSend={handleSend}
        user={{ _id: auth.currentUser.uid,
                name: auth.currentUser.displayName}}
           
        textInputStyle={{backgroundColor: "#1b1b1b", 
        borderRadius: 15, 
        borderWidth: 1.5,
        borderColor: '#686868',
        paddingHorizontal: 10,
        
        
        color: 'white'}}

      renderInputToolbar={props => {
        return(
          <InputToolbar
            containerStyle={{backgroundColor:'#1b1b1b', borderTopColor:'#1b1b1b', borderTopWidth: 1}}
            {...props}
          />
        )
      }}
      />
      

      {Platform.OS === 'android' && (
        <KeyboardAvoidingView behavior="position" />
      )}
      
    </View>
  );
}



const styles = StyleSheet.create({

    container: {
      flexDirection: 'row',
      margin: 5,
      right: 10,
      alignSelf: 'flex-start',
    
      
  
  
      
      
      
  
    },
    image: {
      height: 45,
      width: 45,
      borderRadius: 30,
      marginLeft: 30,
      marginRight: 10,
      bottom: 7
    },
    badgeContainer: {
      backgroundColor: '#3777f0',
      width: 20,
      height: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 55,
      top: 10,
    },
    badgeText: {
      color: 'white',
      fontSize: 12
    },
    rightContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },          
  
    name: {
      fontWeight: 'bold',
      fontSize: 23,
      color: 'white'
    },
    text: {
      color: '#e5e5e5',
    }
})