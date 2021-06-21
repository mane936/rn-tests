import React, { FC } from "react";
import {
  Dimensions,
  useWindowDimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface Props {
  title: string;
  onPress: () => void;
}

const App: FC<Props> = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: "#fff",
  },
});
