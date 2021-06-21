import React, {FC, useState, useEffect} from 'react'
import firebase from 'firebase'
import { View, Text, StyleSheet } from 'react-native';
import {ApprovalRender, Button} from '../components';
import { FlatList } from 'react-native-gesture-handler';




const App : FC = (props) => {
  const [items, setItems] = useState<any>(null);

  const fetchPendingItems = async () => {
    firebase.firestore().collection("items").where("approved", '==', false).onSnapshot(querySnapshot => {
      const documents = querySnapshot.docs;
      setItems(documents)  
    })
  }

  const onApprove = async (id: string) => {
    const post = await firebase.firestore().collection('items').doc(id).get()
    post.ref.set({approved: true}, {merge: true})
  }

  const onReject = async (id: string) => {
    await firebase.firestore().collection('items').doc(id).delete()
  }

  const renderItem = ({item}:{item:any}) => {
    const itemData = item.data();
    return <ApprovalRender ip={itemData.ip} timeStamp={itemData.timeStamp} approved={itemData.approved} onApprove={() => onApprove(item.id)} onReject={() => onReject(item.id)} />
  }

  useEffect(() => {
    fetchPendingItems();
  }, [])

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => props.navigation.goBack()}  />
      <Text>Dashboard screen</Text> 
      <FlatList data={items} renderItem={renderItem} />
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    padding: 20,
  },

}
)