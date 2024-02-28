import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DatePicker from 'react-native-date-picker';
import {ProfileEdit} from './ProfileEdit';
const EditDateOfBirth = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const editProfile = ProfileEdit();

  const handleSave = async () => {
    setLoading(true)
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    const formattedToday = `${year}-${month < 10 ? '0' + month : month}-${
      day < 10 ? '0' + day : day
    }`;

    const data = {Date_of_Birth: formattedToday};

    try {
      await editProfile(data, 'application/json');
      setLoading(false)
      // Handle success or navigate to another screen
    } catch (error) {
      console.error('Error saving Date of Birth:', error);
      setLoading(false)
      // Handle error, show alert, etc.
    }
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#FFF', height: windowHeight}}>
      <View style={styles.titleCotainer}></View>
      <View style={styles.container}>
        <Text style={styles.title}>Select Date Of Birth.</Text>

        <View style={styles.formContainer}>
          <View style={styles.form}>
            <View style={styles.DatePickerContainer}>
              <Text style={styles.label}>Select Date</Text>
              <DatePicker
                mode="date"
                date={selectedDate}
                onDateChange={setSelectedDate}
                androidVariant="nativeAndroid"
                textColor="#000"
              />
            </View>
            {loading ? (
              <ActivityIndicator size="large" color="#fbbf24" />
            ) : (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSave}>
                <Text style={styles.submitButtonText}>Save</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    // height: windowHeight,
    // padding:10 ,
    paddingVertical: 40,
    margin: 20,
    // borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 5,
  },
  formContainer: {
    width: windowWidth * 0.8,
  },
  titleCotainer: {
    backgroundColor: '#feb101',
    width: windowWidth,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    marginBottom: 50,
  },
  title: {
    fontSize: windowWidth * 0.04,
    backgroundColor: '#333',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: windowWidth * 0.07,
    // color: '#feb101',
    color: '#FFF',

    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 14,
    fontSize: 15,
    // borderTopLeftRadius: 50,
    // borderBottomRightRadius: 50,
  },

  form: {
    marginTop: windowWidth * 0.04,
  },
  inputContainer: {
    marginBottom: windowWidth * 0.04,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: windowWidth * 0.02,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },

  submitButton: {
    backgroundColor: '#333',
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.04,
    alignItems: 'center',
    marginTop: windowWidth * 0.1,
  },
  submitButtonText: {
    color: '#feb101',
    fontWeight: '800',
    letterSpacing: 2,
  },
});

export default EditDateOfBirth;
