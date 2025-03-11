import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Link style={styles.button} href={"./login"}>
        <Text style={styles.text}>Começar</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    marginBottom: 15,
    backgroundColor: "#164E85",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
});
