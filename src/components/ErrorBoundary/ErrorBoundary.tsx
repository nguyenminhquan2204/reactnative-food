import { ErrorBoundaryProps, Stack } from "expo-router";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={{ flex: 1, paddingHorizontal: 10, gap: 15 }}>
            <View style={{
               backgroundColor: "#333", padding: 10,
               borderRadius: 3, gap: 10
            }}>
               <Text style={{ color: "red", fontSize: 20 }}>
                  Something went wrong
               </Text>
               <Text style={{ color: "#fff" }}>{error.message}</Text>
            </View>
            <Button title="Try Again ?" onPress={retry} />
         </View>
      </SafeAreaView>

   )
}