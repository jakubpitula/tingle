import LoginApiManager from "./loginApiManager";

export const user_Api = async data => {
  try {
    const result = await LoginApiManager('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
  

