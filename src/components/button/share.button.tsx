import { View, StyleSheet, Text, Pressable, StyleProp, TextStyle, ViewStyle, ActivityIndicator } from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { ReactNode } from "react";

const styles = StyleSheet.create({
   text: {
      textTransform: 'uppercase',
   },
   container: {
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 10,
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      backgroundColor: APP_COLOR.ORANGE
   }
})

interface IProps {
   title: string;
   onPress: () => void;
   textStyle?:StyleProp<TextStyle>;
   pressStyle?:StyleProp<ViewStyle>;
   btnStyle?:StyleProp<ViewStyle>;
   icons?:ReactNode;
   loading?: boolean;
}

const ShareButton = (props: IProps) => {
   const { loading = false, title, onPress, textStyle, pressStyle, btnStyle, icons } = props;

   return (
      <>
         <Pressable
            disabled={loading}
            onPress={onPress}
            style={({ pressed }) => ([{ opacity: pressed === true || loading ? 0.5 : 1 }, pressStyle])}
         >
            <View style={[styles.container, btnStyle]}>
               {loading && <ActivityIndicator 
                  color={'black'}
               />}
               {icons}
               <Text style={textStyle}>{title}</Text>
            </View>
         </Pressable>
      </>
   )
}

export default ShareButton;