import React , {FC} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Button} from '.'
import formatTime from '../helpers/formatTime';

const { width, height}  = Dimensions.get('screen')

interface Props {
  ip: string;
  approved: string;
  timeStamp: number;
  itemId: string;
  navigation: any;
  deleteItem: (itemId: string) => void;
}

const App : FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>{props.ip}</Text>
        <Text>Active: {formatTime(props.timeStamp)}</Text>
        <Button title="Track" onPress={() => props.navigation.navigate('item', {
          itemId: props.itemId,
          itemIp: props.ip
        })} />
        <Button title="Delete" onPress={() => props.deleteItem(props.itemId)} />
      </View>
    </View>
  )
}

export default App


const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: 'center',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowColor: '#ccc',
    shadowOpacity: 0.9,

  },
  box:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  text:{
    width: '60%',

  },
  
})