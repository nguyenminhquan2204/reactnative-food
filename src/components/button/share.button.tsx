import { View, StyleSheet, Text, Pressable, StyleProp, TextStyle, ViewStyle } from "react-native";
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
}

const ShareButton = (props: IProps) => {
   const { title, onPress, textStyle, pressStyle, btnStyle, icons } = props;
   return (
      <>
         <Pressable 
            onPress={onPress}
            style={({ pressed }) => ([{ opacity: pressed === true ? 0.5 : 1 }, pressStyle])}
         >
            <View style={[styles.container, btnStyle]}>
               {icons}
               <Text style={textStyle}>{title}</Text>
            </View>
         </Pressable>
      </>
   )
}

export default ShareButton;