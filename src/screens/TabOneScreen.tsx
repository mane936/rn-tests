import * as React from 'react';
import {useWindowDimensions, StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../EditScreenInfo';
import { Text, View } from '../Themed';

export default function TabOneScreen() {
  const handlePress = () => {

  }
  return (
    <View style={styles.container}>
      <View style={styles.topNavbar}>
        <Button onPress={() => {}} title="learn" color="#000"/>
      </View>
      <Text style={styles.title}>Available Roombas</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavbar: {
    display: "flex",
    width: "100vw",
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
