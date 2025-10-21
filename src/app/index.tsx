import { useCurrentApp } from '@/context/app.context';
import { getAccountAPI } from '@/utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
   const { setAppState } = useCurrentApp();

   useEffect(() => {
      async function prepare() {
         try {
            const fetchAccount = async () => {
               const res = await getAccountAPI();
               if (res.data) {
                  // success
                  setAppState({
                     user: res.data.user,
                     access_token: await AsyncStorage.getItem('access_token')
                  })
                  router.replace('/(tabs)');
                  // await AsyncStorage.removeItem('access_token');
               } else {
                  // error
                  router.replace('/(auth)/welcome');
               }
            }
            fetchAccount();
         } catch (error) {
            console.warn(error);
         } finally {
            await SplashScreen.hideAsync();
         }
      }
      prepare();
   }, []);

   return (
      <>

      </>
   )
}

export default RootPage;