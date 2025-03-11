import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSession } from "../context/ctx"; // Certifique-se de que o caminho do import esteja correto

export default function Home() {
  const { session, isLoading } = useSession(); // Obtém a sessão do usuário

  if (isLoading) {
    return <Text>Carregando...</Text>; // Exibe um texto enquanto a sessão está sendo carregada
  }

  if (!session) {
    return <Text>Usuário não autenticado.</Text>; // Exibe uma mensagem se não houver usuário logado
  }

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá, {session.nome}!</Text>{" "}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});
