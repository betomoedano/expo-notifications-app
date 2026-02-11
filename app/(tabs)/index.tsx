import { useEffect } from "react";
import { Alert, Button, Platform, SafeAreaView, StatusBar } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNotification } from "@/context/NotificationContext";
import * as Updates from "expo-updates";

export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
    Updates.useUpdates();

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      // Updates.reloadAsync();
      // setDummyState(dummyState + 1);
      // Alert.alert("Update downloaded and applied");

      dummyFunction();
    }
  }, [isUpdatePending]);

  const dummyFunction = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error: unknown) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Unknown error",
      );
    }

    // UNCOMMENT TO REPRODUCE EAS UPDATE ERROR
    // } finally {
    //   setDummyState(dummyState + 1);
    //   console.log("dummyFunction");
    // }
  };

  if (error) {
    return <ThemedText>Error: {error.message}</ThemedText>;
  }
  // If true, we show the button to download and run the update
  const showDownloadButton = isUpdateAvailable;

  // Show whether or not we are running embedded code or an update
  const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    ? "This app is running from built-in code"
    : "This app is running an update";

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedText type="subtitle">Updates Demo 5</ThemedText>
        <ThemedText>{runTypeMessage}</ThemedText>
        <Button
          onPress={() => Updates.checkForUpdateAsync()}
          title="Check manually for updates"
        />
        {showDownloadButton ? (
          <Button
            onPress={() => Updates.fetchUpdateAsync()}
            title="Download and run update"
          />
        ) : null}
        <ThemedText type="subtitle" style={{ color: "red" }}>
          Your push token:
        </ThemedText>
        <ThemedText>{expoPushToken}</ThemedText>
        <ThemedText type="subtitle">Latest notification:</ThemedText>
        <ThemedText>{notification?.request.content.title}</ThemedText>
        <ThemedText>
          {JSON.stringify(notification?.request.content.data, null, 2)}
        </ThemedText>
      </SafeAreaView>
    </ThemedView>
  );
}
