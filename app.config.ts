module.exports = {
  expo: {
    name: "Expo Notifications",
    slug: "expo-notifications-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "light",
    ios: {
      supportsTablet: true,
      bundleIdentifier: "dev.expo.notificationsapp",
      infoPlist: {
        UIBackgroundModes: ["fetch", "remote-notification"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/icon.png",
        backgroundColor: "#ffffff",
      },
      package: "dev.expo.notificationsapp",
      googleServicesFile: "./google-services.json",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "51092087-87a4-4b12-8008-145625477434",
      },
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    owner: "betoatexpo",
  },
};
