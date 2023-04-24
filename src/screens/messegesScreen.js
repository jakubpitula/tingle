import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Button,
    FlatList,
  } from 'react-native';
  import React, {useState} from 'react';
  import firebase from 'firebase';
  
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  import EncryptedStorage from 'react-native-encrypted-storage';
  import {SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
  import {useEffect} from 'react';
  import {Avatar} from 'react-native-paper';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import ChatRoomItem from '../components/chatRoomItem';
  import { useNavigation } from "@react-navigation/native";
  import LinearGradient from 'react-native-linear-gradient';
  import AddChatRoomButton from '../components/addChatRoom';
  import { Svg, Path } from 'react-native-svg';
 
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyAH5m-W1aWKQpC9zwXXOX4C7tWQR3WAdUU",
      authDomain: "dating-app-3e0f5.firebaseapp.com",
      databaseURL: "https://dating-app-3e0f5-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "dating-app-3e0f5",
      storageBucket: "dating-app-3e0f5.appspot.com",
      messagingSenderId: "775458561795",
      appId: "1:775458561795:web:a5a0f059c513fb071d1336",
      measurementId: "G-1F93T08THP"
    });
  }


  export default function MessegesScreen () {

    let friend_keys = []
    const [friends, setFriends] = useState([])
    const [hasFriends, setHasFriends] = useState(false)

    useEffect(()=> {
      fetchFriendData();
    }, [])


    

    const fetchFriendData = async () => {
    
      const token = await EncryptedStorage.getItem('id_token');
      
      try {
        const response = await fetch('https://y2ylvp.deta.dev/users/friends', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          
        });
        
        const res = await response.json();
        
        const friendIds = Object.values(res);
        const friendUids = friendIds.map(friendId => friendId.uid);
        console.log(friendUids)
        setHasFriends(true)
        setFriends(friendUids)
          
        
    
        
       
      } catch (error) {
        setHasFriends(false)
      }
    };


   

      return (
<View style={styles.container}>
        {hasFriends == true ? (
          
        <><LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 0 }}>
              <Svg style={{ top: 20 }}
                width={500}
                height={150}
                viewBox="0 0 1440 320">
                <Path
                  fill="#1b1b1b"
                  fill-opacity="1" d="M0,320L26.7,314.7C53.3,309,107,299,160,250.7C213.3,203,267,117,320,101.3C373.3,85,427,139,480,133.3C533.3,128,587,64,640,74.7C693.3,85,747,171,800,213.3C853.3,256,907,256,960,218.7C1013.3,181,1067,107,1120,74.7C1173.3,43,1227,53,1280,69.3C1333.3,85,1387,107,1413,117.3L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></Path>
              </Svg>
            </LinearGradient><View style={{ bottom: 30 }}>
                <Text style={styles.title}>Chats</Text>

              </View><FlatList
                style={{ bottom: 40 }}
                data={friends}
                renderItem={({ item }) => <ChatRoomItem userUid={item} />} /></>     




        ) : (

              <><LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 0 }}>
                <Svg style={{ top: 20 }}
                  width={500}
                  height={150}
                  viewBox="0 0 1440 320">
                  <Path
                    fill="#1b1b1b"
                    fill-opacity="1" d="M0,320L26.7,314.7C53.3,309,107,299,160,250.7C213.3,203,267,117,320,101.3C373.3,85,427,139,480,133.3C533.3,128,587,64,640,74.7C693.3,85,747,171,800,213.3C853.3,256,907,256,960,218.7C1013.3,181,1067,107,1120,74.7C1173.3,43,1227,53,1280,69.3C1333.3,85,1387,107,1413,117.3L1440,128L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></Path>
                </Svg>
              </LinearGradient><View style={{ bottom: 30 }}>
                  <Text style={styles.title}>Chats</Text>

              <View style={{justifyContent: 'center',}}>
                <Text style={styles.noFriendText}> You have no matches yet  </Text>
              </View>
                </View></>

        )}
       </View>
        
        
           
              

       )
        };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: '#1b1b1b',
   
    width: '100%',
    
    
  },
  noFriendText: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 200,
    fontSize: 15,
    fontFamily: 'Roboto-Italic',
    color: 'white',
    
    
  },

  upperContainer: {
   
      height: 150,
      width: 1000,
      right: 50,
      
      
      //transform: [{skewY: '-10deg'}],
    
  },
  list: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },

  friendText: {
    fontSize: 25,
    fontFamily: "Roboto-Black",
    color: '#b1b1b1',
    top: 50
    
  },  
  item: {
    backgroundColor: 'grey',
    color: 'white',
    padding: 30,
    margin: 2,
    borderRadius: 9,
    

    

  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    backgroundColor: 'white',
    bottom: 80,
    elevation: 15,
    shadowOpacity: 80,
  },
  container1: {
    backgroundColor: 'white',
    flex: 1,
    
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
    color: '#C73866',
    fontSize: 45,
    fontFamily: "Roboto-Black",   
    alignItems: 'center',
    paddingLeft: 15,
    
    
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
    color:'black',
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



