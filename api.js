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
  }).catch(error => {
    return error.response.data;
  });
  console.log(id);

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
    // console.log(meetingId);

    return meetingId["meetingId"];
  }

  return id;
};
