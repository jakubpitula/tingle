import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
import React, { useEffect, useState } from "react";
import SettingsButton from '../components/settingsButton';
import {SafeAreaView, ScrollView,ActivityIndicator, FlatList} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import {Text, BottomNavigation} from 'react-native-paper';
import ButtonWithBackground from '../components/buttonWithBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

  import {getMeeting, readPool, token} from '../../api';
  import {
    MediaStream,
    MeetingProvider,
    RTCView,
    useMeeting,
    useParticipant,
  } from '@videosdk.live/react-native-sdk';

function JoinScreen(props) {
  const [meetingVal, setMeetingVal] = useState('');
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          paddingHorizontal: 6 * 10,
        }}>
        <TouchableOpacity
          onPress={async()=>{
            const mid = await props.readPool().catch(err=>console.log(err));
            if (mid) {
              // console.log(mid)
              props.setMeetingId(mid);
            }
          }}
          style={{backgroundColor: '#FF356B', padding: 12, borderRadius: 6}}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
            Call!
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
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

  function ControlsContainer({leave, end, changeWebcam, toggleMic, setMeetingId}) {
    const navigation = useNavigation();
    return (
      <View
        style={{
          padding: 24,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Button
          onPress={() => {
            changeWebcam();
          }}
          buttonText={'Change camera'}
          backgroundColor={'#1178F8'}
        />
        <Button
          onPress={() => {
            toggleMic();
          }}
          buttonText={'Mute/unmute'}
          backgroundColor={'#1178F8'}
        />
        <Button
          onPress={() => {
            leave();
            end();
            setMeetingId(null);
            navigation.navigate('Home');
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
    ) : (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F6F6FF',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 20}}>Press Join button to enter meeting.</Text>
      </View>
    );
  }

  async function onMeetingLeft(){
    const token = await AsyncStorage.getItem("id_token");
    await fetch(`https://y2ylvp.deta.dev/delete_from_pool`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json",
      },
    });
  }

  function MeetingView(props) {
    const {join, end, leave, changeWebcam, toggleMic, meetingId, participants} =
      useMeeting({onMeetingLeft});
    const participantsArrId = [...participants.keys()];
    useEffect(() => {
      join();
    }, [])
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
        />
      </View>
    );
  }

  export default function VideoCallScreen(){
    const [meetingId, setMeetingId] = useState(null);

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
          <MeetingView setMeetingId={setMeetingId}/>
        </MeetingProvider>
      </SafeAreaView>
    ) : (
      <JoinScreen readPool={readPool} meetingId = {meetingId} setMeetingId = {setMeetingId}/>
    );
  }
    return(
      <CallRoute/>
    )
  }


