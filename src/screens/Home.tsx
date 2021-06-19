import React, {FC, useEffect, useState} from 'react'
import {Alert, View, Text, StyleSheet } from 'react-native';
import {Button, Input, PostRender} from '../components'
import { FlatList } from 'react-native-gesture-handler';
import firebase from 'firebase'


const App : FC = (props) => {

  const [msg, setMsg] = useState<string|null>(null)
  const [user, setUser] = useState<any>(null) // TODO missing typechecking
  const [items, setItems] = useState<any>([]) 
 
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

  const renderItem = ({item}:{item:any}) => {
    const itemData = item.data();
    
    return <PostRender msg={itemData.msg} timeStamp={itemData.timeStamp} approved={itemData.approved} itemId={item.id} navigation={props.navigation} />
  }

  const checkIP = (IP: string) => {
    const regExp = new RegExp('\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b')
    return regExp.test(IP)
  }


  const post = async () => {
    // if(!user) fetchCurrentUser()
    if(msg) {
      const data = {
        msg,
        timeStamp: Date.now(),
        approved: false,
        user, // TODO missing typechecking
      }
      try{
        await firebase.firestore().collection('items').add(data);
      } catch(err) {
        console.error(err);
      }
    } else {
      Alert.alert(`Missing fileds`)
    }
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
        <Text>Home screen</Text>
        <Button title="Sign Out" onPress={signOut}/>
        <View>
          <Input placeholder="Write something here" onChangeText={(text) => setMsg(text)} />
          <Button title="Add IP" onPress={post} />
        </View>
        {user ? user.isAdmin ? (
          <View>
            <Button title="Dashboard" onPress={() => props.navigation.navigate('dashboard')} />
          </View>
        ) : null : null}
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