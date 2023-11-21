
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { useEffect,  useState, useRef } from 'react';
import ScreenShot from './src/component/ScreenShot';



export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions();
 

  useEffect(()=>{
    if (status === null) {
      requestPermission();
    }
  },[])
  return (
      <View style={styles.imageContainer} >
        <ScreenShot />
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
