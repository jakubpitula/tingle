import RegisterApiManager from "./registerApiManager";

export const register_Api = async data => {
  try {
    const result = await RegisterApiManager('/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      email: email,
      password: password,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};