export const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIzNjM0YTc4MC0wMDI4LTQ1ODktYjEzMC1hZDRmNWY2NjY2ZmYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY2OTg5MzY0NCwiZXhwIjoxNjcwNDk4NDQ0fQ.mGl4kW3sTq2ygOZdaMMJxWp0kTE6Np1RoeROWWJQefk";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v1/meetings`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ region: "sg001" }),
  });

  const { meetingId } = await res.json();
  return meetingId;
};
