import { SessionProvider, useSession } from "../context/ctx";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";

export default function TabsLayout() {
  const { session, isLoading } = useSession();
  if (isLoading) return null;
  if (!session) {
    return <Redirect href="../login" />;
  }

  return (
    <SessionProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color}></FontAwesome>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color}></FontAwesome>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "settings",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="cogs" color={color}></FontAwesome>
            ),
          }}
        />
      </Tabs>
    </SessionProvider>
  );
}
