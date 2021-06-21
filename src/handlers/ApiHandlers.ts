import firebase from "firebase";

const ApiHandlers = {
  addItem: async () => {
    // if(!user) fetchCurrentUser()
    if(!ip) setAddItemErrors("IP is missing")
    
    if(ip) {
      console.log("happened1");

      const validate = await validateIPAddress(ip)
      console.log(validate);
      
      if(!validate) {
        console.log("not valid");
        setAddItemErrors("IP format not valid")
        return
      }
      setAddItemErrors("")
      const data = {
        ip,
        timeStamp: Date.now(),
        approved: true, // false for admin checks in dashboard
        user, // TODO missing typechecking
      }
      try{
        await firebase.firestore().collection('items').add(data);
      } catch(err) {
        return err;
      }
    } else {
      Alert.alert(`Missing fileds`)
    }
  },
  deleteItem: async (itemId: string) => {
    try{
      await firebase.firestore().collection('items').doc(itemId).delete();
    } catch(err) {
      console.error(err);
    }
  }



} 

export default ApiHandlers