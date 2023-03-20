import {
    StyleSheet,
    Text,
    View,
    Pressable
  } from 'react-native';
  import React, {useState} from 'react';
  
  // import AsyncStorage from '@react-native-async-storage/async-storage';
  import EncryptedStorage from 'react-native-encrypted-storage';
  import {SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native';
  import {useEffect} from 'react';
  import {Avatar} from 'react-native-paper';
  import styles from './styles';
 
 
  import { useNavigation } from "@react-navigation/native";



  export default function ChatRoomItem ({ userUid }) {
  

    const navigation=useNavigation()


      const [age, setAge] = useState([]);
      const [name, setName] = useState([]);
      const [email, setEmail] = useState([]);
      const [gender, setGender] = useState([]);
      const [profilePic, setProfilePicUrl] = useState(null)
      const [friends, setFriends] = useState([])

      useEffect(() => {
        fetchUserData();


        
      }, []);


  const fetchUserData = async () => {
    const token = userUid
    try {
      const response = await fetch(`https://y2ylvp.deta.dev/users/`+ userUid, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      setName(res['name']);
      setEmail(res['email']);
      setProfilePicUrl(res['profilePicUrl'])
      

    } catch (error) {
      console.error(error);
    }
  };

  const onPress = () => {
    navigation.navigate("Chat")
  }

  return(
    
    <Pressable onPress={onPress} style={styles.container}>
        <Image source={{uri: profilePic}} style={styles.image}/> 
        {/* <Image source={{uri: "https://firebasestorage.googleapis.com/v0/b/dating-app-3e0f5.appspot.com/o/IMG_20230313_145342.jpg?alt=media&token=885ad7ed-b21a-4f46-b7b9-86820a66e91b"}} style={styles.image}/>  */}
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>69</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.text}> 12:00 PM</Text>
    </Pressable>

  )


}

