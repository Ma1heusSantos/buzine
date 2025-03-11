import { Stack } from "expo-router";
import { SessionProvider } from "./context/ctx"; // Importa o provider

export default function Layout() {
  return (
    <SessionProvider>
      <Stack>
        <Stack.Screen options={{ headerShown: false }} name="index" />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
