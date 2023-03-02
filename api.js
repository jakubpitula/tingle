import AsyncStorage from '@react-native-async-storage/async-storage';
async function getToken(){
  return await fetch('https://y2ylvp.deta.dev/generate_token')
    .then(response => response.json())
    .then(result => {
      return Promise.resolve(result.token);
    }).catch(error => {
      return Promise.reject(error);
    })
}

export let token = "";

// API call to create meeting
export const getMeeting = async ({id}) => {

  token = await getToken().then(token => {
    return token;
  });

  if (id == null) {
    const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
      method: "POST",
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ region: "eu001" }),
    });
    id = await res.json();
    const meetingId = id;

    return meetingId["meetingId"];
  }
  return id;
};

export const readPool = async () => {
  const token = await AsyncStorage.getItem("id_token");
  let meetingId = ""
  const res = await fetch(`https://y2ylvp.deta.dev/read_pool`, {
    method: "POST",
    headers: {
      'Authorization': 'Bearer ' + token,
      "Content-Type": "application/json",
    },
  });

  const status = await res.json();
  // console.log('status ' + status);
  if (status === "waiting"){
    meetingId = await getMeeting({})
    const resp_waiting = await fetch(`https://y2ylvp.deta.dev/add_pool`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mId: meetingId }),
    });
    // const res = await resp_waiting.json()
    // console.log(res);
  }

  else{
    meetingId = status["meetingId"];
    await getMeeting({ meetingId });

    const resp_joining = await fetch(`https://y2ylvp.deta.dev/read_pool`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json",
      },
    });

    // const res = await resp_joining.json()
    // console.log(res);
  }
  return meetingId;
}
