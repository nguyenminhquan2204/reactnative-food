
import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';

const RootLayout = () => {
   return (
      <RootSiblingParent>
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
      </RootSiblingParent>
   )
}

export default RootLayout;