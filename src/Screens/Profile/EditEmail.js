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
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
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

  const handleCancel = () => {
    setIsEditing(false);
  };
  const editProfile = ProfileEdit();
  const handleSave = async () => {
    setIsEditing(false);
    const data = {email: email};
    await editProfile(data, 'application/json');
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#fde047', 'white']} style={styles.boxContainer}>
        {/* <View> */}
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
        {/* </View> */}
      </LinearGradient>
      <LinearGradient colors={['white', 'white']} style={styles.inputContainer}>
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your new email"
              keyboardType="email-Gender"
              autoCapitalize="none"
              placeholderTextColor={'#121212'}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleCancel}>
                <Ionicons name="arrow-back-circle" size={30} color="#4b5563" />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Ionicons name="bookmark" size={30} color="#4b5563" />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View className="flex flex-row items-center gap-4">
            <Text style={styles.emailText}>
              <Text style={{fontWeight: '700', color: 'black'}}>{prop}</Text>{' '}
            </Text>
            <TouchableOpacity onPress={handleEdit}>
              <Ionicons name="create" size={30} color="#4b5563" />
            </TouchableOpacity>
          </View>
        )}
      </LinearGradient>
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
    // backgroundColor: '#fef9c3',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  name: {
    fontSize: 25,
    fontWeight: '500',
    color: '#000',
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
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    height: 100,
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

  

  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#121212',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  emailText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
    width: '100%',
    maxWidth: 220,
  },
  
  
 
});

export default EditEmail;





