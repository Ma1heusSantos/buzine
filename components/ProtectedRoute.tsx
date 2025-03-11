import { Redirect } from "expo-router";
import { useSession } from "../app/context/ctx";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useSession();

  if (isLoading) return null; // Enquanto carrega

  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}
