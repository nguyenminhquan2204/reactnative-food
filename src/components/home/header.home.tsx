import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    gap: 3,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

const HeaderHome = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Yêu cầu quyền truy cập vị trí
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("Không thể lấy vị trí 😢");
        setLoading(false);
        return;
      }

      // Lấy tọa độ hiện tại
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Chuyển tọa độ sang địa chỉ cụ thể
      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (geocode.length > 0) {
        const place = geocode[0];
        const formatted =
          `${place.name ? place.name + ", " : ""}` +
         //  `${place.street ? place.street + ", " : ""}` +
          `${place.district ? place.district + ", " : ""}` +
          `${place.city || place.region || ""}`;
        setAddress(formatted);
      } else {
        setAddress("Không tìm thấy địa chỉ");
      }

      setLoading(false);
    })();
  }, []);

//   console.log('address', address)

  return (
    <View style={styles.container}>
      <Text style={{ paddingLeft: 5 }}>Giao đến: </Text>
      <View style={styles.location}>
        <Entypo name="location-pin" size={20} color={APP_COLOR.ORANGE} />
        {loading ? (
          <ActivityIndicator size="small" color={APP_COLOR.ORANGE} />
        ) : (
          <Text numberOfLines={1} style={{ flexShrink: 1 }}>
            {address}
          </Text>
        )}
      </View>
    </View>
  );
};

export default HeaderHome;
