// EditComponent.js

import React, { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView,TouchableOpacity, StyleSheet } from 'react-native';

const EditComponent = ({ initialValue, onSave, onCancel }) => {
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleSave = () => {
    onSave(editedValue);
  };

  return (
    <View className=' border-x-[4px] border-t-[4px] border-b-[1px] rounded-t-[40px] border-green-600' style={styles.editContainer} >
      <Text className='text-black mb-10 text-2xl '>EditName</Text>
      <TextInput
      placeholderTextColor={'black'}
        placeholder={initialValue?initialValue:"Name"}
        style={styles.input}
        value={editedValue}
        onChangeText={(text) => setEditedValue(text)}
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
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default EditComponent;
