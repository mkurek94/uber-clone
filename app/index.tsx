import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text>Home</Text>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
