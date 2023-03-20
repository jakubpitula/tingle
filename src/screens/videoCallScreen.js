import {
    View,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
import React, { useEffect, useState } from "react";
import {SafeAreaView, FlatList, BackHandler} from 'react-native';
import {Text} from 'react-native-paper';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useNavigation } from '@react-navigation/native';

import {readPool, token} from '../../api';
import {
  MediaStream,
  MeetingProvider,
  RTCView,
  useMeeting,
  useParticipant,
} from '@videosdk.live/react-native-sdk';

import LinearGradient from 'react-native-linear-gradient';



let joinedFlag = false;
let leftBeforeJoinFlag = false;

let activeDisplayNav = 'flex';





function JoinScreen(props) {

  
  

  const [disabled, setDisabled] = useState(false);
  
    return (
      <LinearGradient style={styles.topContainer} colors={['#fa2f77','#fe8196','#f9d0de','#FFFFFF']} start={{x: 0,y: 0}} end={{x: 0.1, y: 0.6}}>
        {/* <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            paddingHorizontal: 6 * 10,
          }}> */}


        <TouchableOpacity
          disabled={disabled}
          onPress={async()=>{
            activeDisplayNav = 'none';
            console.log(activeDisplayNav)
            setDisabled(true);
            const pool = await props.readPool().catch(err=>console.log(err));
            const mid = pool["mId"];
            const uid = pool["uId"];
            if (mid) {
              props.setMeetingId(mid);
              props.setUserId(uid);
            }
          }}
          style={{backgroundColor: '#FF356B', padding: 12, borderRadius: 6}}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
            Call!
          </Text>
        </TouchableOpacity>
      {/* </SafeAreaView> */}
      </LinearGradient>
      
    );
  }

  const Button = ({onPress, buttonText, backgroundColor}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: backgroundColor,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 12,
          borderRadius: 4,
        }}>
        <Text style={{color: 'white', fontSize: 12}}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };

 function ControlsContainer({leave, changeWebcam, toggleMic}) {
    return (
      <View
        style={{
          padding: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          disabled={!joinedFlag}
          onPress={() => {
            changeWebcam();
          }}
          buttonText={'Change camera'}
          backgroundColor={'#1178F8'}
        />
        <Button
          disabled={!joinedFlag}
          onPress={() => {
            toggleMic();
          }}
          buttonText={'Mute/unmute'}
          backgroundColor={'#1178F8'}
        />
        <Button
          disabled={!joinedFlag}
          onPress={() => {
            if(joinedFlag) {
              try {
                leave();
              } catch (e) {
                console.log(e)
              }
            }
          }}
          buttonText={'End call'}
          backgroundColor={'#FF0000'}
        />
      </View>
    );
  }

  function ParticipantView({participantId}) {
    const {webcamStream, webcamOn, setQuality} = useParticipant(participantId);

    useEffect(() => {
      setQuality('high');
    }, [])

    return webcamOn && webcamStream ? (
      <RTCView
        streamURL={new MediaStream([webcamStream.track]).toURL()}
        objectFit={'cover'}
        style={{
          height: 300,
          marginVertical: 8,
          marginHorizontal: 8,
        }}
      />
    ) : (
      <View
        style={{
          backgroundColor: 'grey',
          height: 300,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16}}>NO MEDIA</Text>
      </View>
    );
  }

  function ParticipantList({participants}) {
    return participants.length > 0 ? (
      <FlatList
        data={participants}
        renderItem={({item}) => {
          return <ParticipantView participantId={item} />;
        }}
      />
    ) : <JoinScreen />
  }

  function MeetingView(props) {
    const navigation = useNavigation();

    const {join, end, leave, changeWebcam, toggleMic, meetingId, participants} =
      useMeeting({
        onParticipantLeft: async() => {
          console.log('Participant left ');
          leave();
          const res = await fetch(`https://y2ylvp.deta.dev/users/${props.userId}`, {
            method: "GET"
          });
          const user = await res.json()
          alert(user["name"] + ' ended the call.')
        },
        onMeetingLeft: async() =>{
            console.log('Meeting left')
            joinedFlag = false
            props.setMeetingId(null);
            const token = await EncryptedStorage.getItem("id_token");
            await fetch(`https://y2ylvp.deta.dev/delete_from_pool`, {
              method: "POST",
              headers: {
                'Authorization': 'Bearer ' + token,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                'uId': props.userId,
                'mId': meetingId
              })
            });
            activeDisplayNav = 'flex'
            navigation.navigate('Home')
        },
        onMeetingJoined: () =>{
          // console.log('left before? '+ leftBeforeJoinFlag)
          // if(!leftBeforeJoinFlag){
          //   console.log('joined')
          //   joinedFlag = true
          // }
          // else{
          //   joinedFlag = false;
          //   leftBeforeJoinFlag = false;
          //   leave();
          // }

          console.log('joined')
          joinedFlag = true
        }});

    BackHandler.addEventListener('hardwareBackPress', async function(){
      try {
        leave();
      } catch (e) {
        console.log(e)
      }      // if(joinedFlag) {
      //   leave();
      // }
      // else{
      //     const token = await AsyncStorage.getItem("id_token");
      //     leftBeforeJoinFlag = true;
      //
      //     console.log('uid = ', props.userId)
      //
      //     await fetch(`https://y2ylvp.deta.dev/delete_from_pool`, {
      //       method: "POST",
      //       headers: {
      //         'Authorization': 'Bearer ' + token,
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({
      //         'uId': props.userId,
      //         'mId': meetingId
      //       })
      //     });
      //     props.setMeetingId(null);
      //
      //     navigation.navigate('Home');
      // }
    });

    const participantsArrId = [...participants.keys()];

    useEffect(() => {
      join();
    }, [])
    console.log('participants: ' + participants.size)

    return (
      <View style={{flex: 1}}>
        {meetingId ? (
          <Text style={{fontSize: 18, padding: 12}}>Meeting Id :{meetingId}</Text>
        ) : null}
        <ParticipantList participants={participantsArrId} />
        <ControlsContainer
          leave={leave}
          end={end}
          changeWebcam={changeWebcam}
          toggleMic={toggleMic}
          setMeetingId={props.setMeetingId}
          participants={participants}
        />
      </View>
    );
  }

  export default function VideoCallScreen(){
    
    const [meetingId, setMeetingId] = useState(null);
    const [userId, setUserId] = useState(null);
    const CallRoute = () => {
    return meetingId ? (
      <SafeAreaView style={{flex: 1, backgroundColor: '#F6F6FF'}}>
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: false,
            webcamEnabled: true,
            name: 'Test User',
          }}
          token={token}>
          <MeetingView setMeetingId={setMeetingId} userId={userId}/>
        </MeetingProvider>
      </SafeAreaView>
    ) : (
      <JoinScreen readPool={readPool} meetingId = {meetingId} setMeetingId = {setMeetingId} setUserId={setUserId}/>
    );
  }
    return(
      <CallRoute/>
    )
  }

const styles = StyleSheet.create({
    topContainer: {
      flex: 1,
      justifyContent: 'center',
      height: 150,
      width: '100%'
    },
});

export {activeDisplayNav};
