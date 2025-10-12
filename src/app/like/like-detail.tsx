import { View, Text } from "react-native"
import { Link } from 'expo-router';

const LikeDetail = () => {
   return (
      <View>
         <Text>Page detail</Text>
         <Link href={"/"}>Back Home</Link>
      </View>
   )
}

export default LikeDetail;