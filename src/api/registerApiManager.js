import Axios from "axios";

const RegisterApiManager = Axios.create({

  baseURL: 'https://y2ylvp.deta.dev/signup',
  responseType: 'json',
  withCredentials: true,

});

export default RegisterApiManager;