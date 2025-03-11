import { Redirect } from "expo-router";
import { useSession } from "../context/ctx";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useSession();

  if (isLoading) return null; // Exibe carregamento ou nada enquanto verifica o estado de login

  if (!session) {
    return <Redirect href="/(auth)/login" />; // Redireciona para login se não estiver autenticado
  }

  return <>{children}</>;
}
