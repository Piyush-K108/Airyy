import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import { ProfileEdit } from './ProfileEdit';
const EditGender = () => {
  const [gender, setGender] = useState('');
  const editProfile = ProfileEdit();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigation = useNavigation();
   const [loading, setLoading] = useState(false);

  const handleUpdateGender = async () => {
    setLoading(true); // Show loading animation
    const data = {Gender: gender};
    await editProfile(data, 'application/json');
    setLoading(false); // Hide loading animation
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const selectGender = selectedGender => {
    setGender(selectedGender);
    setIsDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#fde047', 'white']} style={styles.boxContainer}>
        <Image
          source={require('../../assets/images/edit.png')}
          style={styles.Editimage}
        />
        <Text style={styles.name}>Edit Gender</Text>
      </LinearGradient>
      <TouchableOpacity
        style={styles.dropdownContainer}
        onPress={toggleDropdown}>
        <View style={styles.selectOptionContainer}>
          <FontAwesome
            name="genderless"
            size={30}
            color="#5D8AA8"
            style={styles.icon}
          />
          <Text style={styles.dropdownText}>{gender || 'Select Gender'}</Text>
          <FontAwesome
            name={isDropdownVisible ? 'angle-up' : 'angle-down'}
            size={20}
            color="#888"
          />
        </View>
      </TouchableOpacity>
      {isDropdownVisible && (
        <View style={styles.dropdownOptions}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectGender('Male')}>
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectGender('Female')}>
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectGender('Other')}>
            <Text style={styles.optionText}>Other</Text>
          </TouchableOpacity>
        </View>
      )}
      {loading ? (
        <ActivityIndicator size="large" color="#fbbf24" />
      ) : (
        <TouchableOpacity
          style={styles.EditBtnContainer}
          onPress={handleUpdateGender}>
          <Text style={styles.EditBtnText}>Save</Text>
        </TouchableOpacity>
      )}
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
    width: Dimensions.get('window').width * 1.0, // Adjust the width as per your requirement
    height: 200,
    backgroundColor: '#ff553e',
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
  dropdownContainer: {
    marginBottom: 20,
    
  },
  selectOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: Dimensions.get('window').width * 0.8, 
    margin:30 ,
  },
  icon: {
    marginRight: 10,
  },
  dropdownText: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  dropdownOptions: {
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    width:'90%'
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  EditBtnContainer: {
    backgroundColor: '#ffdd4b',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 40,
    width: '83%',
    maxWidth: 390,
  },
  EditBtnText: {
    color: '#121212',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
});

export default EditGender;
