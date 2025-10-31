import { useCurrentApp } from '@/context/app.context';
import { currencyFormatter, getURLBaseBackend } from '@/utils/api';
import { APP_COLOR } from '@/utils/constant';
import { AntDesign } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
   Image,
   Pressable,
   ScrollView,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';

interface IUpdateItem {
   image: string;
   title: string;
   option: string;
   price: number;
   quantity: number;
}

const UpdateModalPage = () => {
   const { restaurant, cart, setCart } = useCurrentApp();
   const { menuItemId } = useLocalSearchParams();
   const [menuItem, setMenuItem] = useState<IMenuItem | null>(null);
   const [updateItems, setUpdatedItems] = useState<IUpdateItem[]>([]);

   useEffect(() => {
      if (restaurant && menuItemId) {
         for (let i = 0; i < restaurant.menu.length; i++) {
            const menu = restaurant.menu[i];
            for (let j = 0; j < menu.menuItem.length; j++) {
               if (menu.menuItem[j]._id === menuItemId) {
                  setMenuItem(menu.menuItem[j]);
                  return;
               }
            }
         }
      }
   }, [restaurant, menuItemId]);

   useEffect(() => {
      if (menuItem && restaurant) {
         const currentItems = cart[restaurant._id]?.items?.[menuItem._id];
         if (currentItems?.extra) {
            const result: IUpdateItem[] = [];
            for (const [key, value] of Object.entries(currentItems.extra)) {
               const option = menuItem.options?.find(
                  (item) => `${item.title}-${item.description}` === key
               );
               const addPrice = option?.additionalPrice ?? 0;

               result.push({
                  image: menuItem.image,
                  title: menuItem.title,
                  option: key,
                  price: menuItem.basePrice + addPrice,
                  quantity: value as number,
               });
            }
            setUpdatedItems(result);
         }
      }
   }, [menuItem]);

   const handlePressItem = (item: IUpdateItem, action: 'MINUS' | 'PLUS') => {
      const foundIndex = updateItems.findIndex((x) => x.option === item.option);
      if (foundIndex < 0) return;

      const updated = [...updateItems];
      const foundItem = { ...updated[foundIndex] };

      const total = action === 'MINUS' ? -1 : 1;
      foundItem.quantity += total;

      if (foundItem.quantity <= 0) {
         updated.splice(foundIndex, 1);
         if (updated.length === 0) router.back();
      } else {
         updated[foundIndex] = foundItem;
      }

      setUpdatedItems(updated);
      updateCart(total, foundItem.option, foundItem.price);
   };

   const updateCart = (total: number, keyOption: string, price: number) => {
      if (restaurant?._id && menuItem) {
         const item = menuItem;
         const restId = restaurant._id;

         cart[restId].sum += total * price;
         cart[restId].quantity += total;

         const currentItem = cart[restId].items[item._id];
         const currentExtraQuantity = (currentItem.extra?.[keyOption] ?? 0) + total;

         cart[restId].items[item._id] = {
            data: item,
            quantity: currentItem.quantity + total,
            extra: {
               ...currentItem.extra,
               [keyOption]: currentExtraQuantity,
            },
         };

         if (currentExtraQuantity <= 0)
            delete cart[restId].items[item._id].extra?.[keyOption];
         if (cart[restId].items[item._id].quantity <= 0)
            delete cart[restId].items[item._id];

         setCart((prev: any) => ({ ...prev, ...cart }));
      }
   };

   return (
      <Animated.View
         entering={FadeIn}
         style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: '#00000060',
         }}
      >
         {/* Khi bấm ra ngoài modal */}
         <Pressable onPress={() => router.back()} style={StyleSheet.absoluteFill} />

         <Animated.View
            entering={SlideInDown}
            style={{
               height: '65%',
               width: '100%',
               backgroundColor: 'white',
               borderTopLeftRadius: 20,
               borderTopRightRadius: 20,
               overflow: 'hidden',
            }}
         >
            {/* Header */}
            <View
               style={{
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  gap: 10,
                  padding: 15,
                  alignItems: 'center',
               }}
            >
               <View style={{ flex: 1 }}>
                  <Text
                     style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: 17,
                     }}
                  >
                     Chỉnh sửa số lượng
                  </Text>
               </View>
               <AntDesign
                  onPress={() => router.back()}
                  name="close"
                  size={24}
                  color="grey"
               />
            </View>

            {/* Danh sách món */}
            <ScrollView
               style={{
                  flex: 1,
               }}
            >
               {updateItems.map((item, index) => (
                  <View
                     key={index}
                     style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        borderBottomColor: '#eee',
                        borderBottomWidth: 1,
                        gap: 12,
                     }}
                  >
                     {/* Ảnh món */}
                     <Image
                        source={{ uri: `${getURLBaseBackend()}/images/menu-item/${menuItem?.image}` }}
                        style={{
                           width: 60,
                           height: 60,
                           borderRadius: 10,
                        }}
                     />

                     {/* Nội dung */}
                     <View style={{ flex: 1, gap: 5 }}>
                        <Text style={{ fontWeight: '600', fontSize: 15 }}>
                           {item.title}
                        </Text>
                        <Text style={{ color: 'grey', fontSize: 13 }}>{item.option}</Text>

                        <View
                           style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                           }}
                        >
                           <Text
                              style={{ color: APP_COLOR.ORANGE, fontWeight: '500' }}
                           >
                              {currencyFormatter(item.price)}
                           </Text>

                           <View
                              style={{
                                 flexDirection: 'row',
                                 alignItems: 'center',
                                 gap: 10,
                              }}
                           >
                              <Pressable
                                 style={({ pressed }) => ({
                                    opacity: pressed ? 0.5 : 1,
                                    alignSelf: "flex-start"
                                 })}
                                 onPress={() => handlePressItem(item, "MINUS")}
                              >
                                 <AntDesign
                                    name="minus-square"
                                    size={24}
                                    color={APP_COLOR.ORANGE}
                                 />
                              </Pressable>

                              <Text style={{ fontWeight: '600', fontSize: 16 }}>
                                 {item.quantity}
                              </Text>

                              <Pressable
                                 style={({ pressed }) => ({
                                    opacity: pressed ? 0.5 : 1,
                                    alignSelf: "flex-start"
                                 })}
                                 onPress={() => handlePressItem(item, "PLUS")}
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
               ))}

               {updateItems.length === 0 && (
                  <Text
                     style={{
                        textAlign: 'center',
                        color: 'grey',
                        marginTop: 30,
                        fontSize: 15,
                     }}
                  >
                     Không có món nào để chỉnh sửa.
                  </Text>
               )}
            </ScrollView>
         </Animated.View>
      </Animated.View>
   );
};

export default UpdateModalPage;
