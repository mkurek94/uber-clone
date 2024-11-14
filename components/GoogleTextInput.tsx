import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { GoogleInputProps } from "@/types/type";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle} mb-5`}
    >
      <Text>Where you want to go?</Text>
      <TouchableOpacity
        onPress={() =>
          handlePress({
            latitude: 37.78825,
            longitude: -122.4324,
            address: "Test",
          })
        }
      >
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GoogleTextInput;
