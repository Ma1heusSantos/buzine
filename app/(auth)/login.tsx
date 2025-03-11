import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSession } from "../context/ctx";

interface DataLogin {
  email: string;
  password: string;
}

export default function Login() {
  const [data, setData] = useState<DataLogin>({ email: "", password: "" });

  function handleSubmit() {
    const { signIn } = useSession();
    signIn(data.email);
  }

  function handleChange(name: string, value: string) {
    setData({
      ...data,
      [name]: value,
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>
          Bem vindo ao <Text style={styles.brand}>Buzine</Text>
        </Text>
        <Text style={styles.subHeader}>
          Bem vindo de volta! Por favor entre para continuar
        </Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          onChangeText={(value) => handleChange("email", value)}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(value) => handleChange("password", value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    minHeight: 600,
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: "white",
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
    marginTop: 50,
  },
  brand: {
    color: "#164E85",
  },
  subHeader: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 60,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#164E85",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
    marginTop: 70,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
  },
});
