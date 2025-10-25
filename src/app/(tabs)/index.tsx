import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import { useCurrentApp } from "@/context/app.context";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { 
    key: 1, 
    name: "Top Quán Rating 5* tuần này", 
    refAPI: "top-rating",
    description: "Những quán được đánh giá 5* nhiều nhất trong tuần qua"
  },
  { 
    key: 2, 
    name: "Quán Mới Lên Sàn", 
    refAPI: "newcomer",
    description: 'Khám phá ngay hàng loạt quán mới cực ngon'
  },
  { 
    key: 3, 
    name: "Ăn Thỏa Thích, Freeship 0Đ", 
    refAPI: "top-freeship",
    description: "Đặt món thỏa thích, freeship 0đ"
  },
]

const HomeTab = () => {

  return (
    // <SafeAreaView style={styles.container} edges={[]}>
    <SafeAreaView style={{ flex: 1 }}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => <CollectionHome refAPI={item.refAPI} name={item.name} description={item.description} />}
        HeaderComponent={<HeaderHome />}
        StickyElementComponent={<SearchHome />}
        // TopListElementComponent={<View style={styles.topList} />}
        TopListElementComponent={<TopListHome />}
      />
    </SafeAreaView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
    // padding: 8
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
  item: {
    borderColor: "green",
    borderWidth: 1,
    height: 250,
    marginBottom: 10,
    width: "100%"
  },
  list: {
    overflow: "hidden"
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%"
  },
});

export default HomeTab;