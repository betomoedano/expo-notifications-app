import { Platform, SafeAreaView, StatusBar } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNotification } from "@/context/NotificationContext";
import DOMCoolCode from "@/components/DOMCoolCode";
export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>;
  }
  console.log(JSON.stringify(notification, null, 2));
  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="subtitle">Your push token:</ThemedText>
        <ThemedText>{expoPushToken}</ThemedText>
        <ThemedText type="subtitle">Latest notification:</ThemedText>
        <ThemedText>{notification?.request.content.title}</ThemedText>
        <ThemedText>
          {JSON.stringify(notification?.request.content.data, null, 2)}
        </ThemedText>
        {/* <DOMCoolCode code={JSON.stringify(notification)} /> */}
      </SafeAreaView>
    </ThemedView>
  );
}
