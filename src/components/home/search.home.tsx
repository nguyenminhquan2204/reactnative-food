import { Text, View, StyleSheet } from 'react-native';
import { APP_COLOR } from '@/utils/constant';
import EvilIcons from '@expo/vector-icons/EvilIcons';

const styles = StyleSheet.create({
   container: {
      backgroundColor: APP_COLOR.GREY,
      gap: 5,
      flexDirection: 'row',
      margin: 5,
      paddingHorizontal: 3,
      paddingVertical: 7,
      borderRadius: 3
   }
})

const SearchHome = () => {
   return (
      <View style={styles.container}>
         <EvilIcons 
            name='search'
            size={20}
            color='black'
         />
         <Text style={{
            color: '#707070f'
         }}>Deal Hot hôm nay từ 0đ ... </Text>
      </View>
   )
}

export default SearchHome;