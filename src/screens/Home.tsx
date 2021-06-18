import React, {FC, useEffect, useState} from 'react'
import {Alert, View, Text, StyleSheet } from 'react-native';
import {Button, Input} from '../components'
import firebase from 'firebase'

const App : FC = (props) => {

  const [msg, setMsg] = useState<string|null>(null)
  const [user, setUser] = useState<any>(null) // TODO missing typechecking
 
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

  useEffect(() => {
    fetchCurrentUser()
  }, [])

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
        await firebase.firestore().collection('posts').add(data);
      } catch(err) {
        console.error(err);
      }
    } else {
      Alert.alert(`Missing fileds`)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Home screen</Text>
      <Button title="Sign Out" onPress={signOut}/>
      <View>
        <Input placeholder="Write something here" onChangeText={(text) => setMsg(text)} />
        <Button title="Post" onPress={post} />
      </View>
      {user ? user.isAdmin ? (
        <View>
          <Button title="Dashboard" onPress={() => props.navigation.navigate('dashboard')} />
        </View>
      ) : null : null}
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