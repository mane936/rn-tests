import firebase from "firebase";
import validateIPAddress from "../helpers/validateIpAddress";

const ApiHandlers = {
  fetchCurrentUser: async () => {
    const _user = await firebase.auth().currentUser!;
    const uid = _user.uid;
    const data = await firebase.firestore().collection("users").doc(uid).get();
    return {
      uid,
      ...data.data(),
    };
  },
  fetchPendingItems: async (user: any) => {
    try {
      return () => {};
    } catch (err) {
      throw err;
    }
  },
  addItem: async (ip: string | null, user: any) => {
    if (!ip) {
      throw new Error("IP is missing");
    } else {
      console.log("happened1");

      const validate = validateIPAddress(ip);
      console.log(validate);

      if (!validate) {
        console.log(validate);

        throw new Error("IP format not valid");
      }

      const data = {
        ip,
        timeStamp: Date.now(),
        approved: true, // false for admin checks in dashboard
        user, // TODO missing typechecking
      };
      try {
        await firebase.firestore().collection("items").add(data);
      } catch (err) {
        throw err;
      }
    }
  },
  deleteItem: async (itemId: string) => {
    try {
      await firebase.firestore().collection("items").doc(itemId).delete();
    } catch (err) {
      throw err;
    }
  },
};

export default ApiHandlers;
