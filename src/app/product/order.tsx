import HeaderHome from "@/components/home/header.home";
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter, getURLBaseBackend } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

interface IOrderItem {
   image: string;
   title: string;
   option: string;
   price: number;
   quantity: number;
}

const OrderPage = () => {
   const { restaurant, cart } = useCurrentApp();
   const [orderItems, setOrderItems] = useState<IOrderItem[]>([]);
   const [paymentMethod, setPaymentMethod] = useState<"cash" | "wallet">("cash");

   useEffect(() => {
      if (cart && restaurant && restaurant._id) {
         const result: IOrderItem[] = [];
         for (const [menuItemId, currentItems] of Object.entries(
            cart[restaurant._id].items
         )) {
            if (currentItems.extra) {
               for (const [key, value] of Object.entries(currentItems.extra)) {
                  const option = currentItems.data.options?.find(
                     (item) => `${item.title}-${item.description}` === key
                  );
                  const addPrice = option?.additionalPrice ?? 0;

                  result.push({
                     image: currentItems.data.image,
                     title: currentItems.data.title,
                     option: key,
                     price: currentItems.data.basePrice + addPrice,
                     quantity: value,
                  });
               }
            } else {
               result.push({
                  image: currentItems.data.image,
                  title: currentItems.data.title,
                  option: "",
                  price: currentItems.data.basePrice,
                  quantity: currentItems.quantity,
               });
            }
            setOrderItems(result);
         }
      }
   }, [restaurant]);

   return (
      <View style={{ flex: 1 }}>
         <View style={{
            borderBottomWidth: 1,
            borderColor: APP_COLOR.GREY
         }}></View>
         {/* Header */}
         <View
            style={{
               borderBottomColor: APP_COLOR.GREY,
               borderBottomWidth: 1,
               padding: 10,
            }}
         >
            <HeaderHome />
         </View>

         {/* Tên nhà hàng */}
         <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "600" }}>{restaurant?.name}</Text>
         </View>

         {/* Danh sách món */}
         <ScrollView style={{ flex: 1, padding: 10 }}>
            {orderItems?.map((item, index) => (
               <View
                  key={index}
                  style={{
                     gap: 10,
                     flexDirection: "row",
                     borderBottomColor: APP_COLOR.GREY,
                     borderBottomWidth: 1,
                     paddingVertical: 10,
                     alignItems: "center",
                  }}
               >
                  <Image
                     style={{ height: 50, width: 50, borderRadius: 5 }}
                     source={{
                        uri: `${getURLBaseBackend()}/images/menu-item/${item?.image}`,
                     }}
                  />
                  <View style={{ flex: 1 }}>
                     <Text style={{ fontWeight: "600" }}>
                        {item.quantity} x {item.title}
                     </Text>
                     {item.option ? (
                        <Text style={{ fontSize: 12, color: APP_COLOR.GREY }}>
                           {item.option}
                        </Text>
                     ) : null}
                  </View>
                  <Text style={{ fontWeight: "500" }}>
                     {currencyFormatter(item.price * item.quantity)}
                  </Text>
               </View>
            ))}

            {/* Tổng cộng */}
            {orderItems?.length > 0 && (
               <View style={{ marginVertical: 15 }}>
                  <View
                     style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                     }}
                  >
                     <Text style={{ color: APP_COLOR.GREY }}>
                        Tổng cộng ({cart?.[restaurant!._id].quantity} món)
                     </Text>
                     <Text style={{ fontWeight: "600" }}>
                        {currencyFormatter(cart?.[restaurant!._id].sum)}
                     </Text>
                  </View>
               </View>
            )}
         </ScrollView>

         {/* Phương thức thanh toán + nút đặt đơn */}
         <View
            style={{
               gap: 15,
               marginBottom: 15,
               padding: 10,
               borderTopColor: APP_COLOR.GREY,
               borderTopWidth: 1,
            }}
         >
            {/* Chọn phương thức thanh toán */}
            <View>
               <Text style={{ fontWeight: "600", marginBottom: 8 }}>
                  Phương thức thanh toán
               </Text>
               <View style={{ flexDirection: "row", gap: 10 }}>
                  <Pressable
                     onPress={() => setPaymentMethod("cash")}
                     style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor:
                           paymentMethod === "cash"
                              ? APP_COLOR.ORANGE
                              : "#ccc",
                        borderRadius: 8,
                        paddingVertical: 10,
                        backgroundColor:
                           paymentMethod === "cash"
                              ? "#FFF3E0"
                              : "transparent",
                     }}
                  >
                     <Text
                        style={{
                           textAlign: "center",
                           color:
                              paymentMethod === "cash"
                                 ? APP_COLOR.ORANGE
                                 : "#444",
                        }}
                     >
                        💵 Tiền mặt
                     </Text>
                  </Pressable>

                  <Pressable
                     onPress={() => setPaymentMethod("wallet")}
                     style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor:
                           paymentMethod === "wallet"
                              ? APP_COLOR.ORANGE
                              : "#ccc",
                        borderRadius: 8,
                        paddingVertical: 10,
                        backgroundColor:
                           paymentMethod === "wallet"
                              ? "#FFF3E0"
                              : "transparent",
                     }}
                  >
                     <Text
                        style={{
                           textAlign: "center",
                           color:
                              paymentMethod === "wallet"
                                 ? APP_COLOR.ORANGE
                                 : "#444",
                        }}
                     >
                        💳 Ví điện tử
                     </Text>
                  </Pressable>
               </View>
            </View>

            {/* Nút đặt đơn */}
            <Pressable
               style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  padding: 12,
                  backgroundColor: APP_COLOR.ORANGE,
                  borderRadius: 6,
               })}
            >
               <Text
                  style={{
                     color: "white",
                     textAlign: "center",
                     fontWeight: "600",
                     fontSize: 16,
                  }}
               >
                  Đặt đơn - {currencyFormatter(cart?.[restaurant!._id].sum)}
               </Text>
            </Pressable>
         </View>
      </View>
   );
};

export default OrderPage;
