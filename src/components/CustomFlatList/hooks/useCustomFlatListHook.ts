import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle
} from "react-native";

type ICustomFlatListStyles = {
  header: StyleProp<ViewStyle>;
  stickyElement: StyleProp<ViewStyle>;
  topElement?: StyleProp<ViewStyle>;
};

type TUseCustomFlatListHook = [
  Animated.Value,
  ICustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void
];

const window = Dimensions.get("window");

export const useCustomFlatListHook = (): TUseCustomFlatListHook => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heights, setHeights] = useState({
    header: 0,
    sticky: 0,
    topList: 0,
  });

  const styles: ICustomFlatListStyles = {
    header: {
      marginBottom: heights.sticky + heights.topList, // để danh sách nằm dưới các phần tử phía trên
    },
    stickyElement: {
      left: 0,
      marginTop: heights.header, // để sticky nằm ngay dưới header
      position: "absolute",
      right: 0,
      transform: [
        {
          translateY: scrollY.interpolate({
            extrapolate: "clamp",
            inputRange: [-window.height, heights.header],
            outputRange: [window.height, -heights.header],
          }),
        },
      ],
      zIndex: 2,
    },
    topElement: {
      left: 0,
      marginTop: heights.header + heights.sticky,
      position: "absolute",
      right: 0,
      transform: [
        {
          translateY: scrollY.interpolate({
            extrapolate: "clamp",
            inputRange: [
              -window.height,
              heights.header + heights.sticky + heights.topList,
            ],
            outputRange: [
              window.height,
              -(heights.header + heights.sticky + heights.topList),
            ],
          }),
        },
      ],
      zIndex: 1,
    },
  };

  // ✅ Sửa các hàm setHeights để không bị "closure cũ"
  const onLayoutHeaderElement = (event: LayoutChangeEvent): void => {
    const height = event.nativeEvent.layout.height;
    setHeights(prev => ({ ...prev, header: height }));
  };

  const onLayoutTopListElement = (event: LayoutChangeEvent): void => {
    const height = event.nativeEvent.layout.height;
    setHeights(prev => ({ ...prev, topList: height }));
  };

  const onLayoutTopStickyElement = (event: LayoutChangeEvent): void => {
    const height = event.nativeEvent.layout.height;
    setHeights(prev => ({ ...prev, sticky: height }));
  };

  return [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutTopStickyElement,
  ];
};
