import React, {FC, useEffect, useState} from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';

interface Props {
  route: { 
    params: {
      itemId: string; 
    }
  }
}

const App : FC<Props> = (props) => {  
  console.log(props);
  
  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => props.navigation.goBack()}  />
      <Text>Tree.JS screen</Text> 
      <Text>{props.route.params.itemId}</Text> 

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
