import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Image
} from 'react-native';

import {Text, BottomNavigation} from 'react-native-paper';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './ProfileScreen';
import MessegesScreen from './messegesScreen';

import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';

import {readPool, token} from '../../api';
import {
  MediaStream,
  MeetingProvider,
  RTCView,
  useMeeting,
  useParticipant,
} from '@videosdk.live/react-native-sdk';
import {Easing} from 'react-native-reanimated';
import {MotiView} from '@motify/components';

let joinedFlag = false;
let leftBeforeJoinFlag = false;
const baseUrl = 'https://y2ylvp.deta.dev/users';

let activeDisplayNav = 'flex';
let activeDisplayHead = true;
let calledId = '';

const _size = 100;



function JoinScreen(props) {
  const [disabled, setDisabled] = useState(false);
  const [age, setAge] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [gender, setGender] = useState([]);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    fetchData();
  },[])


  const fetchData = async () => {
    try {
      const token = await EncryptedStorage.getItem('id_token');

      const response = await fetch(`${baseUrl}/me`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
        },
      });
      const res = await response.json();

      setName(res['name']);
      setEmail(res['email']);
      setAge(res['age']);
      setProfile(res['profilePicUrl']);

      console.log("My pic " + profile)


      if (res['gender'] === 'm') {
        setGender('Male');
      }
      if (res['gender'] === 'f') {
        setGender('Female');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <><View style={{ flexDirection: 'row' ,backgroundColor: "#1b1b1b",  flexWrap: 'wrap', justifyContent:'space-between',
    alignItems: 'flex-start',padding: 20}}>
      <View>
        <Text style={styles.title}>Tingle</Text>
      </View>
      
        <View style={styles.circle}>
          <Image style={styles.image} source={{ uri: profile }} />
        </View>
        
    </View><View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6 * 10,
      backgroundColor: "#1b1b1b"
    }}>

        <TouchableOpacity
          disabled={disabled}
          style={styles.cirlce}
          onPress={async () => {
            activeDisplayNav = 'none';
            activeDisplayHead = false;
            console.log(activeDisplayNav);
            setDisabled(true);

            const pool = await props.readPool().catch(err => console.log(err));
            const mid = pool['mId'];
            const uid = pool['uId'];
            if (mid) {
              props.setMeetingId(mid);
              props.setUserId(uid);
              calledId = uid;
              console.log('HomeScreen: ' + uid);
            }
          } }>
          {disabled != false ? (


            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={[styles.cirlce]}>
                {[...Array(3).keys()].map(index => {
                  return (
                    <MotiView
                      from={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: 0, scale: 4 }}
                      transition={{
                        type: 'timing',
                        duration: 2000,
                        easing: Easing.out(Easing.ease),
                        delay: index * 400,
                        repeatReverse: false,
                        loop: true,
                      }}
                      key={index}
                      style={[StyleSheet.absoluteFillObject, styles.cirlce]} />
                  );
                })}
                <Icon
                  name={'phone'}
                  size={50}
                  style={{ alignSelf: 'center', justifyContent: 'center', top: 28 }} />
              </View>
            </View>
          ) : (

            <Icon
              name={'phone'}
              size={50}
              style={{ alignSelf: 'center', justifyContent: 'center', top: 28 }} />

          )}
        </TouchableOpacity>
      </View></>
  );
}
export {calledId};

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
        padding: 30,
        top: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={styles.smallCirlce}>
        <TouchableOpacity
          disabled={!joinedFlag}
          onPress={() => {
            changeWebcam();
          }}>
          <View style={{alignItems: 'center', top: 14}}>
            <Icon name={'camera'} size={35} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.smallCirlce}>
        <TouchableOpacity
          disabled={!joinedFlag}
          onPress={() => {
            toggleMic();
          }}>
          <View style={{alignItems: 'center', top: 14}}>
            <Icon name={'microphone'} size={35} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.smallCirlceRed}>
        <TouchableOpacity
          disabled={!joinedFlag}
          onPress={() => {
            if (joinedFlag) {
              try {
                leave();
              } catch (e) {
                console.log(e);
              }
            }
          }}>
          <View style={{alignItems: 'center', top: 12}}>
            <Icon name={'times'} size={40} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ParticipantView({participantId}) {
  const {webcamStream, webcamOn, setQuality} = useParticipant(participantId);

  useEffect(() => {
    setQuality('high');
  }, []);

  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={'cover'}
      style={{
        height: 350,
        marginVertical: 8,
        marginHorizontal: 8,
      }}
    />
  ) : (
    <View
      style={{
        backgroundColor: 'grey',
        height: 400,
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
    <JoinScreen />
  );
}

function MeetingView(props) {
  const navigation = useNavigation();

  const {join, end, leave, changeWebcam, toggleMic, meetingId, participants} =
    useMeeting({
      onParticipantLeft: async () => {
        console.log('Participant left ');
        activeDisplayNav = 'flex';
        leave();
        const res = await fetch(
          `https://y2ylvp.deta.dev/users/${props.userId}`,
          {
            method: 'GET',
          },
        );
        const user = await res.json();
        alert(user['name'] + ' ended the call.');
      },
      onMeetingLeft: async () => {
        console.log('Meeting left');
        activeDisplayNav = 'flex';
        activeDisplayHead = true;
        joinedFlag = false;
        props.setMeetingId(null);
        const token = await EncryptedStorage.getItem('id_token');
        await fetch(`https://y2ylvp.deta.dev/delete_from_pool`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            uId: props.userId,
            mId: meetingId,
          }),
        });

        navigation.navigate('Match');
      },
      onMeetingJoined: () => {
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

        console.log('joined');
        joinedFlag = true;
      },
    });

  BackHandler.addEventListener('hardwareBackPress', async function () {
    try {
      leave();
    } catch (e) {
      console.log(e);
    } // if(joinedFlag) {
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
  }, []);
  console.log('participants: ' + participants.size);

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

