import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "@/store";
import RideLayout from "@/components/RideLayout";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
      </View>
    </RideLayout>
  );
};

export default FindRide;
