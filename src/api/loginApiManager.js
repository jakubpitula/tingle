import Axios from "axios";

const LoginApiManager = Axios.create({

  baseURL: 'https://y2ylvp.deta.dev/token',
  responseType: 'json',
  withCredentials: true,

});

export default LoginApiManager;
