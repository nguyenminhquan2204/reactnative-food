import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/SocialButton";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { loginAPI, resendCodeAPI } from '@/utils/api';
import Toast from "react-native-root-toast";

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,
      gap: 10
   }
})

const LoginPage = () => {
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const handleLogin = async () => {
      // console.log(email, password);
      try {
         const res = await loginAPI(email, password);
         Keyboard.dismiss();
         if(res.data) {
            router.replace('/(tabs)')
         } else {
            const m = Array.isArray(res.message) ? res.message[0] : res.message;

            Toast.show(m, {
               duration: Toast.durations.LONG,
               textColor: 'white',
               backgroundColor: APP_COLOR.ORANGE,
               opacity: 1
            });

            if(res.statusCode === 400) {
               await resendCodeAPI(email);
               router.replace({
                  pathname: '/(auth)/verify',
                  params: { email: email, isLogin: 1 }
               })
            }
         }
      } catch (error) {
         console.log('>>> check error', error);  
      }
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={styles.container}>
            <View>
               <Text style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginVertical: 30
               }}>Đăng nhập</Text>
            </View>
            <ShareInput 
               title="Email"
               keyboardType="email-address"
               value={email}
               setValue={setEmail}
            />
            <ShareInput 
               title="Password"
               secureTextEntry={true}
               value={password}
               setValue={setPassword}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton 
               title='Đăng nhập'
               onPress={handleLogin}
               textStyle={{
                  textTransform: 'uppercase',
                  color: '#fff',
                  paddingVertical: 5
               }}
               btnStyle={{
                  justifyContent: 'center',
                  borderRadius: 30,
                  marginHorizontal: 50,
                  paddingVertical: 10,
                  backgroundColor: APP_COLOR.ORANGE
               }}
               pressStyle={{ alignSelf: 'stretch' }}
            />
            <View style={{
               marginVertical: 15,
               flexDirection: 'row',
               gap: 10,
               justifyContent: 'center'
            }}>
               <Text style={{
                  color: 'black'
               }}>Chưa có tài khoản</Text>
               <Link href={'/(auth)/signup'}>
                  <Text style={{ color: 'black', textDecorationLine: 'underline'}}>
                     Đăng ký.
                  </Text>
               </Link>
            </View>
            <SocialButton 
               title='Đăng nhập với'
            />
         </View>
      </SafeAreaView>
   )
}

export default LoginPage;