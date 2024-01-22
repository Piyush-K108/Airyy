import { useState } from 'react'; 
import { Image, Modal, View, Button, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
const windowHeight = Dimensions.get('window').height;

const LeftModel = () => {


  return (
    <View style={styles.Text} className='h-screen absolute bg-slate-300 w-screen z-10'>
        <Text >Profile</Text>
    </View>
  )
}
const styles = StyleSheet.create({
Text:{
    color:'black'
}
  });
export default LeftModel
