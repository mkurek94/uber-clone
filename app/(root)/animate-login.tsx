import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import { images } from "@/app/constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  withSequence,
  withSpring,
} from "react-native-reanimated";

const AnimateLogin = () => {
  const { height, width } = Dimensions.get("window");
  const [isRegistering, setIsRegistering] = useState(false);
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);

  const imageAnimatedStyles = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 1.6, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);

    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
      opacity: withTiming(imagePosition.value, { duration: 500 }),
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: formButtonScale.value }],
    };
  });

  const loginHandler = () => {
    setIsRegistering(false);
    imagePosition.value = 0;
  };

  const registerHandler = () => {
    setIsRegistering(true);
    imagePosition.value = 0;
  };

  return (
    <Animated.View className="flex-1 justify-end">
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyles]}>
        <Svg height={height + 100} width={width} className="">
          <ClipPath id="clipPathId">
            <Ellipse cx={width / 2} rx={height} ry={height + 100} />
          </ClipPath>
          <Image
            href={images.splashScreen}
            height={height + 100}
            width={width}
            translateX={0}
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#clipPathId)"
          />
        </Svg>
        <TouchableOpacity onPress={() => (imagePosition.value = 1)}>
          <Animated.View
            className="rounded-full h-[40px] w-[40px] justify-center self-center shadow-black shadow-md bg-white items-center -top-5"
            style={closeButtonContainerStyle}
          >
            <Text className="mx-auto">X</Text>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      <View className={`justify-center`} style={{ height: height / 3 }}>
        <Animated.View style={buttonsAnimatedStyle}>
          <TouchableOpacity
            className="bg-blue-400 h-[55px] items-center justify-center rounded-full mx-5 my-2 border border-white"
            onPress={loginHandler}
          >
            <Text className="text-xl font-bold text-white">LOG IN</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={buttonsAnimatedStyle}>
          <TouchableOpacity
            className="bg-blue-400 h-[55px] items-center justify-center rounded-full mx-5 my-2 border border-white"
            onPress={registerHandler}
          >
            <Text className="text-xl font-bold text-white">REGISTER</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          className="mb-16 z-[-1] justify-center"
          style={[StyleSheet.absoluteFill, formAnimatedStyle]}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            className="h-12 border border-gray-500 my-2 mx-5 pl-2 rounded-full"
          />
          {isRegistering ? (
            <TextInput
              placeholder="Full name"
              placeholderTextColor="black"
              className="h-12 border border-gray-500 my-2 mx-5 pl-2 rounded-full"
            />
          ) : null}
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            className="h-12 border border-gray-500 my-2 mx-5 pl-2 rounded-full"
          />
          <Animated.View
            className="bg-blue-400 h-[55px] items-center justify-center rounded-full mx-5 my-2 border border-white shadow-black shadow-md"
            style={formButtonAnimatedStyle}
          >
            <TouchableOpacity
              onPress={() =>
                (formButtonScale.value = withSequence(
                  withSpring(1.5),
                  withSpring(1),
                ))
              }
            >
              <Text className="text-xl font-bold text-white">
                {isRegistering ? "REGISTER" : "LOG IN"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export default AnimateLogin;
