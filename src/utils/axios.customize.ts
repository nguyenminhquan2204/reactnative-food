import axios from 'axios';
import { Platform } from 'react-native';

const backend = Platform.OS === 'android' 
   ? process.env.EXPO_PUBLIC_ANDROID_API_UTL 
   : process.env.EXPO_PUBLIC_IOS_API_UTL;

const instance = axios.create({
   baseURL: backend
})

export default instance;