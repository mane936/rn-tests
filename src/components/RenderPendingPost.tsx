import React , {FC} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import {Button} from '.'

const { width, height}  = Dimensions.get('screen')

interface Props {
  msg: string;
  approved: string;
  timeStamp: number;
  onApprove: () => void;
  onReject: () => void;
}

const formatTime = (timeStamp: number) : any => {
  const calculatedTime = Date.now() - timeStamp;
  if((((calculatedTime / 1000) / 60) / 60) / 24 > 1) {
    return `${Math.round((((calculatedTime / 1000) / 60) / 60) / 24)} d`
  } else if(((calculatedTime / 1000) / 60) > 60 ) {
    return `${Math.round(((calculatedTime / 1000) / 60) / 60)} hr`
  } else if((calculatedTime / 1000) > 60) {
    return `${Math.round((calculatedTime / 1000) / 60 )} min`;
  } else {
    return `${Math.round(calculatedTime / 1000)} s`;
  }  
}


const App : FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>{props.msg}</Text>
        <Text>{formatTime(props.timeStamp)}</Text>
      </View>
      <View style={styles.buttons}>
        <Button title="Approve" onPress={props.onApprove}/> 
        <Button title="Reject" onPress={props.onReject}/> 
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
    justifyContent:'space-between'
  },
  text:{
    width: '60%',

  },
  buttons:{
    flexDirection:"row",
    justifyContent:"space-around"
  }
})