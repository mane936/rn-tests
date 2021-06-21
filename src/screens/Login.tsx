import React, { FC, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Button } from "../components";
import firebase from "firebase";

const App: FC = (props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const login = async () => {
    if (email && password) {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        setError("");
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    } else {
      setError(`Missing Fields`);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login screen</Text>
      <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Text style={{ color: "red" }}>{error}</Text>
      <Button title="Login" onPress={login} />

      <View style={styles.loginText}>
        <Text style={{ marginHorizontal: 5 }}>Don't have an account?</Text>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("signup")}
          style={{ marginHorizontal: 5 }}
        >
          <Text style={{ color: "rgba(81,135,200,1)" }}>Sign up here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    flexDirection: "row",
    marginVertical: 20,
  },
});
