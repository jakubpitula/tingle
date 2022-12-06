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
export const createMeeting = async () => {
  token = await getToken().then(token => {
    return token;
  }).catch(error => {
    return error.response.data;
  });

  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "eu001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};
