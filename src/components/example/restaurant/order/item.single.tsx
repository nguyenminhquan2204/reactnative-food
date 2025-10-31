import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { AntDesign } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from "react-native";

interface IProps {
   menuItem: IMenuItem | null;
   showMinus: boolean;
   quantity: number;
   handlePressItem: (item: IMenuItem, action: "MINUS" | "PLUS") => void;
}

const ItemSingle = (props: IProps) => {
   const { menuItem, showMinus, quantity, handlePressItem } = props;

   return (
      <>
         <View style={{
            backgroundColor: "white",
            gap: 10, flexDirection: "row", padding: 10
         }}>
            <View>
               <Image
                  style={{ height: 100, width: 100 }}
                  source={{ uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}` }}
               />
            </View>
            <View style={{ flex: 1, gap: 10 }}>
               <View><Text>{menuItem?.title}</Text></View>
               <View><Text>{menuItem?.description}</Text></View>
               <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text style={{ color: APP_COLOR.ORANGE }}>{currencyFormatter(menuItem?.basePrice)}</Text>
                  <View style={{
                     alignItems: "center",
                     flexDirection: "row",
                     gap: 3
                  }}>
                     {showMinus &&
                        <>
                           <Pressable
                              style={({ pressed }) => ({
                                 opacity: pressed ? 0.5 : 1,
                                 alignSelf: "flex-start"
                              })}
                              onPress={() => handlePressItem(menuItem as any, "MINUS")}
                           >
                              <AntDesign
                                 name="minus-square"
                                 size={24}
                                 color={APP_COLOR.ORANGE}
                              />
                           </Pressable>
                           <Text style={{
                              minWidth: 25,
                              textAlign: "center"
                           }}>{quantity}</Text>
                        </>
                     }
                     <Pressable
                        style={({ pressed }) => ({
                           opacity: pressed ? 0.5 : 1,
                           alignSelf: "flex-start"
                        })}
                        onPress={() => handlePressItem(menuItem as any, "PLUS")}
                     >
                        <AntDesign
                           name="plus-square"
                           size={24}
                           color={APP_COLOR.ORANGE}
                        />
                     </Pressable>
                  </View>
               </View>
            </View>
         </View>
      </>
   )
}

export default ItemSingle;