import { View, StyleSheet, Image } from 'react-native';
import TextBetweenLine from './text.between.line';
import fbLogo from '@/assets/auth/facebook.png';
import ggLogo from '@/assets/auth/google.png';
import ShareButton from './share.button';

const styles = StyleSheet.create({
   welcomeBtn: {
      flex: 1,
      gap: 30
   }
})

interface IProps {
   title: string
}

const SocialButton = (props: IProps) => {
   const { title } = props;

   return (
      <View style={styles.welcomeBtn}>
         <TextBetweenLine 
            title={title}
            textColor='black'   
         />
         <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 30
         }}>
            <ShareButton
               title="Facebook"
               onPress={() => { alert('Hello') }}
               textStyle={{ textTransform: 'uppercase' }}
               pressStyle={{ alignSelf: 'flex-start', justifyContent: 'center' }}
               btnStyle={{
                  justifyContent: 'center',
                  borderRadius: 30,
                  backgroundColor: '#fff'
               }}
               icons={
                  <Image source={fbLogo} />
               }
            />

            <ShareButton
               title='Google'
               onPress={() => { alert('Hello') }}
               textStyle={{ textTransform: 'uppercase' }}
               btnStyle={{
                  justifyContent: 'center',
                  borderRadius: 30,
                  paddingHorizontal: 20,
                  backgroundColor: '#fff'
               }}
               icons={
                  <Image source={ggLogo} />
               }
            />
         </View>
      </View>
   )
}

export default SocialButton;