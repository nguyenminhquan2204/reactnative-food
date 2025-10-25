import { getTopRestaurant } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, FlatList, Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';


const { height: sHeight, width: sWidth } = Dimensions.get('window');

interface IProps {
   name: string,
   description: string,
   refAPI: string
}

const styles = StyleSheet.create({
   container: {
      padding: 10
   },
   sale: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: APP_COLOR.ORANGE,
      padding: 3,
      borderRadius: 3,
      alignSelf: 'flex-start'
   }
})

const CollectionHome = (props: IProps) => {
   const { name, description, refAPI } = props;
   const [restaurants, setRestaurants] = useState<ITopRestaurant[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      const fetchData = async () => {
         setLoading(true);
         const res = await getTopRestaurant(refAPI);
         if (res.data) {
            setRestaurants(res.data);
         } else {

         }
         setLoading(false);
      }
      fetchData();
   }, [refAPI])

   const backend = Platform.OS === 'android'
      ? process.env.EXPO_PUBLIC_ANDROID_API_UTL
      : process.env.EXPO_PUBLIC_IOS_API_UTL;

   const baseImage = `${backend}/images/restaurant`;

   return (
      <>
         <View style={{ height: 10, backgroundColor: APP_COLOR.GREY }}></View>
         {loading === false ?
            <View style={styles.container}>
               <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <Text style={{
                     color: APP_COLOR.ORANGE,
                     fontSize: 16,
                     fontWeight: '600'
                  }}>{name}</Text>
                  <Text style={{ color: '#5a5a5a' }}>Xem tất cả</Text>
               </View>
               <View style={{ marginVertical: 5 }}>
                  <Text style={{ color: '#5a5a5a' }}>{description}</Text>
               </View>
               <FlatList
                  data={restaurants}
                  horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 5 }}
                  renderItem={({ item }) => {
                     return (
                        <Pressable onPress={() => router.navigate({
                           pathname: '/product/[id]',
                           params: { id: item._id }
                        })}>
                           <View style={{ backgroundColor: '#efefef' }}>
                              <Image
                                 style={{ height: 130, width: 130 }}
                                 source={{ uri: `${baseImage}/${item.image}` }} />
                              <View style={{ padding: 5 }}>
                                 <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{ fontWeight: '600', maxWidth: 130 }}
                                 >{item.name}</Text>
                                 <View>
                                    <View style={styles.sale}>
                                       <Text style={{ color: APP_COLOR.ORANGE }}>Flash Sale</Text>
                                    </View>
                                 </View>
                              </View>
                           </View>
                        </Pressable>
                     )
                  }}
               />
            </View>
            :
            <ContentLoader
               speed={2}
               width={sWidth}
               height={220}
               // viewBox="0 0 700 150"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
               style={{ width: '100%' }}
            >
               <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
               <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
               <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
            </ContentLoader>
         }
      </>
   )
}

export default CollectionHome;