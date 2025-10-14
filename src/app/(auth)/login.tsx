import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/SocialButton";
import ShareInput from "@/components/input/share.input";
import { APP_COLOR } from "@/utils/constant";
import { Link, router } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Keyboard, TextInput, Button } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { loginAPI, resendCodeAPI } from '@/utils/api';
import Toast from "react-native-root-toast";
import { Formik } from 'formik';
import { LoginSchema } from "@/utils/validate.schema";

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
   const [loading, setLoading] = useState<boolean>(false);

   const handleLogin = async () => {
      // console.log(email, password);
      try {
         setLoading(true);
         const res = await loginAPI(email, password);
         Keyboard.dismiss();
         setLoading(false);
         if (res.data) {
            router.replace('/(tabs)')
         } else {
            const m = Array.isArray(res.message) ? res.message[0] : res.message;

            Toast.show(m, {
               duration: Toast.durations.LONG,
               textColor: 'white',
               backgroundColor: APP_COLOR.ORANGE,
               opacity: 1
            });

            if (res.statusCode === 400) {
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
         <Formik
            validationSchema={LoginSchema}
            initialValues={{email: '', password: '' }}
            onSubmit={ values => console.log("check values = ", values)}
         >
         {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View style={{ margin: 10 }}>
               <Text>Email</Text>
               <TextInput
                  style={{ borderWidth: 1, borderColor: "#ccc" }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
               />
               {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
               <View style={{ marginVertical: 10 }}></View>
               <Text>Password</Text>
               <TextInput
                  style={{ borderWidth: 1, borderColor: "#ccc" }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
               />
               {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
               <View style={{ marginVertical: 10 }}></View>
               <Button onPress={handleSubmit as any} title="Submit" />
            </View>
         )}
      </Formik>
         {/* <View style={styles.container}>
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
               loading={loading}
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
         </View> */}
      </SafeAreaView >
   )
}

export default LoginPage;