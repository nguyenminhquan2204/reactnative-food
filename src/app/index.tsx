import { useCurrentApp } from '@/context/app.context';
import { getAccountAPI } from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text } from 'react-native';
import { ErrorBoundary } from './_layout';

SplashScreen.preventAutoHideAsync();

const RootPage = () => {
   const { setAppState } = useCurrentApp();

   useEffect(() => {
      (async () => {
         try {
            const res = await getAccountAPI();
            if (res.data) {
               setAppState({
                  user: res.data.user,
                  access_token: await AsyncStorage.getItem('access_token')
               });
               router.replace('/(tabs)');
            } else {
               router.replace('/(auth)/welcome');
            }
         } catch (e: any) {
            console.error('Backend not connected:', e);
            throw new Error('Not connect to backend! Please check again.');
         } finally {
            await SplashScreen.hideAsync();
         }
      })();
   }, []);

   return (
      <></>
   )
};

export default RootPage;
