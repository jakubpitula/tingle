import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import SettingsButton from '../components/settingsButton';
import {SafeAreaView, ScrollView} from 'react-native';
import {Appbar, Avatar} from 'react-native-paper';
import {Text, BottomNavigation} from 'react-native-paper';
import ButtonWithBackground from '../components/buttonWithBackground';
import {getMeeting, token} from '../../api';
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
        backgroundColor: '#F6F6FF',
        justifyContent: 'center',
        paddingHorizontal: 6 * 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          props.getMeetingId();
        }}
        style={{backgroundColor: '#1178F8', padding: 12, borderRadius: 6}}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
          Create Meeting
        </Text>
      </TouchableOpacity>

      <Text
        style={{
          alignSelf: 'center',
          fontSize: 22,
          marginVertical: 16,
          fontStyle: 'italic',
          color: 'grey',
        }}>
        ---------- OR ----------
      </Text>
      <TextInput
        value={meetingVal}
        onChangeText={setMeetingVal}
        placeholder={'XXXX-XXXX-XXXX'}
        style={{
          padding: 12,
          borderWidth: 1,
          borderRadius: 6,
          fontStyle: 'italic',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#1178F8',
          padding: 12,
          marginTop: 14,
          borderRadius: 6,
        }}
        onPress={() => {
          props.getMeetingId(meetingVal);
        }}>
        <Text style={{color: 'white', alignSelf: 'center', fontSize: 18}}>
          Join Meeting
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

function ControlsContainer({join, leave, toggleWebcam, toggleMic}) {
  return (
    <View
      style={{
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <Button
        onPress={() => {
          join();
        }}
        buttonText={'Join'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleWebcam();
        }}
        buttonText={'Toggle Webcam'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          toggleMic();
        }}
        buttonText={'Toggle Mic'}
        backgroundColor={'#1178F8'}
      />
      <Button
        onPress={() => {
          leave();
        }}
        buttonText={'Leave'}
        backgroundColor={'#FF0000'}
      />
    </View>
  );
}

function ParticipantView({participantId}) {
  const {webcamStream, webcamOn} = useParticipant(participantId);
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

function MeetingView() {
  const {join, leave, toggleWebcam, toggleMic, meetingId, participants} =
    useMeeting({});
  const participantsArrId = [...participants.keys()];

  return (
    <View style={{flex: 1}}>
      {meetingId ? (
        <Text style={{fontSize: 18, padding: 12}}>Meeting Id :{meetingId}</Text>
      ) : null}
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer
        join={join}
        leave={leave}
        toggleWebcam={toggleWebcam}
        toggleMic={toggleMic}
      />
    </View>
  );
}

const CallRoute = () => {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingId = async id => {
    const meetingId = await getMeeting({ id });
    setMeetingId(meetingId);
  };


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
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  );
};

const MatchesRoute = () => <Text>Matches</Text>;
const MessagesRoute = () => <Text>Messages</Text>;

const ProfileRoute = () => (
  <View style={styles.container}>
    <Avatar.Icon
      size={100}
      icon="account-box"
      style={{backgroundColor: '#FF356B', alignSelf: 'center'}}
    />
    {/*<Avatar.Image size={100} source={require('../assets/logo.png')} style={{backgroundColor: '#FF356B'}} />*/}

    <Text style={styles.altTitle}>Name, Age</Text>

    <View style={{padding: 40}}>
      <SettingsButton text="Change Photo" style={{borderRadius: 10}} />

      <SettingsButton text="Change Preferences" style={{borderRadius: 10}} />

      <SettingsButton text="Settings" style={{borderRadius: 10}} />

      <ButtonWithBackground text="Log out" style={{borderRadius: 10}} />
    </View>
  </View>
);

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'call',
      title: 'Call',
      focusedIcon: 'video',
      unfocusedIcon: 'video-outline',
    },
    {
      key: 'matches',
      title: 'Matches',
      focusedIcon: 'heart',
      unfocusedIcon: 'heart-outline',
    },
    {
      key: 'messages',
      title: 'Messages',
      focusedIcon: 'chat',
      unfocusedIcon: 'chat-outline',
    },
    {
      key: 'profile',
      title: 'Profile',
      focusedIcon: 'account-circle',
      unfocusedIcon: 'account-circle-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    call: CallRoute,
    matches: MatchesRoute,
    messages: MessagesRoute,
    profile: ProfileRoute,
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Tingle" />
        <Appbar.Action icon={'magnify'} onPress={() => {}} />
        <Appbar.Action icon={'heart'} onPress={() => {}} />
      </Appbar.Header>
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{backgroundColor: '#EC848E'}}
      />
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  title: {
    color: 'black',
    fontFamily: 'Roboto',
    fontSize: 50,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 50,
    marginTop: 100,
  },

  smallText: {
    color: 'black',
    fontSize: 20,
    marginTop: 100,
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputView: {
    borderColor: 'grey',
    borderWidth: 2,
    borderRadius: 3,
    width: '90%',
    marginBottom: 35,
    alignContent: 'center',
    justifyContent: 'center',
  },

  altTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingTop: 10,
  },
});
