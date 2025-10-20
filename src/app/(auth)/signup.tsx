import ShareButton from '@/components/button/share.button';
import SocialButton from '@/components/button/SocialButton';
import ShareInput from '@/components/input/share.input';
import { registerAPI } from '@/utils/api';
import { SignUpSchema } from '@/utils/validate.schema';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-root-toast';
import { SafeAreaView } from 'react-native-safe-area-context';
import { APP_COLOR } from 'utils/constant';

const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginHorizontal: 20,
      gap: 10
   }
})

const SignUpPage = () => {

   const hanldeSignUp = async (email: string, name: string, password: string) => {
      try {
         Keyboard.dismiss();
         const res = await registerAPI(email, name, password);
         console.log(res);
         if (res.data) {
            router.replace({
               pathname: '/(auth)/verify',
               params: { email: email }
            });
         } else {
            const m = Array.isArray(res.message) ? res.message[0] : res.message;
            Toast.show(m, {
               duration: Toast.durations.LONG,
               textColor: 'white',
               backgroundColor: 'red',
               opacity: 1
            });
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <Formik
            validationSchema={SignUpSchema}
            initialValues={{ name: '', password: '', email: '' }}
            onSubmit={values => hanldeSignUp(values.email, values.name, values.password)}
         >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
               <View style={styles.container}>
                  <View>
                     <Text style={{
                        fontSize: 25,
                        fontWeight: 600,
                        marginVertical: 30
                     }}>Đăng ký tài khoản</Text>
                  </View>
                  <ShareInput
                     title='Họ tên'
                     value={values.name}
                     onChangeText={handleChange('name')}
                     onBlur={handleBlur('name')}
                     error={errors.name}
                  />
                  <ShareInput
                     title='Email'
                     keyboardType='email-address'
                     value={values.email}
                     onChangeText={handleChange('email')}
                     onBlur={handleBlur('email')}
                     error={errors.email}
                  />
                  <ShareInput
                     title='Password'
                     secureTextEntry={true}
                     value={values.password}
                     error={errors.password}
                     onChangeText={handleChange('password')}
                     onBlur={handleBlur('password')}
                  />
                  <View style={{ marginVertical: 10 }}></View>
                  <ShareButton
                     title='Đăng ký'
                     onPress={() => handleSubmit()}
                     textStyle={{
                        color: '#fff',
                        paddingVertical: 5,
                        textTransform: 'uppercase'
                     }}
                     btnStyle={{
                        justifyContent: 'center',
                        borderRadius: 30,
                        marginHorizontal: 50,
                        paddingVertical: 10,
                        backgroundColor: APP_COLOR.ORANGE
                     }}
                     pressStyle={{ alignSelf: 'stretch', justifyContent: 'center' }}
                  />
                  <View style={{
                     flexDirection: 'row',
                     gap: 10,
                     justifyContent: 'center',
                     marginVertical: 15
                  }}>
                     <Text style={{ color: 'black' }}>Bạn đã có tài khoản?</Text>
                     <Link href={'/(auth)/login'}>
                        <Text style={{ color: 'black', textDecorationLine: 'underline' }}>Đăng nhập.</Text>
                     </Link>
                  </View>
                  <SocialButton
                     title='Đăng ký với'
                  />
               </View>
            )}
         </Formik>
      </SafeAreaView>
   )
}

export default SignUpPage;