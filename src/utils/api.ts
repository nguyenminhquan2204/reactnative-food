import axios from '@/utils/axios.customize';
import AsynsStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

export const registerAPI = (email: string, name: string, password: string) => {
   const url = `/api/v1/auth/register`;
   return axios.post<IBackendRes<IRegister>>(url, { email, name, password });
}

export const verifyCodeAPI = (email: string, code: string) => {
   const url = `/api/v1/auth/verify-code`;
   return axios.post<IBackendRes<IRegister>>(url, { email, code });
}

export const resendCodeAPI = (email: string) => {
   const url = `/api/v1/auth/verify-email`;
   return axios.post<IBackendRes<IRegister>>(url, { email });
}

export const loginAPI = (email: string, password: string) => {
   const url = `/api/v1/auth/login`;
   return axios.post<IBackendRes<IUserLogin>>(url, { email: email, password: password })
}

export const getAccountAPI = () => {
   const url = `/api/v1/auth/account`;
   return axios.get<IBackendRes<IUserLogin>>(url);
}

export const getTopRestaurant = async (ref: string) => {
   const url = `/api/v1/restaurants/${ref}`;
   // await new Promise(resolve => setTimeout(resolve, 3000));
   return axios.get<IBackendRes<ITopRestaurant[]>>(url);
}

export const getRestaurantByIdAPI = async (id: string) => {
   const url = `/api/v1/restaurants/${id}`;
   // await new Promise(resolve => setTimeout(resolve, 3000));
   return axios.get<IBackendRes<IRestaurant>>(url);
}

export const getURLBaseBackend = () => {
   const backend = Platform.OS === 'android'
      ? process.env.EXPO_PUBLIC_ANDROID_API_UTL
      : process.env.EXPO_PUBLIC_IOS_API_UTL;
   return backend;
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

export const processDataRestaurantMenu = (restaurant: IRestaurant | null) => {
   if (!restaurant) return [];
   return restaurant?.menu?.map((menu, index) => {
      return {
         index,
         key: menu._id,
         title: menu.title,
         data: menu.menuItem
      }
   })
}

export const currencyFormatter = (value: any) => {
   const options = {
      significantDigits: 2,
      thousandsSeparator: '.',
      decimalSeparator: ',',
      symbol: 'đ'
   }
   if (typeof value !== 'number') value = 0.0
   value = value.toFixed(options.significantDigits)
   const [currency, decimal] = value.split('.')
   return `${currency.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      options.thousandsSeparator
   )}${options.symbol}`
}
