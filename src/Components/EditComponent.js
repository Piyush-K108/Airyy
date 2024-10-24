// EditComponent.js

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ProfileEdit } from '../Screens/Profile/ProfileEdit';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const EditComponent = ({initialValue, onCancel}) => {
  const [editedValue, setEditedValue] = useState(initialValue);
  const translateY = new Animated.Value(300);


  const editProfile = ProfileEdit();
  const handleSave = async () => {
   
    const data = { name: editedValue};
    await editProfile(data, 'application/json');
    handleCancel()
   
  };
  const handleCancel = () => {
    Animated.timing(translateY, {
      toValue: 300,
      useNativeDriver: true,
    }).start(() => onCancel());
  };

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View
      className=" border-x-[4px] z-[100] border-t-[4px] border-b-[1px] rounded-t-[40px] border-green-600"
      style={styles.editContainer}>
      <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
        <MaterialIcons name="close" size={24} color="#000" />
      </TouchableOpacity>
      <Text className="text-[#121212] mb-10 text-2xl ">EditName</Text>
      <TextInput
        placeholderTextColor={'black'}
        placeholder={initialValue ? initialValue : 'Enter Full Name'}
        style={styles.input }
        value={editedValue}
        onChangeText={text => setEditedValue(text)}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: 20,

    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    color:'black',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 1,
    color: '#121212',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditComponent;
