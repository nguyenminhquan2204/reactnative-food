import ShareInput from '@/components/input/share.input';
import { useCurrentApp } from '@/context/app.context';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
   container: {
      paddingHorizontal: 15,
      paddingTop: 50
   }
})

const AccountPage = () => {
   const { theme, appState } = useCurrentApp();

   const backend = Platform.OS === 'android'
      ? process.env.EXPO_PUBLIC_ANDROID_API_UTL
      : process.env.EXPO_PUBLIC_IOS_API_UTL;

   const baseImage = `${backend}/images/avatar`;

   return (
      <View style={styles.container}>
         <View style={{ alignItems: 'center', gap: 5 }}>
            <Image 
               style={{ height: 150, width: 150 }}
               source={{ uri: `${baseImage}/${appState?.user.avatar}`}}
            />
            <Text>I am {appState?.user.name}</Text>
         </View>
         <View style={{ marginTop: 20, gap: 20 }}>
            <ShareInput 
               title='Họ tên'
               value={appState?.user.name}
            />
            <ShareInput 
               title='Email'
               keyboardType='email-address'
               value={appState?.user.email}
            />
            <ShareInput 
               title='Phone'
               value={appState?.user.phone}
            />
         </View>
      </View>
   )
}

export default AccountPage;