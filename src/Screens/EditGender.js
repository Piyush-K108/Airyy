import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const EditGender = () => {
  const [gender, setGender] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const handleUpdateGender = () => {
    // Perform the update gender logic here
    navigation.goBack();
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
      <View style={styles.boxContainer}>
        <Image
          source={require('../assets/images/edit.png')}
          style={styles.Editimage}
        />
        <Text style={styles.name}>Edit Gender</Text>
      </View>
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
            onPress={() => selectGender('male')}>
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectGender('female')}>
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => selectGender('other')}>
            <Text style={styles.optionText}>Other</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={styles.EditBtnContainer}
        onPress={handleUpdateGender}>
        <Text style={styles.EditBtnText}>Save</Text>
      </TouchableOpacity>
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
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
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
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
});

export default EditGender;
