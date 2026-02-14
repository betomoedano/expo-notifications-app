import { useState } from "react";
import {
  Image,
  Linking,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useNotification } from "@/context/NotificationContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Color } from "expo-router";

const blue = Platform.select({
  ios: Color.ios.systemBlue,
  android: Color.android.system_primary_light,
});

export default function HomeScreen() {
  const { notification, expoPushToken, error } = useNotification();
  const [copied, setCopied] = useState(false);

  const copyToken = async () => {
    if (!expoPushToken) return;
    await Clipboard.setStringAsync(expoPushToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <SafeAreaView>
          <Text style={{ fontSize: 16, color: "#FF3B30" }}>
            Error: {error.message}
          </Text>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <StatusBar barStyle={"dark-content"} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: "700" }}>
          Expo Notifications
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 4,
          }}
        >
          Push token for this device
        </Text>

        <Pressable
          onPress={copyToken}
          style={{
            marginTop: 20,
            borderRadius: 12,
            padding: 16,
            backgroundColor: "#00000005",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
              color: blue,
            }}
            selectable
            numberOfLines={2}
          >
            {expoPushToken || "Generating token..."}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: copied ? "#34C759" : "#8E8E93",
              marginTop: 8,
            }}
          >
            {copied ? "Copied!" : "Tap to copy"}
          </Text>
        </Pressable>

        {notification && (
          <View style={{ marginTop: 32 }}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#000" }}>
              Latest Notification
            </Text>
            <Text style={{ fontSize: 15, color: "#3C3C43", marginTop: 8 }}>
              {notification.request.content.title}
            </Text>
            {notification.request.content.data?._richContent?.image && (
              <Image
                source={{
                  uri: notification.request.content.data._richContent.image,
                }}
                style={{
                  width: "100%",
                  height: 200,
                  borderRadius: 12,
                  marginTop: 12,
                }}
                resizeMode="cover"
              />
            )}
            {notification.request.content.data && (
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
                  color: "#8E8E93",
                  marginTop: 4,
                }}
              >
                {JSON.stringify(notification.request.content.data, null, 2)}
              </Text>
            )}
          </View>
        )}
      </View>

      <View
        style={{
          paddingBottom: 20,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: "#E5E5EA",
          paddingTop: 16,
          gap: 12,
        }}
      >
        <Text style={{ fontSize: 12 }}>Code with Beto</Text>
        <Text
          style={{ fontSize: 14, color: blue }}
          onPress={() => Linking.openURL("https://codewithbeto.dev/learn")}
        >
          Learn Notifications in depth
        </Text>
        <Text
          style={{ fontSize: 14, color: blue }}
          onPress={() => Linking.openURL("https://apple.co/4tvT4wF")}
        >
          QuickPush — Test notifications on macOS
        </Text>
      </View>
    </SafeAreaView>
  );
}
