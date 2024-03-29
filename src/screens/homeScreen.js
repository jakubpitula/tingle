import {
  StyleSheet,
  View,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  FlatList,
  Image,
  
} from 'react-native';

import React, {useEffect, useState} from 'react';
import {Text} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from './ProfileScreen';
import MessegesScreen from './messegesScreen';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useNavigation} from '@react-navigation/native';
import { Svg, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
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
import firebase from 'firebase';

let joinedFlag = false;
let leftBeforeJoinFlag = false;
const baseUrl = 'https://y2ylvp.deta.dev/users';

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
const auth = firebase.auth();
let activeDisplayNav = 'flex';
let activeDisplayHead = true;
let friendId = '';

const _size = 100;

function JoinScreen(props) {
  const [disabled, setDisabled] = useState(false);
  const [age, setAge] = useState([]);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [gender, setGender] = useState([]);
  const [image, setImage] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uid, setUid] = useState(null)

  useEffect(() => {
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

      console.log(token);

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
 const navigation = useNavigation()
  return (
    <><LinearGradient style={styles.upperContainer} colors={['#ec0f5d', '#b0234f', '#f18a55',]} start={{ x: 0, y: 0 }} end={{ x: 0.4, y: 0 }}>
    <Svg style={{ top: 20 }}
      width={500}
      height={150}
      viewBox="0 0 1440 320">
      <Path
        fill="#1b1b1b"
        fill-opacity="1" d="M0,0L20,10.7C40,21,80,43,120,74.7C160,107,200,149,240,176C280,203,320,213,360,229.3C400,245,440,267,480,256C520,245,560,203,600,197.3C640,192,680,224,720,213.3C760,203,800,149,840,122.7C880,96,920,96,960,80C1000,64,1040,32,1080,16C1120,0,1160,0,1200,16C1240,32,1280,64,1320,112C1360,160,1400,224,1420,256L1440,288L1440,320L1420,320C1400,320,1360,320,1320,320C1280,320,1240,320,1200,320C1160,320,1120,320,1080,320C1040,320,1000,320,960,320C920,320,880,320,840,320C800,320,760,320,720,320C680,320,640,320,600,320C560,320,520,320,480,320C440,320,400,320,360,320C320,320,280,320,240,320C200,320,160,320,120,320C80,320,40,320,20,320L0,320Z"></Path>
    </Svg>
  </LinearGradient>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#1b1b1b',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingEnd: 20,
          paddingStart: 20,
        }}>
        <View>
          <Text style={styles.title}>Tingle</Text>
        </View>

        <View style={styles.circle}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image style={styles.image} source={{uri: profile}} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 6 * 10,
          backgroundColor: '#1b1b1b',
        }}>
         
        <TouchableOpacity
          disabled={disabled}
          style={styles.cirlce}
          onPress={async () => {
            activeDisplayNav = 'none';
            activeDisplayHead = false;


            setDisabled(true);
            setIsLoading(true);

                setIsLoading(false)
                const pool = await props.readPool().catch(err => console.log(err));
                console.log('pool after homescren ' + pool['mId'] + ' ' + pool['uId'])
                const mid = pool['mId'];
               const uid = pool['uId'];
            if (mid) {
              props.setMeetingId(mid);
              props.setUserId(uid);
              friendId = uid;
              console.log('HomeScreen: ' + uid);
            }
          }}>





          {disabled != false ? (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View style={[styles.cirlce]}>
                {[...Array(3).keys()].map(index => {
                  return (
                    <MotiView
                      from={{opacity: 0.8, scale: 1}}
                      animate={{opacity: 0, scale: 4}}
                      transition={{
                        type: 'timing',
                        duration: 3000,
                        easing: Easing.out(Easing.ease),
                        delay: index * 400,
                        repeatReverse: false,
                        loop: true,
                      }}
                      key={index}
                      style={[StyleSheet.absoluteFillObject, styles.cirlce]}
                    />
                  );
                })}
                <Icon
                  name={'phone'}
                  size={50}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    top: 28,
                  }}
                />
              </View>
            </View>
          ) : (
            <Icon
              name={'phone'}
              size={50}
              style={{alignSelf: 'center', justifyContent: 'center', top: 28}}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
export {friendId};

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
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 16}}>AWATING USER TO JOIN</Text>
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
  console.log('other users id '+ props.userId + ', called id ' + friendId)
  if (props.userId){
    friendId = props.userId;
  }
  console.log('meeting id at the beg of meetingview ', props.meetingId)
  const {join, end, leave, changeWebcam, toggleMic, participants} =
    useMeeting({
      onParticipantLeft: async () => {
        console.log('Participant left ');
        activeDisplayNav = 'flex';
        leave();
        const res = await fetch(
          `https://y2ylvp.deta.dev/users/${friendId}`,
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
            mId: props.meetingId,
          }),
        });

        navigation.navigate('Match');
      },
      onParticipantJoined: async()=>{
        const token = await EncryptedStorage.getItem('id_token');
        if(!friendId) {
          const friendJson = await fetch(`https://y2ylvp.deta.dev/find_user`, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              mId: props.meetingId,
            }),
          });
          const friend = await friendJson.json();
          friendId = friend["userId"]
          console.log("called id ", friendId)
        }
      },
      onMeetingJoined: async() => {
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
        joinedFlag = true}
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
    //         'mId': props.meetingId
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

  return joinedFlag ? (
    <View style={{flex: 1}}>
      {props.meetingId ? (
        <Text style={{fontSize: 18, padding: 12}}>Meeting Id :{props.meetingId}</Text>
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
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6 * 10,
        backgroundColor: '#1b1b1b',
      }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={[styles.cirlce]}>
          {[...Array(3).keys()].map(index => {
            return (
              <MotiView
                from={{opacity: 0.8, scale: 1}}
                animate={{opacity: 0, scale: 4}}
                transition={{
                  type: 'timing',
                  duration: 2000,
                  easing: Easing.out(Easing.ease),
                  delay: index * 400,
                  repeatReverse: false,
                  loop: true,
                }}
                key={index}
                style={[StyleSheet.absoluteFillObject, styles.cirlce]}
              />
            );
          })}
          <Icon
            name={'phone'}
            size={50}
            style={{alignSelf: 'center', justifyContent: 'center', top: 28}}
          />
        </View>
      </View>
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
      <SafeAreaView style={{flex: 1, backgroundColor: '#1e1e1e'}}>
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: false,
            webcamEnabled: true,
            name: 'Test User',
          }}
          token={token}>
          <MeetingView setMeetingId={setMeetingId} userId={userId} meetingId={meetingId} />
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
            <Icon name="phone" color={color} size={30} style={{top: 5}} />
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
            <Icon name="comment" color={color} size={30} style={{top: 5}} />
          ),
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
            <Icon name="user" color={color} size={30} style={{top: 5}} />
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
    color: '#C73866',
    fontFamily: 'Archivo-VariableFont_wdth,wght',
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
    marginBottom: 40,
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
  upperContainer: {
    bottom: 20,
    height: 130,
    width: 1000,
    right: 50,
    
    
    //transform: [{skewY: '-10deg'}],
  
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