module.exports = {
  expo: {
    name: "expo-notifications-app",
    slug: "expo-notifications-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "dev.expo.notificationsapp",
      infoPlist: {
        UIBackgroundModes: ["fetch", "remote-notification"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "dev.expo.notificationsapp",
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "expo-font"],
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
    updates: {
      url: "https://u.expo.dev/51092087-87a4-4b12-8008-145625477434",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    owner: "betoatexpo",
  },
};
