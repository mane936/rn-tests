import React, {FC, useEffect, useState} from 'react'
import {Alert, View, Text, StyleSheet } from 'react-native';
import {Button, Input, PostRender} from '../components'
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase'
import validateIPAddress from '../helpers/validateIpAddress';
// const _net = require("net");


const App : FC = (props) => {

  const [ip, setIp] = useState<string|null>(null)
  const [user, setUser] = useState<any>(null) // TODO missing typechecking
  const [items, setItems] = useState<any>([]) 
  const [addItemErrors, setAddItemErrors] = useState<string>("")
 
  useEffect(() => {
    fetchCurrentUser()
    fetchPendingItems()
  }, [])

  const signOut = () => {
    firebase.auth().signOut()
  }

  const fetchCurrentUser = async () => {
    const _user = await firebase.auth().currentUser!
    const uid = _user.uid
    const data = await firebase.firestore().collection('users').doc(uid).get()
    setUser({
      uid: user,
      ...data.data()
    })
  }

  const fetchPendingItems = async () => {
    // const items = await firebase.firestore().collection('items').where('approved', '==', true).get();
    firebase.firestore().collection("items").where("approved", '==', true).onSnapshot(querySnapshot => {
      const documents = querySnapshot.docs;
      setItems(documents)        
    })
    
  }

  const 

  const renderItem = ({item}:{item:any}) => {
    const itemData = item.data();
    return <PostRender ip={itemData.ip} timeStamp={itemData.timeStamp} approved={itemData.approved} itemId={item.id} navigation={props.navigation} deleteItem={deleteItem} />
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 0.5, marginTop: 30}}>
        {items.length > 0 ? (
          <FlatList data={items} renderItem={renderItem} />
        ) : (
          <View style={{flex: 1, justifyContent:'center', alignItems:"center"}}>
            <Text>Nothing to display</Text>
          </View>
        )}
      </View>
      <View style={{flex: 0.5}}>
        <Button title="Sign Out" onPress={signOut}/>
        <View>
          <Input placeholder="Write your Roomba's IP" onChangeText={(text) => setIp(text)} />
          <Text style={{color: "red"}}>{addItemErrors}</Text>
          <Button title="Add IP" onPress={addItem} />
        </View>
        {/* {user ? user.isAdmin ? (
          <View>
            <Button title="Dashboard" onPress={() => props.navigation.navigate('dashboard')} />
          </View>
        ) : null : null} */}
      </View>
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center'
  }}
)