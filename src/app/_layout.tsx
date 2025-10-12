
import { Slot, Stack } from "expo-router";
import { View, Text } from "react-native"

const RootLayout = () => {
   return (
      // <View style={{ padding: 50 }}>
      //    <Text>Header</Text>
      //    <Slot />
      //    <Text>Footer</Text>
      // </View>
      <Stack
         screenOptions={{
            headerStyle: {
               backgroundColor: 'red'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
               fontWeight: 'bold'
            }
         }}
      >
         <Stack.Screen 
            name="index" 
            options={{ headerShown: false }}
         />
         <Stack.Screen 
            name="(auth)/signup"
            options={{ headerShown: false }}
         />
      </Stack>
   )
}

export default RootLayout;