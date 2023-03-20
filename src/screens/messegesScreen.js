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
  
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  import EncryptedStorage from 'react-native-encrypted-storage';
  import {SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
  import {useEffect} from 'react';
  import {Avatar} from 'react-native-paper';
  
  import ChatRoomItem from '../components/chatRoomItem';
  import { useNavigation } from "@react-navigation/native";
 


  export default function MessegesScreen () {

    let friend_keys = []


    useEffect(()=> {
      fetchFriendData();
    }, [])


    const [friends, setFriends] = useState([])

    const fetchFriendData = async () => {
    
      const token = await EncryptedStorage.getItem('id_token');
      console.log(token)
      try {
        const response = await fetch('https://y2ylvp.deta.dev/users/friends', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          
        });
        const res = await response.json();
        var obj_1 = JSON.parse(JSON.stringify(res))
        var values = Object.values(obj_1)
  
        values.forEach(function(item) {
          Object.keys(item).forEach(function(key) {
           
            
            friend_keys.push(item[key])
           
          });
          
          setFriends(friend_keys)
          console.log(friends)
        
      });
        
       
       
        
        
        
  
      } catch (error) {
        console.error(error);
      }
    };
   
      

      return (
        <View style={styles.container1}>
         <FlatList 
          data={friends}
          renderItem ={({item}) => <ChatRoomItem userUid={item}/> }
         />
      


        </View>
        
    
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
       )}


const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fe8196',
    height: 65,
    width: '100%',
    padding: 10,
  },
  list: {
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: 'white',
    marginHorizontal: 5,
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
    color: 'black',
    fontSize: 30,
    fontWeight: '700',
    alignItems: 'center',
    bottom: 70,
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



