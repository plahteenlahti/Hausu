import { Suspense, useEffect } from "react";
import { useColorScheme } from "react-native";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider, Text, Theme, View } from "tamagui";

import config from "../../tamagui.config";
import { database } from "../db/database";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
    SpaceGroteskBold: require("@/assets/SpaceGrotesk-Bold.ttf")
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <DatabaseProvider database={database}>
      <TamaguiProvider config={config}>
        <Suspense fallback={<Text>Loading...</Text>}>
          <Theme name={colorScheme}>
            <ThemeProvider
              value={colorScheme === "light" ? DefaultTheme : DarkTheme}
            >
              <Stack
                screenOptions={{
                  headerShown: false
                }}
              >
                <Stack.Screen
                  name="(app)"
                  options={{
                    title: "Home"
                  }}
                />
                <Stack.Screen
                  name="properties/[id]"
                  options={{
                    title: "Property"
                  }}
                />
              </Stack>
            </ThemeProvider>
          </Theme>
        </Suspense>
      </TamaguiProvider>
    </DatabaseProvider>
  );
}
