import { Platform } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Home, LayoutDashboard, List, ListChecks } from "@tamagui/lucide-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Button, Stack, Text, XStack, YStack } from "tamagui";

export const TabBar = ({ navigation }: BottomTabBarProps) => {
  const { index } = navigation.getState();
  return (
    <Stack>
      <BlurView
        intensity={80}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          borderTopLeftRadius: 20,
          borderTopEndRadius: 20,
          overflow: "hidden"
        }}
      >
        <XStack
          paddingTop="$4"
          paddingHorizontal="$8"
          justifyContent="space-between"
        >
          <Button
            unstyled
            onPress={() => navigation.navigate("index")}
          >
            <YStack alignItems="center">
              <LayoutDashboard
                color={index === 0 ? "$red11" : "$gray11"}
                size={18}
              />
              <Text
                fontFamily="$body"
                mt="$1.5"
                color={index === 0 ? "$red11" : "$gray11"}
                fontSize="$1"
              >
                Dashboard
              </Text>
            </YStack>
          </Button>
          <Button
            unstyled
            onPress={() => navigation.navigate("properties")}
          >
            <YStack alignItems="center">
              <Home
                color={index === 1 ? "$red11" : "$gray11"}
                size={18}
              />
              <Text
                fontFamily="$body"
                mt="$1.5"
                color={index === 1 ? "$red11" : "$gray11"}
                fontSize="$1"
              >
                Properties
              </Text>
            </YStack>
          </Button>
          <Button
            unstyled
            onPress={() => navigation.navigate("contracts")}
          >
            <YStack alignItems="center">
              <ListChecks
                color={index === 2 ? "$red11" : "$gray11"}
                size={18}
              />
              <Text
                fontFamily="$body"
                mt="$1.5"
                color={index === 2 ? "$red11" : "$gray11"}
                fontSize="$1"
              >
                Contracts
              </Text>
            </YStack>
          </Button>
        </XStack>
      </BlurView>
    </Stack>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: Platform.OS === "ios" && {
          backgroundColor: "transparent"
        },
        headerShown: false
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          href: {
            pathname: "/"
          }
        }}
      />
      <Tabs.Screen
        name="properties"
        options={{
          title: "Properties",
          href: "/properties",
          tabBarIcon: ({ color }) => (
            <YStack alignItems="center">
              <Home
                color={color}
                size={18}
              />
            </YStack>
          )
        }}
      />
      <Tabs.Screen
        name="contracts"
        options={{
          title: "Contracts",
          href: {
            pathname: "/contracts"
          },
          tabBarIcon: ({ color }) => (
            <YStack alignItems="center">
              <List
                color={color}
                size={18}
              />
            </YStack>
          )
        }}
      />
    </Tabs>
  );
}
