import ShareButton from '@/components/button/share.button';
import SocialButton from '@/components/button/SocialButton';
import ShareInput from '@/components/input/share.input';
import { registerAPI } from '@/utils/api';
import Toast from 'react-native-root-toast';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
   const [name, setName] = useState<string>('');
   const [email, setEmail] = useState<string>('');
   const [password, setPassword] = useState<string>('');

   const hanldeSignUp = async () => {
      try {
         const res = await registerAPI(email, name, password);
         console.log(res);
         if(res.data) {
            router.navigate('/(auth)/verify');
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
               value={name}
               setValue={setName}
            />
            <ShareInput
               title='Email'
               keyboardType='email-address'
               value={email}
               setValue={setEmail}
            />
            <ShareInput
               title='Password'
               secureTextEntry={true}
               value={password}
               setValue={setPassword}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
               title='Đăng ký'
               onPress={hanldeSignUp}
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
               <Link href={'/(auth)/signup'}>
                  <Text style={{ color: 'black', textDecorationLine: 'underline' }}>Đăng nhập.</Text>
               </Link>
            </View>
            <SocialButton />
         </View>
      </SafeAreaView>
   )
}

export default SignUpPage;