///////////////////////////////////////////////////////////VIDEOSDK/////

const Tab = createBottomTabNavigator();

export default function HomeScreen() {
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
          <MeetingView setMeetingId={setMeetingId} userId={userId} />
        </MeetingProvider>
      </SafeAreaView>
    ) : (
      <JoinScreen
        readPool={readPool}
        meetingId={meetingId}
        setMeetingId={setMeetingId}
        setUserId={setUserId}
      />
    );
  };

  function Call() {
    return <CallRoute />;
  }

  function Profile() {
    return <ProfileScreen />;
  }

  function Messeges() {
    return <MessegesScreen />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Call"
      screenOptions={{
        tabBarActiveTintColor: '#C73866',
        tabBarStyle: {
          position: 'absolute',
          display: activeDisplayNav,
          
         
          
          backgroundColor: '#1e1e1e',
          
          height: 70,
        },

        headerShown: activeDisplayHead,
        headerTintColor: '#e91e63',
        headerTintStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Tab.Screen
        name="Call"
        component={Call}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="phone" color={color} size={30} style={{top:5}} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messeges}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="comment" color={color} size={30} style={{top:5}} />
          ),
          tabBarBadge: 69,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: '#fe8196',
          },
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name="user" color={color} size={30} style={{top:5}}/>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#1b1b1b',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    
  },
  circle: {
    
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: '#1b1b1b',
    bottom: 100,
    elevation: 15,
    shadowOpacity: 50,
    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },

  title: {  
    fontSize: 30,
   
    letterSpacing: 1,
    color: "#C73866", 
    fontFamily: "Roboto-BlackItalic",
    textShadowColor: '#FE676E',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 4

  },
  cirlce: {
    width: _size,
    height: _size,
    borderRadius: _size,
    backgroundColor: '#e91e63',
  },
  smallCirlce: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    bottom: 60,
    backgroundColor: 'grey',

    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },

  smallCirlceRed: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    bottom: 60,
    backgroundColor: '#FF3A3E',

    borderRadius: 100, // half of the width and height to make it circular
    overflow: 'hidden',
  },

  largeCirlce: {
    width: 240,
    height: 240,
    borderRadius: 240 / 2,
    bottom: 60,
    backgroundColor: '#FF3A3E',
    alignSelf: 'center',
    borderRadius: 120, // half of the width and height to make it circular
    overflow: 'hidden',
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

export {Tab};
