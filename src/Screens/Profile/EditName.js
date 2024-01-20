import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet , Image , Button , Dimensions , TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import { ProfileEdit } from './ProfileEdit';

const EditName = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const editProfile = ProfileEdit();
  const handleUpdateName = async () => {
    const data = { name: firstName + " " + lastName };
    await editProfile(data);
   
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <Image
          source={require('../../assets/images/edit.png')}
          style={styles.Editimage}
        />
        <Text style={styles.name}>Edit Name</Text>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          name="user-edit"
          size={20}
          color="#5D8AA8"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          placeholderTextColor={"#000"}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome
          name="user-edit"
          size={20}
          color="#00308F"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor={"#000"}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <Text style={styles.infoText}>
        Mobile number can't be edited. Please contact support.
      </Text>
      <TouchableOpacity
        style={styles.EditBtnContainer}
        onPress={handleUpdateName}>
        <Text style={styles.EditBtnText}>Save</Text>
      </TouchableOpacity>
      {/* <Button  style={{marginTop:20}} title="Update" onPress={handleUpdateName} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 0,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    color:'#000',
    borderRadius: 5,
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  boxContainer: {
    width: Dimensions.get('window').width * 1.0, // Adjust the width as per your requirement
    height: 200,
    backgroundColor: '#ff553e',
    justifyContent: 'flex-end',
    // alignItems: 'center',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  name: {
    fontSize: 25,
    fontWeight: '500',
    color: '#FFF',
    marginBottom: 40,
    marginLeft: 40,
  },
  Editimage: {
    height: 100,
    width: 100,
    marginLeft: 40,
    marginBottom: 10,
  },

  EditBtnContainer: {
    backgroundColor: '#ffdd4b',

    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,
    width: '83%', // Adjust the width as per your requirement
    maxWidth: 390,
  },

  EditBtnText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
});

export default EditName;
