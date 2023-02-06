import LoginApiManager from "./loginApiManager";

export const user_Api = async data => {
  try {
    const result = await LoginApiManager('/token', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};


