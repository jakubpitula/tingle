
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Button,
    FlatList,
    TouchableOpacity
    
  } from 'react-native';
  import { useNavigation } from "@react-navigation/native";
  import Icon from 'react-native-vector-icons/FontAwesome';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen () {

    const navigation=useNavigation();


    return (
        
        <><View style={{ alignItems: 'center' }}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Messege')}
                style={{
                    right: 160,
                    paddingTop: 20,
                }}>
                <Icon name={'arrow-left'} size={30} />
            </TouchableOpacity>
        </View><GiftedChat>
            </GiftedChat></>

        
        

        
    )
}


