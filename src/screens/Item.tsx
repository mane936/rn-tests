import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';


const App : FC = (props) => {  
  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => props.navigation.goBack()}  />
      <Text>Tree.JS screen</Text> 
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

})
