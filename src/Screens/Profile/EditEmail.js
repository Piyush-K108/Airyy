import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ProfileEdit} from './ProfileEdit';
import {useRoute} from '@react-navigation/core';
const EditEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const route = useRoute();
  const {prop} = route.params;
  const handleEdit = () => {
    setIsEditing(true);
  };
  const editProfile = ProfileEdit();
  const handleSave = async () => {
    setIsEditing(false);
    const data = {email: email};
    await editProfile(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <FontAwesome
          name="envelope"
          size={60}
          color="#ff553e"
          style={styles.Editimage}
        />
        <Image
          source={require('../../assets/images/edit.png')}
          style={styles.Editimage}
        />
        <Text style={styles.name}>Edit Email</Text>
      </View>
      <View style={styles.inputContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome
            name="envelope"
            size={20}
            color="#5D8AA8"
            style={styles.icon}
          />
          <Text style={styles.title}>Edit Email</Text>
        </View>

        {isEditing ? (
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your new email"
            keyboardType="email-Gender"
            autoCapitalize="none"
            placeholderTextColor={'black'}
          />
        ) : (
          <Text style={styles.emailText}>Current Email: {prop}</Text>
        )}

        <TouchableOpacity
          style={styles.buttonforEditEmail}
          onPress={isEditing ? handleSave : handleEdit}>
          <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity>
        {/* <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        /> */}
      </View>
      {/* <TouchableOpacity
        style={styles.EditBtnContainer}
        onPress={handleUpdateEmail}>
        <Text style={styles.EditBtnText}>Save</Text>
      </TouchableOpacity> */}
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
  boxContainer: {
    width: Dimensions.get('window').width * 1.0,
    maxWidth: 550,
    height: 200,
    backgroundColor: '#ff553e',
    justifyContent: 'flex-end',
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
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
    marginBottom: 19,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    padding: 10,
  },
  buttonforEditEmail: {
    backgroundColor: '#ffdd4b',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,
    width: '100%',
    maxWidth: 100,
  },
  buttonText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },

  //for new edit

  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'black',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
  },
});

export default EditEmail;





