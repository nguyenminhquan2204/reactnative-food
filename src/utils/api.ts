import axios from '@/utils/axios.customize';
import AsynsStorage from '@react-native-async-storage/async-storage';

export const registerAPI = (email: string, name: string, password: string) => {
   const url = `/api/v1/auth/register`;
   return axios.post<IBackendRes<IRegister>>(url, {email, name, password});
}

export const verifyCodeAPI = (email: string, code: string) => {
   const url = `/api/v1/auth/verify-code`;
   return axios.post<IBackendRes<IRegister>>(url, {email, code});
}

export const resendCodeAPI = (email: string) => {
   const url = `/api/v1/auth/verify-email`;
   return axios.post<IBackendRes<IRegister>>(url, {email});
}

export const loginAPI = (email: string, password: string) => {
   const url = `/api/v1/auth/login`;
   return axios.post<IBackendRes<IUserLogin>>(url, {email: email, password: password})
}

export const getAccountAPI = () => {
   const url = `/api/v1/auth/account`;
   return axios.get<IBackendRes<IUserLogin>>(url);
}

export const printAsyncStorage = () => {
   AsynsStorage.getAllKeys((err, keys) => {
      AsynsStorage.multiGet(keys!, (error, stores) => {
         let asyncStorage: any = {};
         stores?.map((result, i, store) => {
            asyncStorage[store[i][0]] = store[i][1]
         });
         console.log(JSON.stringify(asyncStorage, null, 2));
      });
   });
}