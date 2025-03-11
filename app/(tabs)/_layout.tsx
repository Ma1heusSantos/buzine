import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSession } from "../context/ctx";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Redirect, Tabs } from "expo-router";

const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) return null;
  if (!session) return <Redirect href="/(auth)/login" />;

  return (
    <ProtectedRoute>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="home" options={{ title: "Home" }} />
        <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
        <Tabs.Screen name="settings" options={{ title: "Configurações" }} />
      </Tabs>
    </ProtectedRoute>
  );
}
