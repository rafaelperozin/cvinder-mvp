import { rootStore } from 'src/stores/root.store';
import axios from 'axios';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });

instance.defaults.headers.common['API-KEY'] = process.env.REACT_APP_API_KEY;
instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use((config) => {
  const { application } = rootStore;

  if (application.isAuthenticated && config.headers) {
    config.headers['Authorization'] = application.userToken;
  }

  // if (application.isAuthenticated && application.step === 2 && config.headers) {
  //   console.log('Content-Type = multipart/form-data')
  //   config.headers['Content-Type'] = 'multipart/form-data';
  // }
  
  // if (application.isAuthenticated && application.step !== 2 && config.headers) {
  //   console.log('Content-Type = application/json')
  //   config.headers['Content-Type'] = 'application/json';
  // }

  return config;
});

export default instance;
