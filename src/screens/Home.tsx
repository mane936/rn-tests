import React, { FC, useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import { Button, Input, ItemRender } from "../components";
import { FlatList } from "react-native-gesture-handler";
import firebase from "firebase";
import ApiHandlers from "../api/ApiHandlers";
// const _net = require("net");

const App: FC = (props) => {
  const [ip, setIp] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // TODO missing typechecking
  const [items, setItems] = useState<any>([]);
  const [addItemErrors, setAddItemErrors] = useState<string>("");

  useEffect(() => {
    const fetchApi = async () => {
      const _user = await ApiHandlers.fetchCurrentUser();
      setUser(_user);
      firebase
        .firestore()
        .collection("items")
        .where("user.uid", "==", _user.uid)
        .onSnapshot((querySnapshot) => {
          const documents = querySnapshot.docs;
          setItems(documents);
        });
    };
    fetchApi();
  }, []);

  const signOut = () => {
    firebase.auth().signOut();
  };

  const deleteItem = (id: string) => {
    try {
      ApiHandlers.deleteItem(id);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = async () => {
    try {
      console.log("IP", ip);
      await ApiHandlers.addItem(ip, user);
    } catch (err: any) {
      setAddItemErrors(err.message);
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const itemData = item.data();
    return (
      <ItemRender
        ip={itemData.ip}
        timeStamp={itemData.timeStamp}
        approved={itemData.approved}
        itemId={item.id}
        navigation={props.navigation}
        deleteItem={deleteItem}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.7, marginTop: 30 }}>
        {items.length > 0 ? (
          <FlatList data={items} renderItem={renderItem} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Nothing to display</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 0.3 }}>
        <View style={styles.addIp}>
          <Input
            placeholder="Write your Roomba's IP"
            onChangeText={(text) => setIp(text)}
          />
          <Text style={{ color: "red" }}>{addItemErrors}</Text>
          <Button title="Add IP" onPress={addItem} />
        </View>
        <View style={styles.menu}>
          <Button title="Sign Out" onPress={signOut} />
          {user ? (
            user.isAdmin ? (
              <View>
                <Button
                  title="Admin dashboard"
                  onPress={() => props.navigation.navigate("dashboard")}
                />
              </View>
            ) : null
          ) : null}
        </View>
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
  addIp: {
    // flex: 0.5,
  },
  menu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
